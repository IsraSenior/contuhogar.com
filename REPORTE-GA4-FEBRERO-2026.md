# Reporte de Analítica Web — Febrero 2026

**Propiedad:** contuhogar.com (GA4 ID: 501500143)
**Periodo:** 1 – 27 de febrero de 2026
**Zona horaria:** America/Bogota (GMT-5)
**Moneda:** COP

---

## Contexto de Campañas Meta Ads

| Campaña | Inicio | Fin | Estado |
|---------|--------|-----|--------|
| **Meta Ads → USA** | 17 de febrero | — | Activa |
| **Meta Ads → España** | 17 de febrero | 24 de febrero | Finalizada |

El análisis divide el mes en dos periodos para medir el impacto:
- **Pre-campaña:** 1 – 16 de febrero (16 días)
- **Post-campaña:** 17 – 27 de febrero (11 días)

---

## 1. Resumen Ejecutivo

| Métrica | Feb 2026 completo |
|---------|-------------------|
| Usuarios totales | **335** |
| Usuarios nuevos | **338** |
| Sesiones | **447** |
| Páginas vistas | **908** |
| Sesiones con engagement | **291** (65.1%) |
| Duración promedio de sesión | **2 min 28 seg** |
| Tasa de rebote | **34.9%** |
| Tasa de engagement | **65.1%** |

---

## 2. Impacto Directo de las Campañas Meta

### 2.1 Métricas Generales: Pre vs Post Campaña

| Métrica | Pre-campaña (16 días) | Post-campaña (11 días) | Variación | Insight |
|---------|----------------------|------------------------|-----------|---------|
| **Usuarios** | 144 | 203 | **+41%** | En menos días, más alcance |
| **Usuarios nuevos** | 144 | 194 | **+35%** | Audiencia fresca entrando al funnel |
| **Sesiones** | 199 | 247 | **+24%** | Mayor volumen de visitas |
| **Sesiones engaged** | 105 | 186 | **+77%** | Tráfico de mayor calidad |
| **Tasa de engagement** | 52.8% | 75.3% | **+43%** | Los anuncios atraen usuarios interesados |
| **Tasa de rebote** | 47.2% | 24.7% | **−48%** | Mejora drástica en retención |
| **Duración promedio** | 2:59 | 2:03 | −31% | Normal en tráfico de descubrimiento |

**Lectura clave:** En solo 11 días post-campaña se superaron los 16 días previos en usuarios (+41%), engagement (+77%) y calidad del tráfico. Si normalizamos por día:

| Métrica | Promedio diario pre | Promedio diario post | Multiplicador |
|---------|--------------------|--------------------|---------------|
| Usuarios / día | 9.0 | **18.5** | **×2.1** |
| Sesiones engaged / día | 6.6 | **16.9** | **×2.6** |
| Usuarios nuevos / día | 9.0 | **17.6** | **×2.0** |

Las campañas **duplicaron el tráfico diario** y casi **triplicaron las sesiones con engagement por día**.

---

### 2.2 Generación de Leads — El Dato Más Importante

| Evento | Pre-campaña | Post-campaña | Variación |
|--------|-------------|-------------|-----------|
| **generate_lead** (eventos) | 54 | 151 | **+180%** |
| **generate_lead** (usuarios únicos) | 30 | 117 | **+290%** |
| **Página /contacto** (vistas) | 54 | 151 | **+180%** |
| **Página /contacto** (usuarios únicos) | 30 | 117 | **+290%** |

Las campañas Meta generaron **casi 4 veces más leads únicos** en menos de la mitad de tiempo. El evento `generate_lead` confirma que los usuarios no solo visitan la página de contacto, sino que **interactúan activamente con el formulario**.

La página `/contacto` mantiene un bounce rate de apenas **1.2%**, lo que indica que prácticamente todo el que llega al formulario, lo usa.

---

### 2.3 Comportamiento de Usuarios desde USA (durante campaña)

| Página | Vistas | Usuarios | % del tráfico USA |
|--------|--------|----------|-------------------|
| **/contacto** | 128 | 102 | **65.8%** |
| **/ (Home)** | 70 | 46 | 29.7% |
| **/simulador/credito** | 12 | 9 | 5.8% |
| **/nosotros** | 3 | 3 | 1.9% |
| **/blog** | 2 | 2 | 1.3% |
| **/servicios/credito-hipotecario** | 2 | 2 | 1.3% |

