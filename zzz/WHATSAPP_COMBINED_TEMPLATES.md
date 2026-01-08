# Combined Meta & Custom Templates - Complete Integration Guide

## Overview

You can now use **two types of templates** interchangeably:
1. **Meta Templates** - Synced from Meta Business Manager (require approval)
2. **Custom Templates** - Created locally in your database (auto-approved, you control them)

Both follow **Meta's template format** and work seamlessly with the same Edge Function.

---

## Architecture

```
┌─────────────────────────────┐
│  whatsapp_templates table   │
├─────────────────────────────┤
│ ✓ Meta templates (synced)   │
│ ✓ Custom templates (local)  │
│ ✓ All follow Meta format    │
│ ✓ Switch between any        │
└─────────────────────────────┘
         ↓
    get_active_template()
    list_approved_templates()
    set_active_template()
         ↓
  send-whatsapp-welcome
   Edge Function
         ↓
    Meta API
```

---

## Type 1: Meta Templates (Synced)

### Create in Meta Business Manager

1. Go to [Meta Business Manager](https://business.facebook.com)
2. **WhatsApp Manager** → **Message templates**
3. Create with variables using `{{variable_name}}`

Example:
```
Hello {{name}}! 👋

Welcome to Raven. Your course: {{course}}
Target Score: {{score}}

Dashboard: https://examtutor.xyz
```

### Sync to Database

Deploy sync function:
```bash
supabase functions deploy sync-whatsapp-templates
```

Run sync:
```javascript
const response = await fetch(
  'https://kwicenbmgllolchbrjve.supabase.co/functions/v1/sync-whatsapp-templates',
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SUPABASE_CONFIG.key}`,
      'Content-Type': 'application/json'
    }
  }
);

const result = await response.json();
console.log(`Synced ${result.synced} templates`);
```

### Database Fields
- `source`: "META" (auto-set)
- `is_custom`: false (auto-set)
- `status`: "PENDING_MODERATION" until Meta approves
- `meta_template_id`: ID from Meta API
- `sync_status`: "SYNCED" after import

---

## Type 2: Custom Templates (Local)

### Create Custom Template

Create custom templates that follow Meta's format rules:

```sql
-- Via SQL
INSERT INTO whatsapp_templates (
  name,
  meta_template_name,
  description,
  message_preview,
  category,
  parameters,
  status,
  is_custom,
  source
) VALUES (
  'Quick Start Guide',
  'quick_start_v1',
  'Onboarding template for new students',
  'Get started with Raven in 3 easy steps',
  'TRANSACTIONAL',
  '[
    {"name": "name", "type": "text"},
    {"name": "step1", "type": "text"},
    {"name": "step2", "type": "text"},
    {"name": "step3", "type": "text"}
  ]'::jsonb,
  'APPROVED',
  true,
  'CUSTOM'
);
```

Or via RPC function:

```javascript
const { data } = await supabaseClient.rpc('create_custom_template', {
  p_name: 'Quick Start Guide',
  p_template_name: 'quick_start_v1',
  p_description: 'Onboarding for new students',
  p_message_preview: 'Get started in 3 steps',
  p_category: 'TRANSACTIONAL',
  p_parameters: [
    { name: 'name', type: 'text' },
    { name: 'step1', type: 'text' },
    { name: 'step2', type: 'text' },
    { name: 'step3', type: 'text' }
  ]
});

console.log('Custom template created:', data);
```

### Database Fields
- `source`: "CUSTOM" (auto-set)
- `is_custom`: true (auto-set)
- `status`: "APPROVED" (auto-set - you control approval)
- `meta_template_id`: null or your own ID
- `sync_status`: "LOCAL" (never changes)

---

## Switching Between Templates

### Get All Available Templates

```javascript
// Fetch both Meta and custom templates
const { data: allTemplates } = await supabaseClient.rpc('list_approved_templates');

// Filter by type
const metaTemplates = allTemplates.filter(t => !t.is_custom);
const customTemplates = allTemplates.filter(t => t.is_custom);

console.log('Meta templates:', metaTemplates);
console.log('Custom templates:', customTemplates);
```

### Get Currently Active Template

```javascript
const { data: activeTemplate } = await supabaseClient.rpc('get_active_whatsapp_template');

console.log('Active:', activeTemplate[0].name);
console.log('Source:', activeTemplate[0].source);
console.log('Custom?:', activeTemplate[0].is_custom);
```

### Activate a Different Template

```javascript
// Switch to another template by ID
const templateToActivate = allTemplates.find(t => t.name === 'Quick Start Guide');

const { data } = await supabaseClient.rpc('set_active_template', {
  template_id: templateToActivate.id
});

console.log('Switched to:', templateToActivate.name);
```

Or via SQL:

```sql
-- Deactivate all
UPDATE whatsapp_templates SET is_active = false;

