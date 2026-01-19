// server/utils/duplicateDetection.ts

/**
 * In-memory duplicate submission detection
 * Tracks content hashes to prevent duplicate spam submissions
 */

interface SubmissionRecord {
  timestamp: number
  count: number
}

// Store submission hashes with their timestamps
// Key: hash of email + message content
// Value: SubmissionRecord with timestamp and count
const submissionHashes = new Map<string, SubmissionRecord>()

// Configuration
const DUPLICATE_WINDOW_MS = 24 * 60 * 60 * 1000 // 24 hours
const MAX_DUPLICATE_COUNT = 2 // Allow at most 2 identical submissions per window
const CLEANUP_INTERVAL_MS = 60 * 60 * 1000 // Clean up every hour

/**
 * Simple hash function for content deduplication
 * Not cryptographically secure, but sufficient for spam detection
 */
const createHash = (content: string): string => {
  let hash = 0
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash.toString(36)
}

/**
 * Normalize and clean content for hashing
 * Removes extra whitespace, lowercases, trims
 */
const normalizeContent = (content: string): string => {
  return content
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .substring(0, 200) // Only use first 200 chars for comparison
}

/**
 * Create a submission fingerprint from email and message
 */
export const createSubmissionFingerprint = (email: string, message?: string): string => {
  const normalizedEmail = email.toLowerCase().trim()
  const normalizedMessage = message ? normalizeContent(message) : ''

  // Combine email and first part of message for the hash
  const combined = `${normalizedEmail}|${normalizedMessage}`
  return createHash(combined)
}

/**
 * Check if a submission is a duplicate
 * Returns true if it's a duplicate that should be rejected
 */
export const isDuplicateSubmission = (email: string, message?: string): boolean => {
  const fingerprint = createSubmissionFingerprint(email, message)
  const now = Date.now()

  const existing = submissionHashes.get(fingerprint)

  if (existing) {
    // Check if within the duplicate window
    if (now - existing.timestamp < DUPLICATE_WINDOW_MS) {
      // Increment count
      existing.count++

      // If exceeded max count, it's a duplicate
      if (existing.count > MAX_DUPLICATE_COUNT) {
        console.warn(`[DuplicateDetection] Duplicate submission blocked: ${fingerprint.substring(0, 8)}... (count: ${existing.count})`)
        return true
      }

      // Update timestamp for rolling window
      existing.timestamp = now
      return false
    }
  }

  // Record new submission
  submissionHashes.set(fingerprint, {
    timestamp: now,
    count: 1
  })

  return false
}

/**
 * Clean up old entries to prevent memory leaks
 */
export const cleanupOldEntries = (): number => {
  const now = Date.now()
  let cleaned = 0

  for (const [hash, record] of submissionHashes.entries()) {
    if (now - record.timestamp > DUPLICATE_WINDOW_MS) {
      submissionHashes.delete(hash)
      cleaned++
    }
  }

  if (cleaned > 0) {
    console.log(`[DuplicateDetection] Cleaned up ${cleaned} old entries`)
  }

  return cleaned
}

/**
 * Get stats about the duplicate detection cache
 */
export const getStats = () => ({
  totalEntries: submissionHashes.size,
  windowMs: DUPLICATE_WINDOW_MS,
  maxDuplicateCount: MAX_DUPLICATE_COUNT
})

// Set up periodic cleanup (runs every hour)
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupOldEntries, CLEANUP_INTERVAL_MS)
}
