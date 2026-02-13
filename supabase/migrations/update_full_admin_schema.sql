
-- Add scheduling to chat_sessions
ALTER TABLE chat_sessions 
ADD COLUMN IF NOT EXISTS scheduled_at TIMESTAMP WITH TIME ZONE;

-- Create message_templates table
CREATE TABLE IF NOT EXISTS message_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  trigger_shortcut TEXT
);

-- Enable RLS for message_templates
ALTER TABLE message_templates ENABLE ROW LEVEL SECURITY;

-- Create permissive policies for MVP (Admin only realistically)
CREATE POLICY "Public insert templates" ON message_templates FOR INSERT WITH CHECK (true);
CREATE POLICY "Public select templates" ON message_templates FOR SELECT USING (true);
CREATE POLICY "Public update templates" ON message_templates FOR UPDATE USING (true);
CREATE POLICY "Public delete templates" ON message_templates FOR DELETE USING (true);
