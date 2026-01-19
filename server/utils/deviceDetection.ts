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
