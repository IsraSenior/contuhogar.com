/**
 * Mapeo de códigos telefónicos a códigos de país ISO 3166-1 alpha-2
 * y formatos de teléfono visual
 */
export interface PhoneFormat {
  countryCode: string // ISO 3166-1 alpha-2 (ej: "CO", "US", "ES")
  dialCode: string // Código de marcación (ej: "+57")
  format: string // Formato visual (ej: "XXX XXX XXXX")
  placeholder: string // Placeholder de ejemplo
  mask?: string // Opcional: máscara para formateo automático
}

/**
 * Formatos de teléfono para países comunes
 * Clave: código de marcación (ej: "+57", "+1", "+34")
 */
export const phoneFormats: Record<string, PhoneFormat> = {
  '+57': {
    countryCode: 'CO',
    dialCode: '+57',
    format: 'XXX XXX XXXX',
    placeholder: '300 123 4567',
    mask: '### ### ####'
  },
  '+1': {
    countryCode: 'US',
    dialCode: '+1',
    format: '(XXX) XXX-XXXX',
    placeholder: '(555) 123-4567',
    mask: '(###) ###-####'
  },
  '+34': {
    countryCode: 'ES',
    dialCode: '+34',
    format: 'XXX XX XX XX',
    placeholder: '612 34 56 78',
    mask: '### ## ## ##'
  },
  '+52': {
    countryCode: 'MX',
    dialCode: '+52',
    format: 'XX XXXX XXXX',
    placeholder: '55 1234 5678',
    mask: '## #### ####'
  },
  '+54': {
    countryCode: 'AR',
    dialCode: '+54',
    format: 'XX XXXX XXXX',
    placeholder: '11 2345 6789',
    mask: '## #### ####'
  },
  '+56': {
    countryCode: 'CL',
    dialCode: '+56',
    format: 'X XXXX XXXX',
    placeholder: '9 8765 4321',
    mask: '# #### ####'
  },
  '+51': {
    countryCode: 'PE',
    dialCode: '+51',
    format: 'XXX XXX XXX',
    placeholder: '987 654 321',
    mask: '### ### ###'
  },
  '+58': {
    countryCode: 'VE',
    dialCode: '+58',
    format: 'XXX XXX XXXX',
    placeholder: '412 345 6789',
    mask: '### ### ####'
  },
  '+593': {
    countryCode: 'EC',
    dialCode: '+593',
    format: 'XX XXX XXXX',
    placeholder: '99 123 4567',
    mask: '## ### ####'
  },
  '+55': {
    countryCode: 'BR',
    dialCode: '+55',
    format: '(XX) XXXXX-XXXX',
    placeholder: '(11) 91234-5678',
    mask: '(##) #####-####'
  },
  '+507': {
    countryCode: 'PA',
    dialCode: '+507',
    format: 'XXXX-XXXX',
    placeholder: '6123-4567',
    mask: '####-####'
  },
  '+506': {
    countryCode: 'CR',
    dialCode: '+506',
    format: 'XXXX XXXX',
    placeholder: '8312 3456',
    mask: '#### ####'
  },
  '+598': {
    countryCode: 'UY',
    dialCode: '+598',
    format: 'XX XXX XXX',
    placeholder: '94 123 456',
    mask: '## ### ###'
  },
  '+595': {
    countryCode: 'PY',
    dialCode: '+595',
    format: 'XXX XXX XXX',
    placeholder: '981 123 456',
    mask: '### ### ###'
  },
  '+591': {
    countryCode: 'BO',
    dialCode: '+591',
    format: 'X XXX XXXX',
    placeholder: '7 123 4567',
    mask: '# ### ####'
  },
  // República Dominicana - tres códigos de área
  '+1809': {
    countryCode: 'DO',
    dialCode: '+1809',
    format: 'XXX-XXXX',
    placeholder: '234-5678',
    mask: '###-####'
  },
  '+1829': {
    countryCode: 'DO',
    dialCode: '+1829',
    format: 'XXX-XXXX',
    placeholder: '234-5678',
    mask: '###-####'
  },
  '+1849': {
    countryCode: 'DO',
    dialCode: '+1849',
    format: 'XXX-XXXX',
    placeholder: '234-5678',
    mask: '###-####'
  },
  // Puerto Rico - dos códigos de área
  '+1787': {
    countryCode: 'PR',
    dialCode: '+1787',
    format: 'XXX-XXXX',
    placeholder: '234-5678',
    mask: '###-####'
  },
  '+1939': {
    countryCode: 'PR',
    dialCode: '+1939',
    format: 'XXX-XXXX',
    placeholder: '234-5678',
    mask: '###-####'
  },
  '+53': {
    countryCode: 'CU',
    dialCode: '+53',
    format: 'X XXX XXXX',
    placeholder: '5 234 5678',
    mask: '# ### ####'
  },
  '+502': {
    countryCode: 'GT',
    dialCode: '+502',
    format: 'XXXX XXXX',
    placeholder: '5123 4567',
    mask: '#### ####'
  },
  '+504': {
    countryCode: 'HN',
    dialCode: '+504',
    format: 'XXXX-XXXX',
    placeholder: '9123-4567',
    mask: '####-####'
  },
  '+503': {
    countryCode: 'SV',
    dialCode: '+503',
    format: 'XXXX XXXX',
    placeholder: '7123 4567',
    mask: '#### ####'
  },
  '+505': {
    countryCode: 'NI',
    dialCode: '+505',
    format: 'XXXX XXXX',
    placeholder: '8123 4567',
    mask: '#### ####'
  },
  '+44': {
    countryCode: 'GB',
    dialCode: '+44',
    format: 'XXXX XXX XXX',
    placeholder: '7700 900123',
    mask: '#### ### ###'
  },
  '+33': {
    countryCode: 'FR',
    dialCode: '+33',
    format: 'X XX XX XX XX',
    placeholder: '6 12 34 56 78',
    mask: '# ## ## ## ##'
  },
  '+49': {
    countryCode: 'DE',
    dialCode: '+49',
    format: 'XXX XXXXXXX',
    placeholder: '151 12345678',
    mask: '### #######'
  },
  '+39': {
    countryCode: 'IT',
    dialCode: '+39',
    format: 'XXX XXX XXXX',
    placeholder: '312 345 6789',
    mask: '### ### ####'
  },
  '+351': {
    countryCode: 'PT',
    dialCode: '+351',
    format: 'XXX XXX XXX',
    placeholder: '912 345 678',
    mask: '### ### ###'
  },
  '+86': {
    countryCode: 'CN',
    dialCode: '+86',
    format: 'XXX XXXX XXXX',
    placeholder: '138 0013 8000',
    mask: '### #### ####'
  },
  '+81': {
    countryCode: 'JP',
    dialCode: '+81',
    format: 'XX XXXX XXXX',
    placeholder: '90 1234 5678',
    mask: '## #### ####'
  },
  '+82': {
    countryCode: 'KR',
    dialCode: '+82',
    format: 'XX XXXX XXXX',
    placeholder: '10 1234 5678',
    mask: '## #### ####'
  },
  '+91': {
    countryCode: 'IN',
    dialCode: '+91',
    format: 'XXXXX XXXXX',
    placeholder: '98765 43210',
    mask: '##### #####'
  },
  '+61': {
    countryCode: 'AU',
    dialCode: '+61',
    format: 'XXX XXX XXX',
    placeholder: '412 345 678',
    mask: '### ### ###'
  },
}

