# WhatsApp Welcome Message - Debugging Guide

## Issue: Users Not Receiving Welcome Messages

Follow these steps to diagnose why WhatsApp welcome messages aren't being sent:

### 1. Check Browser Console Logs
**When a user completes their profile:**
- Open Developer Tools (F12)
- Go to Console tab
- Look for logs starting with "Sending WhatsApp welcome message to: ..."
- Check for any error messages

**Key logs to look for:**
```
Sending WhatsApp welcome message to: +234...
WhatsApp function response status: 200
WhatsApp API response via Supabase function: {...}
✓ Welcome message sent successfully: ...  (if successful)
```

### 2. Check Edge Function Deployment
The Edge Function MUST be deployed to Supabase:
1. Go to Supabase Dashboard → Functions
2. Look for "send-whatsapp-welcome" function
3. Check if it's deployed (should show green status)
4. If not deployed, deploy it using Supabase CLI or web dashboard

**To deploy via CLI:**
```bash
cd /home/demy/raven
supabase functions deploy send-whatsapp-welcome
```

**To deploy via web UI:**
1. Copy the content of [index.ts](index.ts)
2. Paste into the Supabase web editor
3. Click Deploy

### 3. Verify Environment Variables
The Edge Function needs three environment variables in Supabase:

**Go to:** Supabase Dashboard → Settings → Secrets

**Required variables:**
- `WHATSAPP_PHONE_NUMBER_ID` - Your Meta phone number ID (914304808438758)
- `WHATSAPP_TOKEN` - Your Meta access token
- `WHATSAPP_GRAPH_VERSION` - Usually v22.0 (optional, defaults to v22.0)

If any are missing, the function will return a 500 error with message "Missing WhatsApp config".

### 4. Check Supabase Function Logs
**In Supabase Dashboard → Functions:**
1. Click on "send-whatsapp-welcome"
2. Go to "Logs" tab
3. Look for recent function executions
4. Check for any error messages

**Common error messages:**
- `Missing WhatsApp config (PHONE_NUMBER_ID or TOKEN)` → Set the secrets in Step 3
- `Missing whatsapp_number in request body` → WhatsApp field not being sent from frontend
- `Invalid JSON body` → Frontend is sending malformed data

### 5. Verify WhatsApp Number Input
**Check if the WhatsApp number is being saved:**

In browser console, check `AppState.currentUserData.whatsapp_number` after profile completion. Should show the phone number entered.

**Database verification:**
Go to Supabase SQL Editor and run:
```sql
SELECT id, name, whatsapp_number, profile_complete 
FROM users 
WHERE profile_complete = true 
LIMIT 5;
```

Should see the whatsapp_number populated for completed profiles.

### 6. Test the Edge Function Directly
**Use Postman or cURL to test:**

```bash
curl -X POST https://kwicenbmgllolchbrjve.supabase.co/functions/v1/send-whatsapp-welcome \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <SUPABASE_ANON_KEY>" \
  -d '{
    "whatsapp_number": "+234YOUR_TEST_NUMBER",
    "template": "jaspers_market_plain_text_v1",
    "message": "Test message",
    "payload": {"name": "Test User"}
  }'
```

**Expected response (if successful):**
```json
{
  "whatsapp": {
    "status": 200,
    "response": {
      "messages": [{"id": "wamid.xxx"}]
    },
    "method": "text",
    "success": true
  },
  "log": {...}
}
```

### 7. Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| HTTP 401 from Meta API | Check WHATSAPP_TOKEN is correct and not expired |
| HTTP 404 from Meta API | Check PHONE_NUMBER_ID is correct |
| HTTP 400 "Invalid recipient" | WhatsApp number format is wrong (should be +country-code) |
| Function returns 500 | Check all environment variables are set |
| Function returns 404 | Edge Function not deployed to Supabase |
| Message sent but user doesn't receive | Number might not be in Meta's test numbers list |

### 8. Meta WhatsApp Test Numbers
For development, you can only send messages to phone numbers in your Meta Business Account's test list.

**To add test numbers:**
1. Go to Meta Business Manager
2. Navigate to WhatsApp Business Account → Test numbers
3. Add your phone number
4. You'll receive a confirmation code on WhatsApp
5. Enter the code to verify

### 9. Check Database Logging
Messages are logged in the `whatsapp_logs` table:

```sql
SELECT * FROM whatsapp_logs 
ORDER BY created_at DESC 
LIMIT 10;
```

This shows all message attempts, successes, and failures with detailed responses.

### 10. Enable Verbose Console Logging
To see even more detailed logs, the Edge Function already includes extensive console.info() calls. Check Supabase Function Logs to see detailed output including:
- Exact API payload being sent
- API response from Meta
- Template vs text method used
- RPC logging results

---

## Quick Checklist

- [ ] Edge Function is deployed in Supabase
- [ ] `WHATSAPP_PHONE_NUMBER_ID` secret is set
- [ ] `WHATSAPP_TOKEN` secret is set and not expired
- [ ] WhatsApp number is in E.164 format (+country-code...)
- [ ] Phone number is in Meta's test numbers list
- [ ] Browser console shows successful function call (HTTP 200)
- [ ] Supabase function logs show successful message attempt
- [ ] Database `whatsapp_logs` table has entry for the attempt
- [ ] `users` table has `whatsapp_number` populated

## Still Not Working?

1. Open browser console while completing profile
2. Copy all relevant logs
3. Check Supabase function logs for the corresponding timestamp
4. Verify the Meta API response in the logs
5. Check if phone number is in test numbers list in Meta Business Manager
