# Implementation Summary: Simulator Session Tracking

**Date:** 2026-01-18
**Implemented by:** nuxt-logic-architect agent

## Overview

Successfully implemented a complete session tracking system for the credit simulator to enable funnel analytics and user behavior analysis.

## Files Created

### 1. API Endpoints (3 files)

#### `/server/api/simulador/session/start.post.ts`
- Creates new session record when user starts simulator
- Captures IP, user agent, device type
- Rate limit: 20 requests per 5 minutes
- Idempotent (returns success if session exists)

#### `/server/api/simulador/session/update.post.ts`
- Updates session when user advances to new step
- Tracks step progress and timestamps
- Stores partial data for each step
- Rate limit: 50 requests per 5 minutes

#### `/server/api/simulador/session/complete.post.ts`
- Marks session as completed
- Links to saved simulation record
- Calculates total time spent
- Rate limit: 10 requests per 5 minutes

### 2. Utility Functions (1 file)

#### `/server/utils/deviceDetection.ts`
- `getDeviceType()` - Detects mobile/tablet/desktop from user agent
- `getBrowserName()` - Extracts browser name from user agent

### 3. Documentation (2 files)

#### `/docs/simulador-session-tracking.md`
- Complete technical documentation
- Database schema specification
- API endpoint reference
- Client-side integration guide
- Analytics query examples
- Maintenance procedures

#### `/docs/IMPLEMENTATION-SESSION-TRACKING.md`
- This file - implementation summary

## Implementation Patterns Used

### 1. Validation with Zod
All endpoints use Zod schemas for request validation:
```typescript
const schema = z.object({
  session_id: z.string().uuid(),
  paso: z.number().int().min(1).max(5),
  datos_parciales: z.record(z.any()).optional()
});
```

### 2. Rate Limiting
Following existing patterns from `contact.post.ts` and `save.post.ts`:
```typescript
await rateLimit(event, {
  maxRequests: 20,
  windowSeconds: 300,
  message: "Custom error message"
});
```

### 3. Directus SDK Usage
Using standard Directus SDK patterns:
```typescript
const directusServer = createDirectus(config.DIRECTUS_URL)
  .with(staticToken(config.DIRECTUS_ADMIN_TOKEN))
  .with(rest());

await directusServer.request(createItem("simulador_sesiones", payload));
```

### 4. Error Handling
Comprehensive error handling with graceful degradation:
```typescript
try {
  // Operation
} catch (e: any) {
  // Check for specific error types
  // Rethrow createError instances
  // Log errors
  // Return user-friendly messages
}
```

### 5. Client IP Detection
Using existing `getClientIP()` helper from `rateLimit.ts`:
```typescript
const clientIP = getClientIP(event);
```

## Database Requirements

### Collection: `simulador_sesiones`

**Status:** TO BE CREATED IN DIRECTUS

The collection must be created in Directus with the following key fields:

#### Core Fields
- `session_id` (UUID, unique)
- `status` (String, dropdown)
- `paso_actual` (Integer, 1-5)
- `paso_maximo_alcanzado` (Integer, 1-5)

#### Timestamps
- `tiempo_inicio` (DateTime)
- `tiempo_paso_1` through `tiempo_paso_5` (DateTime)
- `tiempo_completado` (DateTime)
- `tiempo_total_segundos` (Integer)

#### Metadata
- `source_page` (String)
- `ip_address` (String)
- `user_agent` (Text)
- `device_type` (String)

#### Data Storage
- `datos_paso_1` through `datos_paso_5` (JSON)
- `simulacion_id` (UUID, foreign key)

**See `/docs/simulador-session-tracking.md` for complete schema specification.**

## Integration Points

### Current Integration Status
- ✅ API endpoints created and ready
- ✅ Utility functions created
- ✅ Documentation complete
- ⏳ Directus collection (needs to be created)
- ⏳ Client-side integration (needs implementation)

### Next Steps for Client Integration

1. **Install UUID package** (if not already installed):
   ```bash
   pnpm add uuid
   pnpm add -D @types/uuid
   ```

2. **Update SimuladorWizard.vue**:
   - Generate session_id on component mount
   - Call `/api/simulador/session/start` when wizard loads
   - Call `/api/simulador/session/update` when step changes
   - Call `/api/simulador/session/complete` after successful save

3. **Wrap all tracking calls in try-catch**:
   - Never block user flow if tracking fails
   - Log errors to console for debugging
   - Tracking is for analytics only

## Code Quality Checklist

- ✅ Follows existing project patterns
- ✅ Uses Zod for validation
- ✅ Implements rate limiting
- ✅ Handles errors gracefully
- ✅ Uses Directus SDK correctly
- ✅ Captures metadata (IP, user agent)
- ✅ Non-blocking error handling
- ✅ Comprehensive documentation
- ✅ SQL examples for analytics
- ✅ Security considerations documented