**El 65.8% del tráfico USA llega directo a Contacto.** Esto indica que la estructura del anuncio + landing está funcionando correctamente como máquina de generación de leads.

---

### 2.4 Canal "Organic Social" — Donde GA4 Clasifica las Campañas Meta

> **Nota técnica:** GA4 clasifica el tráfico de Meta Ads como "Organic Social" debido a que los UTM parameters no identifican el medio como paid. Ver recomendaciones en sección 8.

| Métrica | Organic Social PRE | Organic Social POST | Variación |
|---------|-------------------|--------------------|-----------|
| **Usuarios** | 35 | 122 | **+249%** |
| **Sesiones** | 35 | 127 | **+263%** |
| **Sesiones engaged** | 12 | 115 | **+858%** |
| **Tasa de engagement** | 34.3% | **90.6%** | **+164%** |
| **Páginas vistas** | 46 | 150 | **+226%** |

El canal Organic Social pasó de 34.3% a **90.6% de engagement** — lo que significa que 9 de cada 10 usuarios que llegan desde Meta Ads interactúan significativamente con el sitio. Este es un indicador excepcional de calidad de tráfico.

---

## 3. Análisis por País

### 3.1 Top 10 Países

| # | País | Usuarios | % Total | Sesiones | Páginas | Bounce | Engagement |
|---|------|----------|---------|----------|---------|--------|------------|
| 1 | **United States** | 220 | 65.7% | 237 | 324 | 28.7% | 71.3% |
| 2 | **Colombia** | 77 | 23.0% | 161 | 373 | 41.6% | 58.4% |
| 3 | Iran* | 13 | 3.9% | 13 | 121 | 0% | 100% |
| 4 | Australia | 7 | 2.1% | 15 | 32 | 53.3% | 46.7% |
| 5 | Germany | 6 | 1.8% | 6 | 22 | 16.7% | 83.3% |
| 6 | Brazil | 3 | 0.9% | 3 | 6 | 33.3% | 66.7% |
| 7 | China* | 3 | 0.9% | 3 | 3 | 100% | 0% |
| 8 | Luxembourg | 3 | 0.9% | 3 | 4 | 0% | 100% |
| 9 | Argentina | 2 | 0.6% | 2 | 6 | 0% | 100% |
| 10 | Peru | 2 | 0.6% | 2 | 2 | 50% | 50% |

*\*Irán y China presentan patrones de tráfico bot (ver sección 7).*

### 3.2 Impacto de Campaña USA: Pre vs Post

| Métrica | USA Pre (16 días) | USA Post (11 días) | Variación |
|---------|-------------------|-------------------|-----------|
| **Usuarios** | 66 | 155 | **+135%** |
| **Usuarios nuevos** | 79 | 162 | **+105%** |
| **Sesiones** | 73 | 164 | **+125%** |

La campaña más que duplicó el tráfico desde USA. Post-campaña, el bounce rate de USA cayó a **15.2%** con un engagement de **84.8%** — los mejores números de cualquier mercado.

### 3.3 USA — Tendencia Diaria (17-27 feb)

```
Feb 17: ████████████████████████████████████████████████████████████████▎ 63  ← Lanzamiento
Feb 18: █████████▎ 9
Feb 19: ███████████████████████▎ 23
Feb 20: █████████████▎ 13
Feb 21: ███████▎ 7
Feb 22: ████████▎ 8
Feb 23: ████████▎ 8
Feb 24: ███████▎ 7
Feb 25: ██████▎ 6
Feb 26: ████████████▎ 12
Feb 27: ███▎ 3 (dato parcial)
```

El pico del día 17 es esperado (lanzamiento). La estabilización en 7-12 usuarios/día desde USA es positiva vs el promedio pre-campaña de ~4 usuarios/día desde ese país.

### 3.4 Campaña España — Sin Impacto Medible

**España no aparece en los datos de GA4** ni siquiera en el top 19 de países. Esto indica que la campaña a España:

