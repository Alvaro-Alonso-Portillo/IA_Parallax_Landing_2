
-- 1. Create table for Chat Sessions (conversations)
CREATE TABLE IF NOT EXISTS chat_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  title TEXT, -- Optional title (e.g. "User asked about pricing")
  user_ip TEXT,
  metadata JSONB
);

-- 2. Create table for Chat Messages
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL
);

-- 3. Enable RLS
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- 4. Create Policies (MVP: Open for Anon to read/write for now to make dashboard work easily)
-- WARNING: In production, you'd want restricted policies.
-- Allow Anon to INSERT (for the chatbot to save messages)
CREATE POLICY "Enable insert for anon (sessions)" ON chat_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for anon (messages)" ON chat_messages FOR INSERT WITH CHECK (true);

-- Allow Anon to SELECT (for the Dashboard to read messages)
CREATE POLICY "Enable select for anon (sessions)" ON chat_sessions FOR SELECT USING (true);
CREATE POLICY "Enable select for anon (messages)" ON chat_messages FOR SELECT USING (true);

-- Ensure contact_messages exists (if not created yet)
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new'
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable insert for anon (contacts)" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable select for anon (contacts)" ON contact_messages FOR SELECT USING (true);
