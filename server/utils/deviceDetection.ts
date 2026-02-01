// server/utils/deviceDetection.ts

/**
 * Detects device type from user agent string
 * Used for analytics and session tracking
 */
export function getDeviceType(userAgent: string): 'mobile' | 'tablet' | 'desktop' {
  const ua = userAgent.toLowerCase();

  // Check for tablet first (more specific)
  if (/ipad|tablet|kindle|playbook|silk/i.test(ua)) {
    return 'tablet';
  }

  // Check for mobile devices
  if (/mobile|android|iphone|ipod|blackberry|opera mini|windows phone/i.test(ua)) {
    return 'mobile';
  }

  // Default to desktop
  return 'desktop';
}

/**
 * Extract basic browser info from user agent
 * Returns simplified browser name
 */
export function getBrowserName(userAgent: string): string {
  const ua = userAgent.toLowerCase();

  if (ua.includes('edg/')) return 'Edge';
  if (ua.includes('chrome/') && !ua.includes('edg/')) return 'Chrome';
  if (ua.includes('safari/') && !ua.includes('chrome/')) return 'Safari';
  if (ua.includes('firefox/')) return 'Firefox';
  if (ua.includes('opera/') || ua.includes('opr/')) return 'Opera';

  return 'Unknown';
}

/**
 * Extract operating system from user agent string
 * Returns simplified OS name
 */
export function getOperatingSystem(userAgent: string): string {
  const ua = userAgent.toLowerCase();

  // Windows versions
  if (ua.includes('windows nt 10')) return 'Windows 10/11';
  if (ua.includes('windows nt 6.3')) return 'Windows 8.1';
  if (ua.includes('windows nt 6.2')) return 'Windows 8';
  if (ua.includes('windows nt 6.1')) return 'Windows 7';
  if (ua.includes('windows')) return 'Windows';

  // macOS
  if (ua.includes('mac os x')) {
    const match = ua.match(/mac os x (\d+)[_.](\d+)/);
    if (match && match[1] && match[2]) {
      const major = parseInt(match[1], 10);
      const minor = parseInt(match[2], 10);
      if (major >= 10 && minor >= 15) return 'macOS Catalina+';
      if (major >= 10 && minor >= 14) return 'macOS Mojave';
      return 'macOS';
    }
    return 'macOS';
  }

  // iOS
  if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ipod')) {
    return 'iOS';
  }

  // Android
  if (ua.includes('android')) {
    const match = ua.match(/android (\d+)/);
    if (match) {
      return `Android ${match[1]}`;
    }
    return 'Android';
  }

  // Linux distributions
  if (ua.includes('ubuntu')) return 'Ubuntu';
  if (ua.includes('fedora')) return 'Fedora';
  if (ua.includes('linux')) return 'Linux';

  // Chrome OS
  if (ua.includes('cros')) return 'Chrome OS';

  return 'Unknown';
}
