# Using Meta WhatsApp Templates - Complete Guide

## What are Meta Templates?

Meta provides pre-built WhatsApp message templates that you can use for:
- **Transactional messages**: Receipts, confirmations, alerts
- **Marketing messages**: Promotions, announcements
- **Authentication**: Verification codes, password resets
- **Utility**: Account updates, appointment reminders

Templates are **approved by Meta** before you can send them, ensuring compliance.

## Step 1: Create Templates in Meta Business Manager

1. Go to [Meta Business Manager](https://business.facebook.com)
2. Navigate to **WhatsApp Manager** → **Account tools** → **Message templates**
3. Click **Create template**
4. Fill in:
   - **Template name**: e.g., `welcome_students_v1`
   - **Category**: Choose appropriate category (usually MARKETING or TRANSACTIONAL)
   - **Language**: Select target language
   - **Body**: Write your message with variables using `{{variable_name}}`

**Example template body:**
```
Hello {{name}}! 👋

Welcome to Raven Exam Tutor. You're studying {{course}} at {{institute}}.

Your target score: {{score}}

Let's ace your JAMB exam! 🚀
```

5. Save and submit for approval
6. Wait for Meta to approve (usually within 1-2 hours)

## Step 2: Sync Templates to Your Database

Once templates are approved in Meta, sync them to your Raven database:

### Deploy the sync function:
```bash
cd /home/demy/raven
supabase functions deploy sync-whatsapp-templates
```

The file to deploy is [sync-whatsapp-templates.ts](sync-whatsapp-templates.ts)

### Run the sync:
```bash
curl -X POST https://kwicenbmgllolchbrjve.supabase.co/functions/v1/sync-whatsapp-templates \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SUPABASE_ANON_KEY" \
  -d '{}'
```

Or call it from your app:
```javascript
const response = await fetch('https://kwicenbmgllolchbrjve.supabase.co/functions/v1/sync-whatsapp-templates', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${SUPABASE_CONFIG.key}`
  }
});

const result = await response.json();
console.log(`Synced ${result.synced} templates`);
```

## Step 3: View Available Templates

Check what templates you have:

```sql
-- List all approved templates
SELECT name, meta_template_name, parameters, status 
FROM whatsapp_templates 
WHERE status = 'APPROVED'
ORDER BY is_active DESC;
```

Or use the RPC:
```javascript
const { data } = await supabaseClient.rpc('list_approved_templates');
console.log(data); // Shows all approved templates
```

## Step 4: Use a Template

### Option A: Set as Default (Recommended for most cases)

```sql
-- Make a template active
UPDATE whatsapp_templates 
SET is_active = false 
WHERE is_active = true;

UPDATE whatsapp_templates 
SET is_active = true 
WHERE meta_template_name = 'welcome_students_v1';
```

Now all new users will automatically get this template on profile completion.

### Option B: Switch Templates Programmatically

```javascript
// Fetch specific template
const { data } = await supabaseClient
  .from('whatsapp_templates')
  .select('meta_template_name, parameters')
  .eq('name', 'Welcome Students Template')
  .single();

// Use it with parameters
await sendWelcomeWhatsApp(userData, data.meta_template_name, {
  name: userData.name,
  course: userData.course,
  institute: userData.institute,
  score: userData.target_score
});
```

## Step 5: Update Frontend to Use Template Variables

Update the `sendWelcomeWhatsApp` function:

```javascript
async function sendWelcomeWhatsApp(userData, templateName, variables) {
  try {
    const response = await fetch(
      'https://kwicenbmgllolchbrjve.supabase.co/functions/v1/send-whatsapp-welcome',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_CONFIG.key}`
        },
        body: JSON.stringify({
          whatsapp_number: userData.whatsapp_number,
          template: templateName,
          // Pass variables that match template parameters
          variables: variables || {
            name: userData.name,
            course: userData.course,
            institute: userData.institute,
            score: userData.target_score
          }
        })
      }
    );

    const result = await response.json();
    console.log('Template sent:', result);
    return result;
  } catch (error) {
    console.error('Error sending template:', error);
    return { success: false, error: error.message };
  }
}
```

## Step 6: Update Edge Function to Handle Template Variables

Modify [index.ts](index.ts) to accept template variables:

```typescript
// In the function body, after extracting template:
const variables = body.variables || {};

// For Meta template API calls:
const templatePayload = {
  messaging_product: 'whatsapp',
  to: whatsapp_number,
  type: 'template',
  template: {
    name: template,
    language: { code: 'en_US' },
    components: [
      {
        type: 'body',
        parameters: Object.values(variables).map(v => ({ type: 'text', text: String(v) }))
      }
    ]
  }
};
```

## Template Sync Workflow

```
1. Create template in Meta Business Manager
   ↓
2. Get approval from Meta
   ↓
3. Run sync function (sync-whatsapp-templates)
   ↓
4. Template stored in Supabase whatsapp_templates table
   ↓
5. Set as active in database
   ↓
6. Users receive message with that template
```

## Common Template Examples

### Welcome Template
```
Hello {{name}}! 👋

Welcome to {{app_name}}. 
Start your {{course}} preparation now.
Target Score: {{score}}

Visit your dashboard: {{dashboard_link}}
```

### Verification Code
```
Your Raven verification code is: {{code}}

This code expires in {{expiry_time}} minutes.

Do not share this code with anyone.
```

### Appointment Reminder
```
Hi {{name}},

Reminder: You have a {{session_type}} session scheduled for {{date}} at {{time}}.

{{venue}}
```

## Tips

1. **Use meaningful variable names** that match what you'll pass from code
2. **Keep messages short** - WhatsApp has character limits
3. **Test templates** with test numbers before going live
4. **Version your templates** - Use names like `welcome_v1`, `welcome_v2`
5. **Monitor approval status** - Only APPROVED templates work in production
6. **Sync regularly** - Run sync function after creating new templates in Meta

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Template not showing up | Run sync function, wait for Meta approval |
| Variables not filling in | Check variable names match template parameters |
| Message fails to send | Verify template is APPROVED, not PENDING |
| Wrong number of parameters | Recount {{variables}} in template text |

## Full Example: Dynamic Welcome Messages

```javascript
// When user completes profile
const { data: templates } = await supabaseClient.rpc('list_approved_templates');

// Show user which welcome template they'll get
console.log('Available templates:', templates.map(t => t.name));

// Send with active template
await handleProfileSubmit(e);  // Automatically uses active template

// Later, change template without code change:
// Just update database: UPDATE whatsapp_templates SET is_active = true WHERE name = 'New Template'
```

This way you can update templates and their content without touching code!
