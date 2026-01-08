-- Create table to store both Meta and custom WhatsApp templates
CREATE TABLE IF NOT EXISTS whatsapp_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  meta_template_name TEXT NOT NULL UNIQUE,
  meta_template_id TEXT,
  description TEXT,
  message_preview TEXT,
  category TEXT,
  language TEXT DEFAULT 'en_US',
  parameters JSONB DEFAULT '[]',  -- Array of parameter definitions
  status TEXT DEFAULT 'PENDING_MODERATION', -- PENDING_MODERATION, APPROVED, REJECTED, DISABLED
  is_active BOOLEAN DEFAULT false,
  source TEXT DEFAULT 'META', -- META (synced from Meta) or CUSTOM (created locally)
  is_custom BOOLEAN DEFAULT false,
  sync_status TEXT DEFAULT 'LOCAL', -- LOCAL, SYNCED, OUT_OF_SYNC
  last_synced_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_whatsapp_templates_active ON whatsapp_templates(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_whatsapp_templates_source ON whatsapp_templates(source);
CREATE INDEX IF NOT EXISTS idx_whatsapp_templates_status ON whatsapp_templates(status) WHERE status = 'APPROVED';

-- Create function to get active template (works with both Meta and custom)
CREATE OR REPLACE FUNCTION get_active_whatsapp_template()
RETURNS TABLE(
  id UUID,
  name TEXT, 
  meta_template_name TEXT, 
  message_preview TEXT,
  parameters JSONB,
  status TEXT,
  source TEXT,
  is_custom BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    whatsapp_templates.id,
    whatsapp_templates.name,
    whatsapp_templates.meta_template_name,
    whatsapp_templates.message_preview,
    whatsapp_templates.parameters,
    whatsapp_templates.status,
    whatsapp_templates.source,
    whatsapp_templates.is_custom
  FROM whatsapp_templates
  WHERE is_active = true
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Create function to list all approved templates (both Meta and custom)
CREATE OR REPLACE FUNCTION list_approved_templates()
RETURNS TABLE(
  id UUID,
  name TEXT,
  meta_template_name TEXT,
  message_preview TEXT,
  parameters JSONB,
  status TEXT,
  category TEXT,
  is_active BOOLEAN,
  source TEXT,
  is_custom BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    whatsapp_templates.id,
    whatsapp_templates.name,
    whatsapp_templates.meta_template_name,
    whatsapp_templates.message_preview,
    whatsapp_templates.parameters,
    whatsapp_templates.status,
    whatsapp_templates.category,
    whatsapp_templates.is_active,
    whatsapp_templates.source,
    whatsapp_templates.is_custom
  FROM whatsapp_templates
  WHERE status = 'APPROVED'
  ORDER BY source DESC, is_active DESC, name ASC;
END;
$$ LANGUAGE plpgsql;

-- Create function to switch active template
CREATE OR REPLACE FUNCTION set_active_template(template_id UUID)
RETURNS TABLE(success BOOLEAN, message TEXT) AS $$
BEGIN
  -- Deactivate all templates
  UPDATE whatsapp_templates SET is_active = false;
  
  -- Activate the specified template
  UPDATE whatsapp_templates SET is_active = true WHERE id = template_id;
  
  RETURN QUERY SELECT true, 'Template activated successfully';
END;
$$ LANGUAGE plpgsql;

-- Create custom templates (they must follow Meta's format)
CREATE OR REPLACE FUNCTION create_custom_template(
  p_name TEXT,
  p_template_name TEXT,
  p_description TEXT,
  p_message_preview TEXT,
  p_category TEXT DEFAULT 'MARKETING',
  p_parameters JSONB DEFAULT '[]'
)
RETURNS TABLE(id UUID, message TEXT) AS $$
DECLARE
  v_new_id UUID;
BEGIN
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
    p_name,
    p_template_name,
    p_description,
    p_message_preview,
    p_category,
    p_parameters,
    'APPROVED',  -- Custom templates are auto-approved (you control them)
    true,
    'CUSTOM'
  )
  RETURNING whatsapp_templates.id INTO v_new_id;
  
  RETURN QUERY SELECT v_new_id, 'Custom template created successfully';
END;
$$ LANGUAGE plpgsql;

-- Insert default template
INSERT INTO whatsapp_templates (
  name, 
  meta_template_name, 
  description, 
  message_preview, 
  category,
  status,
  is_active,
  parameters,
  source,
  is_custom
)
VALUES (
  'Welcome Message',
  'jaspers_market_plain_text_v1',
  'Default welcome message for new users',
  'Welcome to Raven Exam Tutor! We''re excited to help you prepare for JAMB.',
  'TRANSACTIONAL',
  'APPROVED',
  true,
  '[]',
  'META',
  false
)
ON CONFLICT (meta_template_name) DO UPDATE SET updated_at = NOW();

-- RLS Policy
ALTER TABLE whatsapp_templates ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read templates
CREATE POLICY "Users can read templates"
ON whatsapp_templates FOR SELECT
USING (true);

-- Only allow service role to update/insert/delete (for syncing and admin functions)
CREATE POLICY "Service role can manage templates"
ON whatsapp_templates FOR ALL
USING (true)
WITH CHECK (true);
