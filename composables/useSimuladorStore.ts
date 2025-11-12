// Pinia Store para el estado del simulador de crédito
import { defineStore } from 'pinia';
import type { SimuladorState } from '~/types/simulador';

const STORAGE_KEY = 'contuhogar_simulador_state';

export const useSimuladorStore = defineStore('simulador', {
  state: (): SimuladorState => ({
    pasoActual: 1,
    datosPersonales: {
      edad: null,
      tipoCredito: null
    },
    datosBien: {
      valorBien: null,
      montoSolicitado: null,
      plazoMeses: 180 // Default: 15 años
    },
    datosIngresos: {
      ingresosFijos: null,
      ingresosVariables: 0,
      deducciones: 0,
      otrasObligaciones: 0
    },
    datosElegibilidad: {
      statusMigratorio: null,
      reportesNegativos: null
    },
    resultado: null,
    completado: false
  }),

  getters: {
    // Validación de cada paso
    isPaso1Valid(state): boolean {
      return (
        state.datosPersonales.edad !== null &&
        state.datosPersonales.edad >= 18 &&
        state.datosPersonales.edad <= 74 &&
        state.datosPersonales.tipoCredito !== null
      );
    },

    isPaso2Valid(state): boolean {
      if (!state.datosBien.valorBien || !state.datosBien.montoSolicitado) {
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
      return (
        state.datosElegibilidad.statusMigratorio !== null &&
        state.datosElegibilidad.reportesNegativos !== null
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

    canGoToStep: (state) => (step: number): boolean => {
      // Siempre puede volver atrás
      if (step <= state.pasoActual) return true;

      // Para avanzar, debe haber completado los pasos anteriores
      if (step === 2) return state.pasoActual >= 1;
      if (step === 3) return state.pasoActual >= 2;
      if (step === 4) return state.pasoActual >= 3;
      if (step === 5) return state.pasoActual >= 4 && state.completado;

      return false;
    }
  },

  actions: {
    // Navegar a un paso específico
    goToStep(step: number) {
      if (step >= 1 && step <= 5 && this.canGoToStep(step)) {
        this.pasoActual = step;
        this.saveToLocalStorage();
      }
    },

    // Avanzar al siguiente paso
    nextStep() {
      if (this.pasoActual < 5) {
        this.pasoActual++;
        this.saveToLocalStorage();
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
    },

    // Persistencia en LocalStorage
    saveToLocalStorage() {
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(this.$state));
        } catch (error) {
          console.error('Error guardando en localStorage:', error);
        }
      }
    },

    loadFromLocalStorage() {
      if (typeof window !== 'undefined') {
        try {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) {
            const parsed = JSON.parse(stored);
            this.$patch(parsed);
          }
        } catch (error) {
          console.error('Error cargando desde localStorage:', error);
        }
      }
    },

    clearLocalStorage() {
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
          console.error('Error eliminando localStorage:', error);
        }
      }
    }
  }
});
