
-- Add more CRM fields to chat_sessions
ALTER TABLE chat_sessions 
ADD COLUMN IF NOT EXISTS user_company TEXT,
ADD COLUMN IF NOT EXISTS user_role TEXT,
ADD COLUMN IF NOT EXISTS lead_source TEXT DEFAULT 'chat';

-- Update search index
-- No special action needed for simple TEXT columns generally unless we want full text search