-- Activate specific template
UPDATE whatsapp_templates 
SET is_active = true 
WHERE name = 'Quick Start Guide';
```

---

## Template Rules (Follows Meta Format)

Both Meta and custom templates must follow these rules:

### 1. Variable Syntax
Use double curly braces:
```
{{variable_name}}
```

### 2. Categories
Choose one appropriate category:
- **MARKETING** - Promotional messages
- **TRANSACTIONAL** - Confirmations, receipts, alerts
- **AUTHENTICATION** - OTP, verification codes
- **UTILITY** - Reminders, account updates

### 3. Parameter Definitions
Define parameters in JSON array:
```json
[
  {"name": "name", "type": "text"},
  {"name": "course", "type": "text"},
  {"name": "score", "type": "text"}
]
```

### 4. Character Limits
- Body: Max 1024 characters
- Header: Max 60 characters
- Footer: Max 60 characters

### 5. Variable Count
- Each template can have multiple variables
- All variables must be provided when sending

---

## Complete Example

### Step 1: Create Custom Template

```javascript
// Create a verification template
const { data: newTemplate } = await supabaseClient.rpc('create_custom_template', {
  p_name: 'Email Verification',
  p_template_name: 'verify_email_v1',
  p_description: 'Send verification code to user',
  p_message_preview: 'Your verification code is ready',
  p_category: 'AUTHENTICATION',
  p_parameters: JSON.stringify([
    { name: 'name', type: 'text' },
    { name: 'code', type: 'text' },
    { name: 'expiry', type: 'text' }
  ])
});
```

### Step 2: View Available Templates

```javascript
const { data: templates } = await supabaseClient.rpc('list_approved_templates');
console.table(templates);
// Shows all templates with source (META or CUSTOM)
```

### Step 3: Switch to Template

```javascript
const verifyTemplate = templates.find(t => t.name === 'Email Verification');
await supabaseClient.rpc('set_active_template', {
  template_id: verifyTemplate.id
});
```

### Step 4: Send Message

Users completing profile will get the new template automatically:
```javascript
// In handleProfileSubmit, call sendWelcomeWhatsApp
// It uses get_active_whatsapp_template() internally
await sendWelcomeWhatsApp(AppState.currentUserData);
```

---

## Admin Dashboard (Optional)

Create a simple admin UI to switch templates:

```html
<select id="templateSelect" onchange="switchTemplate()">
  <option value="">-- Select Template --</option>
</select>

<button onclick="loadTemplates()">Refresh Templates</button>
```

```javascript
async function loadTemplates() {
  const { data } = await supabaseClient.rpc('list_approved_templates');
  
  const select = document.getElementById('templateSelect');
  select.innerHTML = '';
  
  // Group by source
  const metaTemplates = data.filter(t => !t.is_custom);
  const customTemplates = data.filter(t => t.is_custom);
  
  if (metaTemplates.length > 0) {
    const metaGroup = document.createElement('optgroup');
    metaGroup.label = 'Meta Templates';
    metaTemplates.forEach(t => {
      const option = document.createElement('option');
      option.value = t.id;
      option.textContent = `${t.name} ${t.is_active ? '(Active)' : ''}`;
      metaGroup.appendChild(option);
    });
    select.appendChild(metaGroup);
  }
  
  if (customTemplates.length > 0) {
    const customGroup = document.createElement('optgroup');
    customGroup.label = 'Custom Templates';
    customTemplates.forEach(t => {
      const option = document.createElement('option');
      option.value = t.id;
      option.textContent = `${t.name} ${t.is_active ? '(Active)' : ''}`;
      customGroup.appendChild(option);
    });
    select.appendChild(customGroup);
  }
}

async function switchTemplate() {
  const templateId = document.getElementById('templateSelect').value;
  if (!templateId) return;
  
  const { data } = await supabaseClient.rpc('set_active_template', {
    template_id: templateId
  });
  
  console.log('Template switched');
  loadTemplates(); // Refresh list
}
```

---

## Comparison: Meta vs Custom

| Feature | Meta Templates | Custom Templates |
|---------|---|---|
| **Creation** | Meta Business Manager | Database/RPC |
| **Approval** | Meta moderates | Auto-approved |
| **Time to use** | 1-2 hours (after approval) | Immediate |
| **Flexibility** | Less flexible | Fully flexible |
| **Format** | Meta's format | Follow Meta's rules |
| **Switching** | Via database | Via database |
| **Status tracking** | PENDING/APPROVED/REJECTED | Always APPROVED |
| **Best for** | Official, compliant messages | Quick iterations, A/B testing |

---

## Workflow Recommendations

### For Production
1. Create polished templates in Meta Business Manager
2. Sync them to database once approved
3. Set as active in database
4. Use for all users

### For Testing/Development
1. Create custom templates locally
2. Test before sending to all users
3. Once validated, submit to Meta
4. Switch back and forth using database

### For A/B Testing
1. Create multiple custom templates
2. Switch between them daily/weekly
3. Track metrics in `whatsapp_logs` table
4. See which performs better
5. Submit winner to Meta for official version

---

## Database Queries

```sql
-- Count by source
SELECT source, COUNT(*) FROM whatsapp_templates GROUP BY source;

-- Find all Meta templates pending approval
SELECT name, status FROM whatsapp_templates 
WHERE source = 'META' AND status = 'PENDING_MODERATION';

-- List all custom templates
SELECT name, description, created_at FROM whatsapp_templates 
WHERE is_custom = true ORDER BY created_at DESC;

-- See active template
SELECT name, source, is_custom FROM whatsapp_templates WHERE is_active = true;

-- Check template parameters
SELECT name, parameters FROM whatsapp_templates WHERE meta_template_name = 'quick_start_v1';
```

---

## Key Benefits

✅ **One system for both** - No code changes to switch  
✅ **Meta compliance** - All templates follow Meta rules  
✅ **Easy management** - Database-driven, no deployments  
✅ **Fast iteration** - Custom templates instant, no approval wait  
✅ **Production ready** - Use Meta's official templates when needed  
✅ **Flexible** - Test custom, then formalize with Meta  

Enjoy seamless template switching!