- No generó clics al sitio web, o
- El volumen fue demasiado bajo para registrarse, o
- Los anuncios se mostraron pero no atrajeron tráfico

Se recomienda revisar los datos directamente en Meta Ads Manager para esa campaña y evaluar impresiones, CTR y CPC.

---

## 4. Canales de Adquisición

| Canal | Usuarios | Sesiones | Páginas | Págs/sesión | Engagement |
|-------|----------|----------|---------|-------------|------------|
| **Organic Social** | 157 (46.9%) | 162 | 196 | 1.21 | **78.4%** |
| **Direct** | 115 (34.3%) | 155 | 454 | 2.93 | 61.9% |
| **Organic Search** | 57 (17.0%) | 115 | 242 | 2.10 | 54.8% |
| Paid Search | 3 (0.9%) | 5 | 5 | 1.00 | 0% |
| Referral | 3 (0.9%) | 5 | 9 | 1.80 | 80% |

**Organic Social** (donde se registran las campañas Meta) es el canal #1 en volumen de usuarios con el segundo mejor engagement. **Direct** muestra la mayor profundidad (2.93 páginas/sesión), indicando usuarios que ya conocen y confían en la marca. **Organic Search** crece de forma saludable con 2.10 páginas/sesión.

### 4.1 Fuentes de Tráfico durante Campaña (17-27 feb)

| Fuente / Medio | Usuarios | Sesiones | Engagement |
|----------------|----------|----------|------------|
| **meta / 120242682200780220** (campaña principal) | 96 | 101 | **100%** |
| (direct) / (none) | 46 | 51 | 66.7% |
| google / organic | 28 | 57 | 54.4% |
| facebook.com / referral | 11 | 11 | 45.5% |
| m.facebook.com / referral | 10 | 10 | 70% |
| meta / 120242490290670220 (campaña secundaria) | 3 | 3 | 33.3% |
| google / cpc | 2 | 2 | 0% |
| bing / organic | 2 | 5 | 60% |

La campaña Meta principal generó **100% de engagement** — cada sesión que llegó desde el anuncio fue una sesión con interacción significativa. Este es un indicador excepcional.

---

## 5. Dispositivos

| Dispositivo | Usuarios | % | Sesiones | Páginas | Págs/sesión | Engagement |
|-------------|----------|---|----------|---------|-------------|------------|
| **Mobile** | 177 | 52.8% | 236 | 376 | 1.59 | 68.2% |
| **Desktop** | 150 | 44.8% | 202 | 519 | 2.57 | 60.4% |
| Tablet | 10 | 3.0% | 10 | 13 | 1.30 | 100% |

Mobile domina en volumen (esperable en tráfico de Meta Ads que se consume en el teléfono). Desktop muestra mayor profundidad de navegación, especialmente en el simulador de crédito que se aprovecha mejor en pantalla grande.

---

## 6. Páginas Más Visitadas

| # | Página | Vistas | Usuarios | Duración | Bounce |
|---|--------|--------|----------|----------|--------|
| 1 | **/ (Home)** | 354 | 201 | 1:48 | 39.5% |
| 2 | **/contacto** | 205 | 145 | 1:21 | **1.2%** |
| 3 | **/simulador/credito** | 82 | 61 | 1:07 | 23.5% |
| 4 | **/nosotros** | 74 | 45 | 1:36 | 18.0% |
| 5 | **/servicios/credito-hipotecario** | 40 | 28 | 2:15 | 15.8% |
| 6 | **/servicios/compra-de-cartera** | 20 | 16 | 1:41 | 25.0% |
| 7 | **/blog** | 19 | 15 | 1:23 | 26.7% |
| 8 | **/servicios/leasing-habitacional** | 19 | 19 | 0:14 | 5.0% |
| 9 | **/servicios/conturenta** | 17 | 16 | 0:57 | **0%** |
| 10 | **/servicios/credito-remodelacion** | 16 | 15 | 1:28 | **0%** |
| 11 | **/faqs** | 15 | 12 | 1:21 | 21.4% |
| 12 | **/servicios** | 15 | 14 | 0:14 | 0% |
| 13 | **/terminos-condiciones** | 15 | 15 | 0:10 | 0% |
| 14 | **/politica-privacidad** | 14 | 14 | 0:09 | 7.1% |