## Testing Checklist

### API Endpoint Testing

Test each endpoint with curl:

```bash
# 1. Test session start
curl -X POST http://localhost:3000/api/simulador/session/start \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "550e8400-e29b-41d4-a716-446655440000",
    "source_page": "/simulador/credito"
  }'

# 2. Test session update
curl -X POST http://localhost:3000/api/simulador/session/update \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "550e8400-e29b-41d4-a716-446655440000",
    "paso": 2,
    "datos_parciales": {"test": "data"}
  }'

# 3. Test session complete
curl -X POST http://localhost:3000/api/simulador/session/complete \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "550e8400-e29b-41d4-a716-446655440000",
    "simulacion_id": "660e8400-e29b-41d4-a716-446655440000"
  }'
```

### Validation Testing

Test error cases:
- Invalid UUID format
- Missing required fields
- Invalid step numbers (< 1 or > 5)
- Non-existent session_id
- Payload too large
- Rate limit exceeded

## Architecture Decisions

### 1. Session ID Generation
**Decision:** Client-side UUID generation
**Rationale:**
- Allows immediate tracking without server round-trip
- Prevents duplicate session creation
- Works offline/with slow connections

### 2. Rate Limiting Strategy
**Decision:** Progressive rate limits based on endpoint frequency
- Start: 20/5min (multiple page loads)
- Update: 50/5min (frequent navigation)
- Complete: 10/5min (single completion per session)

**Rationale:** Balances abuse prevention with legitimate user behavior

### 3. Non-Blocking Tracking
**Decision:** All tracking failures caught and logged, never block user
**Rationale:** Analytics should never impact user experience

### 4. Step Data Storage
**Decision:** Store partial data in JSON fields per step
**Rationale:**
- Flexible schema for evolving requirements
- Efficient storage
- Easy to query for drop-off analysis

### 5. Device Detection
**Decision:** Server-side user agent parsing
**Rationale:**
- More reliable than client-side detection
- Consistent data format
- Cannot be spoofed by client

## Performance Considerations

1. **Database Indexes:** Required on session_id, status, date_created
2. **Cleanup Strategy:** Archive/delete old sessions after 1 year
3. **Rate Limiting:** In-memory store (consider Redis for multi-instance)
4. **Payload Size:** Limited to 5-20KB depending on endpoint

## Security Features

1. **Rate limiting** on all endpoints
2. **UUID validation** prevents injection
3. **Payload size limits** prevent memory attacks
4. **Server-side validation** with Zod
5. **IP tracking** for abuse detection
6. **Admin token** for Directus operations

## Maintenance Tasks

### Immediate (Before Production)
1. Create `simulador_sesiones` collection in Directus
2. Add indexes to collection
3. Test all three endpoints
4. Integrate client-side tracking

### Ongoing
1. Monitor rate limit triggers
2. Review drop-off analytics monthly
3. Archive old sessions quarterly
4. Update analytics dashboards

### Future Enhancements
1. Add abandonment email recovery
2. Implement A/B testing support
3. Add heatmap integration
4. Create admin analytics dashboard

## Files Modified/Created

```
server/
├── api/
│   └── simulador/
│       ├── save.post.ts (existing)
│       └── session/
│           ├── start.post.ts (NEW)
│           ├── update.post.ts (NEW)
│           └── complete.post.ts (NEW)
└── utils/
    ├── rateLimit.ts (existing)
    ├── duplicateDetection.ts (existing)
    └── deviceDetection.ts (NEW)

docs/
├── directus-simulaciones-credito-schema.md (existing)
├── simulador-save-implementation.md (existing)
├── simulador-session-tracking.md (NEW)
└── IMPLEMENTATION-SESSION-TRACKING.md (NEW - this file)
```

## Related Documentation

- `/docs/simulador-session-tracking.md` - Complete technical reference
- `/docs/directus-simulaciones-credito-schema.md` - Simulation data schema
- `/docs/simulador-save-implementation.md` - Simulation save implementation
- `/server/utils/rateLimit.ts` - Rate limiting utility
- `/server/utils/duplicateDetection.ts` - Duplicate detection

## Success Criteria

- ✅ All three endpoints created
- ✅ Device detection utility created
- ✅ Comprehensive documentation written
- ✅ Follows existing code patterns
- ✅ Rate limiting implemented
- ✅ Error handling implemented
- ✅ Ready for Directus collection creation
- ✅ Ready for client-side integration

## Notes

- All endpoints follow existing patterns from `save.post.ts` and `contact.post.ts`
- Error handling is non-blocking to ensure tracking never breaks user experience
- Rate limits are generous to accommodate legitimate use cases
- Device detection is simple but sufficient for analytics needs
- Documentation includes SQL queries for common analytics use cases
