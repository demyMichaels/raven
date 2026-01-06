# WhatsApp Integration Setup

## Edge Function Configuration

The WhatsApp welcome message is sent via a Supabase Edge Function that integrates with Meta's WhatsApp Business API.

### 1. Deploy Edge Function

```bash
supabase functions deploy send-whatsapp-welcome
```

### 2. Set Environment Variables

Add your Meta WhatsApp credentials to Supabase secrets:

```bash
supabase secrets set WHATSAPP_PHONE_ID=914304808438758
supabase secrets set WHATSAPP_ACCESS_TOKEN=EAA79urix17YBQfgZBZB1jHXWpTdRh3dahZAnOOpTL1SpZB4LPaZBs4L2GN3NMaAnbmZBZA8wLnoUur0HZAdEBpTWMVX1qDwNZCFJVVqM00NfqCpvYRMOzH9UDxMZA2jGn5HWZAUOS4vh2mO3VmFfIZAIQHe7dZCInsUrIC3mFoW7IMKLQPCpvq2IQZAPJa7UzWXmVlnLro17TbvXLWcR9Sg8n5pcKNM171K9gLy2L8NJr8qmJZCcF3pnnTbO2jGFSYtSxApwIsogbcQb9o5EfgXCqGJ1l0fa4D2
supabase secrets set WHATSAPP_TEMPLATE_NAME=jaspers_market_plain_text_v1
```

Replace with your actual values from Meta Business Account.

### 3. Verify Edge Function (Optional Testing)

**This is just to test/verify the function works. You don't need to run this manually for actual signups - it happens automatically during the signup flow.**

To test manually:

```bash
curl -X POST https://kwicenbmgllolchbrjve.supabase.co/functions/v1/send-whatsapp-welcome \
  -H 'Authorization: Bearer .eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3aWNlbmJtZ2xsb2xjaGJyanZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNDk2OTQsImV4cCI6MjA4MDYyNTY5NH0.UL1NvX0lZaeX9QVb9bBTkjLrhd0XMeAwei-v8-7FVnc' \
  -H 'Content-Type: application/json' \
  -d '{
    "phoneNumber": "2349056226512",
    "userName": "John Doe"
  }'
```

### 4. What Happens on Signup (Automatic)

When a user signs up, this happens automatically - **no manual intervention needed:**

1. User completes profile with WhatsApp number
2. Clicks "Complete Setup & Start Learning" button
3. Profile is saved to database
4. `sendWhatsAppWelcome()` function called automatically
5. Edge Function triggers → Meta API sends template message to user's WhatsApp
6. If WhatsApp fails, signup continues anyway (non-blocking)
7. User sees dashboard

### 5. Template Customization

To use a different template, update `WHATSAPP_TEMPLATE_NAME` in secrets or modify the template structure in the Edge Function.

### Security Notes

- Never commit API credentials to git
- Use Supabase secrets management
- The frontend only has anonymous access to call the function
- Edge Function validates phone number format before sending