/**
 * Mapeo de códigos ISO de país a códigos de marcación
 * Útil para convertir el país detectado por IP al código de marcación
 */
export const countryToDialCode: Record<string, string> = {
  'CO': '+57',  // Colombia
  'US': '+1',   // Estados Unidos
  'ES': '+34',  // España
  'MX': '+52',  // México
  'AR': '+54',  // Argentina
  'CL': '+56',  // Chile
  'PE': '+51',  // Perú
  'VE': '+58',  // Venezuela
  'EC': '+593', // Ecuador
  'BR': '+55',  // Brasil
  'PA': '+507', // Panamá
  'CR': '+506', // Costa Rica
  'UY': '+598', // Uruguay
  'PY': '+595', // Paraguay
  'BO': '+591', // Bolivia
  'DO': '+1809', // República Dominicana (código por defecto)
  'PR': '+1787', // Puerto Rico (código por defecto)
  'CU': '+53',  // Cuba
  'GT': '+502', // Guatemala
  'HN': '+504', // Honduras
  'SV': '+503', // El Salvador
  'NI': '+505', // Nicaragua
  'CA': '+1',   // Canadá
  'GB': '+44',  // Reino Unido
  'FR': '+33',  // Francia
  'DE': '+49',  // Alemania
  'IT': '+39',  // Italia
  'PT': '+351', // Portugal
  'CN': '+86',  // China
  'JP': '+81',  // Japón
  'KR': '+82',  // Corea del Sur
  'IN': '+91',  // India
  'AU': '+61',  // Australia
}

/**
 * Obtiene el formato de teléfono para un código de marcación
 */
export const getPhoneFormat = (dialCode: string): PhoneFormat | null => {
  return phoneFormats[dialCode] || null
}

/**
 * Obtiene el código de marcación para un código de país ISO
 */
export const getDialCodeFromCountry = (countryCode: string): string | null => {
  return countryToDialCode[countryCode.toUpperCase()] || null
}

/**
 * Formatea un número de teléfono según el formato del país
 */
export const formatPhoneNumber = (phone: string, dialCode: string): string => {
  const format = phoneFormats[dialCode]
  if (!format) return phone

  // Eliminar caracteres no numéricos
  const cleaned = phone.replace(/\D/g, '')

  // Aplicar formato según la máscara
  let formatted = ''
  let digitIndex = 0

  for (const char of format.mask || format.format) {
    if (char === '#' || char === 'X') {
      if (digitIndex < cleaned.length) {
        formatted += cleaned[digitIndex]
        digitIndex++
      } else {
        break
      }
    } else {
      formatted += char
    }
  }

  return formatted
}
