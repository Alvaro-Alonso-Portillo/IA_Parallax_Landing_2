
import { createClient } from "@supabase/supabase-js";
import 'dotenv/config';

const supabaseUrl = "https://ngsmvhmgdxfrtjclgjci.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nc212aG1nZHhmcnRqY2xnamNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzNjM5MzMsImV4cCI6MjA4MzkzOTkzM30.NbjTmQiZpM47KL11PKTTIyDU85NGdkT-e5nSFLN2YEM";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkTables() {
    console.log("Checking tables...");
    const { data, error } = await supabase.from('contact_messages').select('*').limit(1);
    if (error) {
        console.log("Error accessing contact_messages:", error.message);
    } else {
        console.log("contact_messages table exists.");
    }

    const { data: chatData, error: chatError } = await supabase.from('chat_messages').select('*').limit(1);
    if (chatError) {
        console.log("Error accessing chat_messages:", chatError.message);
    } else {
        console.log("chat_messages table exists.");
    }
}

checkTables();