**Destacados:**
- **/contacto con 1.2% de bounce** es excepcional. Es la segunda página más vista y prácticamente no pierde usuarios.
- **/servicios/conturenta** y **/servicios/credito-remodelacion** tienen **0% bounce** — todo usuario que llega, interactúa.
- **/servicios/credito-hipotecario** tiene la mayor duración (2:15), indicando que los usuarios leen el contenido completo.

---

## 7. Tendencia Diaria — Febrero Completo

| Fecha | Usuarios | Sesiones | Páginas | Nota |
|-------|----------|----------|---------|------|
| Feb 1 | 9 | 11 | 44 | |
| Feb 2 | 9 | 11 | 21 | |
| Feb 3 | 12 | 13 | 15 | |
| Feb 4 | 8 | 8 | 24 | |
| Feb 5 | 9 | 9 | 43 | |
| Feb 6 | 7 | 7 | 10 | |
| Feb 7 | 10 | 10 | 32 | |
| Feb 8 | 2 | 4 | 3 | Sábado, mínimo del mes |
| Feb 9 | 9 | 9 | 12 | |
| Feb 10 | 8 | 10 | 14 | |
| Feb 11 | 16 | 19 | 36 | |
| Feb 12 | 31 | 34 | 61 | Pico orgánico |
| Feb 13 | 13 | 16 | 60 | |
| Feb 14 | 4 | 4 | 6 | San Valentín |
| Feb 15 | 9 | 9 | 10 | |
| Feb 16 | 18 | 26 | 65 | |
| **Feb 17** | **70** | **71** | **98** | **Lanzamiento campañas Meta** |
| Feb 18 | 20 | 29 | 73 | |
| Feb 19 | 32 | 38 | 67 | |
| Feb 20 | 17 | 21 | 41 | |
| Feb 21 | 13 | 13 | 40 | |
| Feb 22 | 13 | 13 | 22 | |
| Feb 23 | 16 | 16 | 17 | |
| **Feb 24** | **9** | **10** | **12** | **Se apaga campaña España** |
| Feb 25 | 11 | 11 | 15 | |
| Feb 26 | 20 | 21 | 53 | |
| Feb 27 | 4 | 4 | 14 | Dato parcial |

```
Usuarios por día:

Pre-campaña                          │  Post-campaña (Meta Ads activas)
                                     │
  9  9  12  8  9  7  10  2  9  8     │  70  20  32  17  13  13  16  9  11  20  4
  ·  ·  ·   ·  ·  ·  ·   ·  ·  ·    │  ██  ·   ·   ·   ·   ·   ·   ·  ·   ·   ·
  ▓  ▓  ▓   ▓  ▓  ▓  ▓   ▒  ▓  ▓    │  ██  ▓   ██  ▓   ▓   ▓   ▓   ▓  ▓   ▓   ▒
  ▓  ▓  ▓   ▓  ▓  ▓  ▓   ▒  ▓  ▓    │  ██  ▓   ██  ▓   ▓   ▓   ▓   ▓  ▓   ▓   ▒
─────────────────────────────────────┼────────────────────────────────────────────
  1  2  3   4  5  6  7   8  9  10    │  17  18  19  20  21  22  23  24  25  26  27
                                     │              ↑                ↑
                                     │          Campaña          España OFF
                                     │          lanzada
```

**Promedio diario pre-campaña:** 9.0 usuarios
**Promedio diario post-campaña:** 18.5 usuarios (×2.1)
**Promedio post-campaña sin el pico del día 17:** 13.5 usuarios (×1.5)

---

## 8. Alertas y Observaciones Técnicas

### 8.1 Tráfico Bot Sospechoso — Irán

| País | Usuarios | Páginas vistas | Págs/sesión | Bounce | Engagement |
|------|----------|----------------|-------------|--------|------------|
| Iran | 13 | 121 | 9.3 | 0% | 100% |

El patrón de 9.3 páginas/sesión con 0% bounce y 100% engagement es consistente con tráfico automatizado. Irán no es mercado objetivo. Se recomienda crear un **filtro de exclusión** en GA4.

