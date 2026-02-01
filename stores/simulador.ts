// Pinia Store para el estado del simulador de crédito
import { defineStore } from 'pinia';
import type { SimuladorState, AccionNotificable } from '~/types/simulador';

const STORAGE_KEY = 'contuhogar_simulador_state';
const SESSION_STORAGE_KEY = 'contuhogar_simulador_session';
const NOTIFICATIONS_STORAGE_KEY = 'contuhogar_simulador_notifications';

export const useSimuladorStore = defineStore('simulador', {
  state: (): SimuladorState => ({
    pasoActual: 1,
    datosPersonales: {
      nombres: null,
      apellidos: null,
      fechaNacimiento: null,
      telefono: null,
      telefonoCodigo: { flag: '🇨🇴', code: '+57' }, // Colombia por defecto
      correo: null,
      edad: null,
      tipoCredito: null
    },
    datosBien: {
      valorBien: null,
      montoSolicitado: null,
      plazoMeses: 180, // Default: 15 años
      paisResidencia: null, // Código ISO-2 del país de residencia
      tipoInmueble: null // 'nuevo' | 'usado' | 'por_definir'
    },
    datosIngresos: {
      ingresosFijos: null,
      ingresosVariables: 0,
      deducciones: 0,
      obligacionesFinancieras: []
    },
    datosElegibilidad: {
      statusMigratorio: null,
      reportesNegativos: null
    },
    resultado: null,
    completado: false,

    // Session tracking
    sessionId: null,
    sessionStarted: false,

    // Simulation persistence
    simulacionId: null as string | null, // ID de la simulación guardada en Directus

    // Notification deduplication
    notificacionEnviada: false,
    accionesNotificadas: [] as AccionNotificable[]
  }),

  getters: {
    // Validación de cada paso
    isPaso1Valid(state): boolean {
      // Regex para validación de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Validar información de contacto
      const hasContactInfo =
        state.datosPersonales.nombres !== null && state.datosPersonales.nombres.trim() !== '' &&
        state.datosPersonales.apellidos !== null && state.datosPersonales.apellidos.trim() !== '' &&
        state.datosPersonales.fechaNacimiento !== null &&
        state.datosPersonales.telefono !== null && state.datosPersonales.telefono.trim() !== '' &&
        state.datosPersonales.correo !== null && state.datosPersonales.correo.trim() !== '' &&
        emailRegex.test(state.datosPersonales.correo.trim());

      // Validar edad y tipo de crédito
      const hasValidAge =
        state.datosPersonales.edad !== null &&
        state.datosPersonales.edad >= 18 &&
        state.datosPersonales.edad <= 74;

      const hasValidCreditType = state.datosPersonales.tipoCredito !== null;

      // Validar país de residencia y tipo de inmueble (ahora en paso 1)
      const hasValidCountry = state.datosBien.paisResidencia !== null && state.datosBien.paisResidencia !== '';
      const hasValidPropertyType = state.datosBien.tipoInmueble !== null;

      return hasContactInfo && hasValidAge && hasValidCreditType && hasValidCountry && hasValidPropertyType;
    },

    isPaso2Valid(state): boolean {
      // Validar que los valores existan y sean mayores a 0
      if (!state.datosBien.valorBien || state.datosBien.valorBien <= 0) {
        return false;
      }

      if (!state.datosBien.montoSolicitado || state.datosBien.montoSolicitado <= 0) {
        return false;
      }

      // Validar plazo mínimo (12 meses)
      if (state.datosBien.plazoMeses < 12) {
        return false;
      }

      // Validar porcentaje de financiación
      const porcentaje = (state.datosBien.montoSolicitado / state.datosBien.valorBien) * 100;
      const limiteMax = state.datosPersonales.tipoCredito === 'hipotecario' ? 70 : 80;

      if (porcentaje > limiteMax) {
        return false;
      }

      // Validar plazo según edad
      if (state.datosPersonales.edad) {
        const edadFinal = state.datosPersonales.edad + (state.datosBien.plazoMeses / 12);
        if (edadFinal > 84) {
          return false;
        }
      }

      return true;
    },

    isPaso3Valid(state): boolean {
      return state.datosIngresos.ingresosFijos !== null && state.datosIngresos.ingresosFijos > 0;
    },

    isPaso4Valid(state): boolean {
      // Validar valores específicos: statusMigratorio debe ser true Y reportesNegativos debe ser false
      return (
        state.datosElegibilidad.statusMigratorio === true &&
        state.datosElegibilidad.reportesNegativos === false
      );
    },

    // Cálculos derivados
    ingresosNetos(state): number {
      return (
        (state.datosIngresos.ingresosFijos || 0) +
        state.datosIngresos.ingresosVariables -
        state.datosIngresos.deducciones
      );
    },

    porcentajeFinanciacion(state): number {
      if (!state.datosBien.valorBien || !state.datosBien.montoSolicitado) {
        return 0;
      }
      return (state.datosBien.montoSolicitado / state.datosBien.valorBien) * 100;
    },

    edadFinal(state): number {
      if (!state.datosPersonales.edad) return 0;
      return state.datosPersonales.edad + (state.datosBien.plazoMeses / 12);
    },

    plazoMaximoPermitido(state): number {
      if (!state.datosPersonales.edad) return 240;
      return Math.floor((84 - state.datosPersonales.edad) * 12);
    },

    canGoToStep(state): (step: number) => boolean {
      return (step: number): boolean => {
        // Step 1 always accessible
        if (step === 1) return true;

        // To go to step 2: step 1 must be valid
        if (step === 2) return this.isPaso1Valid;

        // To go to step 3: steps 1 and 2 must be valid
        if (step === 3) return this.isPaso1Valid && this.isPaso2Valid;

        // To go to step 4: steps 1, 2, and 3 must be valid
        if (step === 4) return this.isPaso1Valid && this.isPaso2Valid && this.isPaso3Valid;

        // To go to step 5: all previous steps valid
        if (step === 5) return this.isPaso1Valid && this.isPaso2Valid && this.isPaso3Valid && this.isPaso4Valid;

        return false;
      };
    }
  },

  actions: {
    // ==========================================
    // NOTIFICATION DEDUPLICATION
    // ==========================================

    /**
     * Mark that the main simulation notification was sent (via save.post.ts)
     */
    marcarNotificacionEnviada(): void {
      this.notificacionEnviada = true;
      this.saveNotificationsToStorage();
    },

    /**
     * Mark a specific action as notified (whatsapp, pdf, contact)
     * This prevents duplicate Telegram notifications for the same action
     */
    marcarAccionNotificada(accion: AccionNotificable): void {
      if (!this.accionesNotificadas.includes(accion)) {
        this.accionesNotificadas.push(accion);
        this.saveNotificationsToStorage();
      }
    },

    /**
     * Check if an action was already notified
     */
    fueAccionNotificada(accion: AccionNotificable): boolean {
      return this.accionesNotificadas.includes(accion);
    },

    /**
     * Track user action in Directus (persistent storage)
     * Non-blocking: fire and forget with error handling
     * @param action - The action type (whatsapp, pdf, contact)
     * @param origen - Optional origin for more detailed tracking (default: 'resultados')
     */
    async trackAccionUsuario(action: AccionNotificable, origen: string = 'resultados'): Promise<void> {
      // Don't track if no simulacionId (simulation not saved yet)
      if (!this.simulacionId) {
        return;
      }

      // Non-blocking: fire and forget
      $fetch('/api/simulador/action', {
        method: 'POST',
        body: {
          simulacionId: this.simulacionId,
          action,
          origen
        }
      }).catch(() => {
        // Silent fail - tracking shouldn't break UX
      });
    },

    /**
     * Save notification state to localStorage
     */
    saveNotificationsToStorage(): void {
      if (typeof window !== 'undefined') {
        try {
          const data = {
            notificacionEnviada: this.notificacionEnviada,
            accionesNotificadas: this.accionesNotificadas,
            sessionId: this.sessionId
          };
          localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(data));
        } catch {
          // Silent fail - localStorage may be unavailable
        }
      }
    },

    /**
     * Load notification state from localStorage
     * Only restores if sessionId matches current session
     */
    loadNotificationsFromStorage(): void {
      if (typeof window !== 'undefined') {
        try {
          const stored = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
          if (stored) {
            const data = JSON.parse(stored);
            // Only restore if same session
            if (data.sessionId === this.sessionId) {
              this.notificacionEnviada = data.notificacionEnviada || false;
              this.accionesNotificadas = data.accionesNotificadas || [];
            }
          }
        } catch {
          // Silent fail - localStorage may be unavailable
        }
      }
    },

    /**
     * Clear notification storage
     */
    clearNotificationsStorage(): void {
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem(NOTIFICATIONS_STORAGE_KEY);
        } catch {
          // Silent fail - localStorage may be unavailable
        }
      }
    },

    // ==========================================
    // SESSION TRACKING
    // ==========================================

    /**
     * Generate or restore session ID
     * Checks localStorage for existing session, otherwise generates new UUID
     */
    initSession(): string {
      if (typeof window === 'undefined') {
        // Server-side: generate temp ID (will be replaced on client)
        return crypto.randomUUID();
      }

      try {
        // Check if we already have a session ID in state
        if (this.sessionId) {
          // Restore notification state for this session
          this.loadNotificationsFromStorage();
          return this.sessionId;
        }

        // Check localStorage for existing session
        const storedSessionId = localStorage.getItem(SESSION_STORAGE_KEY);
        if (storedSessionId) {
          this.sessionId = storedSessionId;
          // Restore notification state for this session
          this.loadNotificationsFromStorage();
          return storedSessionId;
        }

        // Generate new session ID
        const newSessionId = crypto.randomUUID();
        this.sessionId = newSessionId;
        localStorage.setItem(SESSION_STORAGE_KEY, newSessionId);
        // Reset notification state for new session
        this.notificacionEnviada = false;
        this.accionesNotificadas = [];
        return newSessionId;
      } catch {
        // Fallback: generate temp ID
        const fallbackId = crypto.randomUUID();
        this.sessionId = fallbackId;
        return fallbackId;
      }
    },

    /**
     * Start tracking session
     * Calls the session start API endpoint
     */
    async startSession(): Promise<void> {
      try {
        // Generate or restore session ID
        const sessionId = this.initSession();

        // If session already started, don't start again
        if (this.sessionStarted) {
          return;
        }

        // Call API to start session
        await $fetch('/api/simulador/session/start', {
          method: 'POST',
          body: { sessionId }
        });

        this.sessionStarted = true;
        this.saveToLocalStorage();
      } catch {
        // Non-blocking: silent fail
      }
    },

    /**
     * Track step change
     * Non-blocking call to update session progress
     * @param paso - The new step the user is navigating to
     * @param datosPasoAnterior - Data from the step just completed (optional)
     * @param pasoAnterior - The step number the data belongs to (optional)
     */
    async trackStep(paso: number, datosPasoAnterior?: object, pasoAnterior?: number): Promise<void> {
      // Don't track if session not initialized
      if (!this.sessionId) {
        return;
      }

      // Non-blocking: fire and forget with error handling
      $fetch('/api/simulador/session/update', {
        method: 'POST',
        body: {
          sessionId: this.sessionId,
          paso,
          datosParciales: datosPasoAnterior,
          pasoDeLosDatos: pasoAnterior // Which step the data belongs to
        }
      }).catch(() => {
        // Silent fail - tracking shouldn't break UX
      });
    },

    /**
     * Complete session
     * Links session to saved simulation and clears session data
     */
    async completeSession(simulacionId: string): Promise<void> {
      if (!this.sessionId) {
        return;
      }

      try {
        await $fetch('/api/simulador/session/complete', {
          method: 'POST',
          body: {
            sessionId: this.sessionId,
            simulacionId
          }
        });

        // Clear session from localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem(SESSION_STORAGE_KEY);
        }

        // Reset session state
        this.sessionId = null;
        this.sessionStarted = false;
      } catch {
        // Non-blocking: silent fail
      }
    },

    /**
     * Get partial data for a specific step (for tracking)
     */
    getPartialDataForStep(paso: number): object | undefined {
      switch (paso) {
        case 1:
          return {
            nombres: this.datosPersonales.nombres,
            apellidos: this.datosPersonales.apellidos,
            correo: this.datosPersonales.correo,
            telefono: this.datosPersonales.telefono,
            tipoCredito: this.datosPersonales.tipoCredito
          };
        case 2:
          return {
            valorBien: this.datosBien.valorBien,
            montoSolicitado: this.datosBien.montoSolicitado,
            plazoMeses: this.datosBien.plazoMeses,
            paisResidencia: this.datosBien.paisResidencia,
            tipoInmueble: this.datosBien.tipoInmueble
          };
        case 3:
          return {
            ingresosFijos: this.datosIngresos.ingresosFijos,
            ingresosVariables: this.datosIngresos.ingresosVariables,
            deducciones: this.datosIngresos.deducciones,
            totalObligaciones: this.datosIngresos.obligacionesFinancieras?.reduce(
              (sum, o) => sum + (o.monto || 0), 0
            ) || 0
          };
        case 4:
          return {
            statusMigratorio: this.datosElegibilidad.statusMigratorio,
            reportesNegativos: this.datosElegibilidad.reportesNegativos
          };
        case 5:
          return {
            resultado: this.resultado?.resultado,
            cuotaMensual: this.resultado?.cuotaMensual
          };
        default:
          return undefined;
      }
    },

    // ==========================================
    // NAVIGATION & STEP MANAGEMENT
    // ==========================================

    // Navegar a un paso específico
    goToStep(step: number) {
      if (step >= 1 && step <= 5 && this.canGoToStep(step)) {
        // Capture data from CURRENT step before navigating
        const currentStep = this.pasoActual;
        const partialData = this.getPartialDataForStep(currentStep);

        this.pasoActual = step;
        this.saveToLocalStorage();

        // Track step change with partial data (non-blocking)
        // Pass current step as the step the data belongs to
        this.trackStep(step, partialData, currentStep);
      }
    },

    // Avanzar al siguiente paso
    nextStep() {
      if (this.pasoActual < 5) {
        // Capture data from CURRENT step before advancing
        const currentStep = this.pasoActual;
        const partialData = this.getPartialDataForStep(currentStep);

        this.pasoActual++;
        this.saveToLocalStorage();

        // Track step change with partial data (non-blocking)
        // Pass current step (before increment) as the step the data belongs to
        this.trackStep(this.pasoActual, partialData, currentStep);
      }
    },

    // Retroceder al paso anterior
    prevStep() {
      if (this.pasoActual > 1) {
        this.pasoActual--;
        this.saveToLocalStorage();
      }
    },

    // Actualizar datos de cada paso
    updateDatosPersonales(data: Partial<SimuladorState['datosPersonales']>) {
      this.datosPersonales = { ...this.datosPersonales, ...data };
      this.saveToLocalStorage();
    },

    updateDatosBien(data: Partial<SimuladorState['datosBien']>) {
      this.datosBien = { ...this.datosBien, ...data };
      this.saveToLocalStorage();
    },

    updateDatosIngresos(data: Partial<SimuladorState['datosIngresos']>) {
      this.datosIngresos = { ...this.datosIngresos, ...data };
      this.saveToLocalStorage();
    },

    updateDatosElegibilidad(data: Partial<SimuladorState['datosElegibilidad']>) {
      this.datosElegibilidad = { ...this.datosElegibilidad, ...data };
      this.saveToLocalStorage();
    },

    // Marcar como completado y guardar resultado
    setResultado(resultado: SimuladorState['resultado']) {
      this.resultado = resultado;
      this.completado = true;
      this.saveToLocalStorage();
    },

    // Reset completo
    reset() {
      this.$reset();
      this.clearLocalStorage();
      this.clearSessionStorage();
      this.clearNotificationsStorage();
    },

    // Persistencia en LocalStorage
    saveToLocalStorage() {
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(this.$state));
        } catch {
          // Silent fail - localStorage may be unavailable
        }
      }
    },

    loadFromLocalStorage() {
      if (typeof window !== 'undefined') {
        try {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) {
            const parsed = JSON.parse(stored);

            // Si la simulación ya fue completada, NO restaurar
            // El usuario que vuelve probablemente quiere hacer una nueva simulación
            if (parsed.completado === true) {
              // Limpiar todo el storage relacionado al simulador
              this.clearLocalStorage();
              this.clearSessionStorage();
              this.clearNotificationsStorage();
              return; // No restaurar, empezar de cero
            }

            this.$patch(parsed);
          }
        } catch {
          // Silent fail - localStorage may be unavailable
        }
      }
    },

    clearLocalStorage() {
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          // Silent fail - localStorage may be unavailable
        }
      }
    },

    clearSessionStorage() {
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem(SESSION_STORAGE_KEY);
        } catch {
          // Silent fail - localStorage may be unavailable
        }
      }
    },

    // Guardar simulación en Directus
    async guardarSimulacion(): Promise<{ ok: boolean; id?: string | number; error?: string }> {
      // Validate that we have all required data
      if (!this.completado || !this.resultado) {
        return {
          ok: false,
          error: 'La simulación no está completa. Por favor, completa todos los pasos.',
        };
      }

      // Validate all steps
      if (!this.isPaso1Valid || !this.isPaso2Valid || !this.isPaso3Valid || !this.isPaso4Valid) {
        return {
          ok: false,
          error: 'Algunos datos son inválidos. Por favor, revisa la información ingresada.',
        };
      }

      try {
        // Prepare payload for API
        const payload = {
          // Datos personales
          nombres: this.datosPersonales.nombres,
          apellidos: this.datosPersonales.apellidos,
          fechaNacimiento: this.datosPersonales.fechaNacimiento,
          telefono: this.datosPersonales.telefono,
          telefonoCodigo: this.datosPersonales.telefonoCodigo,
          correo: this.datosPersonales.correo,
          edad: this.datosPersonales.edad,
          tipoCredito: this.datosPersonales.tipoCredito,

          // Datos del bien
          valorBien: this.datosBien.valorBien,
          montoSolicitado: this.datosBien.montoSolicitado,
          plazoMeses: this.datosBien.plazoMeses,
          paisResidencia: this.datosBien.paisResidencia,
          tipoInmueble: this.datosBien.tipoInmueble,

          // Datos de ingresos
          ingresosFijos: this.datosIngresos.ingresosFijos,
          ingresosVariables: this.datosIngresos.ingresosVariables,
          deducciones: this.datosIngresos.deducciones,
          obligacionesFinancieras: this.datosIngresos.obligacionesFinancieras,

          // Datos de elegibilidad
          statusMigratorio: this.datosElegibilidad.statusMigratorio,
          reportesNegativos: this.datosElegibilidad.reportesNegativos,

          // Resultado
          resultado: this.resultado,
        };

        // Call API endpoint
        const response = await $fetch<{ ok: boolean; id?: string | number | null; message?: string }>('/api/simulador/save', {
          method: 'POST',
          body: payload,
        });

        if (response.ok && response.id) {
          // Store the simulation ID for action tracking
          this.simulacionId = String(response.id);
          this.saveToLocalStorage();

          // Mark main notification as sent (save.post.ts sends Telegram)
          this.marcarNotificacionEnviada();

          // Complete session tracking (non-blocking)
          this.completeSession(String(response.id));

          return {
            ok: true,
            id: response.id,
          };
        }

        return {
          ok: false,
          error: 'No se pudo guardar la simulación.',
        };
      } catch (error: any) {
        // Extract error message from API response if available
        let errorMessage = 'Ocurrió un error al guardar la simulación. Por favor, inténtalo de nuevo.';

        if (error?.data?.message) {
          errorMessage = error.data.message;
        } else if (error?.message) {
          errorMessage = error.message;
        }

        return {
          ok: false,
          error: errorMessage,
        };
      }
    }
  }
});
