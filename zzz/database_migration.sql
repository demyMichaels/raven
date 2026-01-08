-- ============================================
-- RAVEN EXAM PLATFORM - DATABASE MIGRATION
-- Add WhatsApp support and verify schema
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Add WhatsApp number column to users table if it doesn't exist
ALTER TABLE users ADD COLUMN IF NOT EXISTS whatsapp_number TEXT;

-- 2. Create whatsapp_logs table for message history
CREATE TABLE IF NOT EXISTS whatsapp_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE,
    phone TEXT NOT NULL,
    template TEXT,
    payload JSONB,
    response JSONB,
    status_code INTEGER,
    method TEXT, -- 'text' or 'template'
    success BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable RLS on whatsapp_logs
ALTER TABLE whatsapp_logs ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS policies for whatsapp_logs
DROP POLICY IF EXISTS "Users can view own WhatsApp logs" ON whatsapp_logs;
DROP POLICY IF EXISTS "Service role can insert WhatsApp logs" ON whatsapp_logs;

CREATE POLICY "Users can view own WhatsApp logs" 
    ON whatsapp_logs FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Service role can insert WhatsApp logs" 
    ON whatsapp_logs FOR INSERT 
    WITH CHECK (true);

-- 5. Create RPC function to log WhatsApp messages
CREATE OR REPLACE FUNCTION log_whatsapp_message(
    p_phone TEXT,
    p_template TEXT,
    p_payload JSONB,
    p_response JSONB,
    p_status_code INTEGER,
    p_method TEXT
)
RETURNS JSONB AS $$
DECLARE
    v_result JSONB;
    v_success BOOLEAN;
BEGIN
    -- Determine if the send was successful (status 200)
    v_success := (p_status_code = 200);
    
    -- Insert the log
    INSERT INTO whatsapp_logs (phone, template, payload, response, status_code, method, success)
    VALUES (p_phone, p_template, p_payload, p_response, p_status_code, p_method, v_success);
    
    -- Return success response
    v_result := jsonb_build_object(
        'success', true,
        'message', 'WhatsApp message logged',
        'status_code', p_status_code,
        'method', p_method
    );
    
    RETURN v_result;
EXCEPTION WHEN OTHERS THEN
    -- Return error response but don't fail
    v_result := jsonb_build_object(
        'success', false,
        'error', SQLERRM
    );
    RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_whatsapp_logs_phone ON whatsapp_logs(phone);
CREATE INDEX IF NOT EXISTS idx_whatsapp_logs_user_id ON whatsapp_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_whatsapp_logs_created_at ON whatsapp_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_whatsapp_logs_success ON whatsapp_logs(success);
CREATE INDEX IF NOT EXISTS idx_users_whatsapp ON users(whatsapp_number);

-- 7. Verify all required columns exist
ALTER TABLE users ADD COLUMN IF NOT EXISTS id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY;
ALTER TABLE users ADD COLUMN IF NOT EXISTS email TEXT UNIQUE NOT NULL;
ALTER TABLE users ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS photo_url TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS institute TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS course TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS target_score INTEGER CHECK (target_score >= 180 AND target_score <= 400);
ALTER TABLE users ADD COLUMN IF NOT EXISTS subjects TEXT[];
ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_complete BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS login_count INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_login TIMESTAMPTZ;
ALTER TABLE users ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- ============================================
-- VERIFICATION QUERIES (Run these to verify)
-- ============================================

-- Check users table structure
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns
WHERE table_name = 'users'
ORDER BY ordinal_position;

-- Check whatsapp_logs table structure
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns
WHERE table_name = 'whatsapp_logs'
ORDER BY ordinal_position;

-- Check RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies 
WHERE tablename IN ('users', 'whatsapp_logs')
ORDER BY tablename, policyname;

-- ============================================
-- Summary of what was added/verified:
-- ============================================
-- ✓ whatsapp_number column added to users
-- ✓ whatsapp_logs table created for message history
-- ✓ log_whatsapp_message RPC function created
-- ✓ RLS policies for whatsapp_logs enabled
-- ✓ Indexes created for better performance
-- ✓ All required columns verified in users table
-- ============================================