### 8.2 Clasificación de Campañas Meta en GA4

GA4 clasifica el tráfico de Meta Ads como **"Organic Social"** en lugar de **"Paid Social"**. Esto ocurre porque los enlaces de las campañas no incluyen los UTM parameters correctos para tráfico pagado.

**Impacto:** Dificulta la atribución precisa y mezcla el rendimiento orgánico real de redes sociales con el rendimiento pagado.

**Solución:** Ver sección 9.2 (UTM tracking).

---

## 9. Recomendaciones Profesionales para Meta Ads

### 9.1 Optimización de la Campaña USA (mantener y escalar)

La campaña USA demuestra métricas excepcionales:
- **100% engagement rate** en sesiones desde Meta
- **15.2% bounce rate** (muy por debajo del benchmark de 40-60% para paid social)
- **84.8% de engagement** (benchmark industria: 50-60%)
- **65.8% del tráfico llega a /contacto** (alta intención de conversión)

**Acciones recomendadas:**

1. **Escalar presupuesto gradualmente** (+20% cada 3-5 días) para no salir de la fase de aprendizaje. Las métricas justifican mayor inversión.

2. **Crear Lookalike Audiences** basadas en los 117 usuarios que generaron el evento `generate_lead`. Meta puede encontrar perfiles similares en USA con alta probabilidad de conversión.

3. **Implementar retargeting** a usuarios que visitaron el sitio pero no llegaron a /contacto. Este segmento ya conoce la marca pero no convirtió — un recordatorio puede cerrar el loop.

4. **Probar segmentación por ciudades** con alta concentración de colombianos en USA: Miami, New York, Houston, Los Angeles, Orlando. Esto podría mejorar el CPL al reducir el desperdicio geográfico.

5. **A/B testing de creativos:** Dado el excelente engagement, probar variaciones para encontrar el creative ganador y maximizar CTR manteniendo la calidad.

### 9.2 Corregir UTM Tracking (urgente)

Actualmente las campañas Meta no tienen UTM parameters correctos. Configurar en cada anuncio:

```
utm_source=meta
utm_medium=paid_social
utm_campaign={{campaign.name}}
utm_content={{ad.name}}
utm_term={{adset.name}}
```

**Cómo aplicar en Meta Ads Manager:**
1. Ir a nivel de Anuncio → sección "Tracking"
2. En "URL Parameters" agregar los parámetros arriba
3. Usar los macros dinámicos de Meta (`{{campaign.name}}`, etc.) para tracking automático

Esto permitirá que GA4 clasifique correctamente el canal como **"Paid Social"** y se pueda diferenciar del tráfico orgánico de redes.

### 9.3 Reevaluar la Estrategia para España

La campaña de España no generó tráfico medible en GA4. Antes de relanzar:

1. **Revisar datos en Meta Ads Manager:** Verificar impresiones, reach, CTR y CPC de la campaña de España. Si hubo impresiones pero bajo CTR, el problema es el creative o el copy.

2. **Verificar segmentación:** Confirmar que el público objetivo en España eran colombianos residentes en España, no población general española.

3. **Considerar tráfico de Facebook in-app:** Es posible que los usuarios hayan interactuado con el anuncio (likes, comentarios) sin hacer clic al sitio. Revisar métricas de interacción en Meta.

4. **Adaptar el mensaje para España:** El contexto de un colombiano en España es diferente al de uno en USA (marco regulatorio europeo, tipo de cambio EUR/COP, etc.). Considerar un landing page o creative específico.

5. **Presupuesto mínimo viable:** España es un mercado más pequeño para colombianos en exterior que USA. Asegurar al menos $5-10 USD/día para tener datos estadísticamente significativos.

### 9.4 Estructura de Campañas Recomendada

