
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://ngsmvhmgdxfrtjclgjci.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nc212aG1nZHhmcnRqY2xnamNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzNjM5MzMsImV4cCI6MjA4MzkzOTkzM30.NbjTmQiZpM47KL11PKTTIyDU85NGdkT-e5nSFLN2YEM";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkTables() {
    console.log("Checking tables...");

    // Check contact_messages
    try {
        const { error } = await supabase.from('contact_messages').select('*').limit(1);
        if (error) {
            console.log("Error checking contact_messages:", error.message);
        } else {
            console.log("contact_messages exists.");
        }
    } catch (e) {
        console.log("Exception checking contact_messages:", e);
    }

    // Check chat_messages
    try {
        const { error } = await supabase.from('chat_messages').select('*').limit(1);
        if (error) {
            console.log("Error checking chat_messages:", error.message);
        } else {
            console.log("chat_messages exists.");
        }
    } catch (e) {
        console.log("Exception checking chat_messages:", e);
    }
}

checkTables();