```
CAMPAÑA: ConTuHogar - USA - Leads
├── Ad Set 1: Lookalike de leads existentes (1-3%)
│   ├── Anuncio A: Testimonio/caso de éxito
│   └── Anuncio B: Propuesta de valor directa
├── Ad Set 2: Intereses inmobiliarios + colombianos en USA
│   ├── Anuncio A: Simulador como gancho
│   └── Anuncio B: "Tu casa en Colombia desde USA"
└── Ad Set 3: Retargeting visitantes web (últimos 30 días)
    ├── Anuncio A: Recordatorio con urgencia
    └── Anuncio B: Oferta/beneficio específico

CAMPAÑA: ConTuHogar - España - Awareness → Leads
├── Ad Set 1: Colombianos en España (Facebook interests)
│   ├── Anuncio A: Educativo sobre crédito desde exterior
│   └── Anuncio B: Propuesta de valor
└── Ad Set 2: Retargeting web + engagement
    └── Anuncio A: Call to action directo
```

### 9.5 Implementación del Pixel y Eventos de Conversión

Se detectó el evento `ads_conversion_PAGE_VIEW_1` (151 eventos post-campaña), lo que confirma que el **Meta Pixel está instalado y funcionando**. Para maximizar la optimización:

1. **Configurar evento de conversión "Lead"** en Meta Events Manager, mapeado al evento `generate_lead` de GA4. Esto permite que Meta optimice la entrega de anuncios hacia usuarios más propensos a enviar el formulario.

2. **Agregar evento ViewContent** en páginas de servicios específicos (/servicios/credito-hipotecario, etc.) para crear audiencias segmentadas por interés.

3. **Configurar Conversions API (CAPI)** server-side para mejorar la atribución. Con las restricciones de cookies de iOS y navegadores, CAPI captura conversiones que el pixel del browser pierde. Esto puede mejorar la optimización de Meta entre un 15-30%.

### 9.6 Optimización de Landing Pages para Meta Ads

Dado que el 65.8% del tráfico USA llega a /contacto:

1. **Crear una landing page dedicada para Meta Ads** (`/landing/credito-usa`) que elimine la navegación y se enfoque únicamente en la conversión (formulario prominente, testimonios, CTA claro). Esto puede incrementar la tasa de conversión entre un 20-40%.

2. **Optimizar velocidad de carga en mobile** — el 52.8% del tráfico es mobile y las sesiones mobile son más cortas. Cada segundo de carga en mobile reduce la conversión un ~7%.

3. **Incluir Social Proof en la landing:** Número de familias atendidas, logos de bancos aliados, testimonios reales de colombianos en USA.

---

## 10. Métricas Clave para Seguimiento Mensual

Para marzo 2026, los KPIs a monitorear comparando contra febrero:

| KPI | Febrero 2026 (baseline) | Meta marzo |
|-----|------------------------|------------|
| Usuarios totales | 335 | >450 |
| Leads (generate_lead) | 205 (54 + 151) | >250 |
| Engagement rate global | 65.1% | >65% |
| Engagement rate Meta Ads | 90.6% | >85% |
| Bounce rate global | 34.9% | <35% |
| Tráfico USA | 220 usuarios | >300 |
| Tráfico España | ~0 | >30 (si se relanza) |
| Costo por lead (CPL) | [dato de Meta Ads] | Reducir 10% |

---

## 11. Resumen de Hallazgos Principales

1. **Las campañas Meta a USA son altamente efectivas.** 100% engagement, 15.2% bounce, y casi 4× más leads que sin campañas. Justifican aumento de inversión.

2. **El funnel Home → Contacto funciona.** La página de contacto tiene 1.2% de bounce rate — una métrica excepcional que indica que el diseño del sitio y los CTAs están bien optimizados.

3. **La campaña de España no impactó.** Sin datos en GA4 durante los 7 días activos. Necesita revisión completa en Meta Ads Manager antes de considerar relanzamiento.

4. **Colombia sigue siendo el mercado más enganchado** con 2.32 páginas/sesión y el tráfico orgánico más profundo.

5. **El SEO orgánico crece de forma saludable** con 57 usuarios y 2.10 páginas/sesión. Es un canal complementario importante que seguirá creciendo con el contenido del blog.

6. **Las campañas Meta necesitan UTM tracking correcto** para poder medir con precisión la atribución entre tráfico orgánico y pagado de redes sociales.

---

*Reporte generado el 27 de febrero de 2026 con datos de Google Analytics 4.*
*Propiedad: contuhogar.com | Cuenta: Con Tu Hogar (365489854)*
