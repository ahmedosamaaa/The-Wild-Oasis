import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://shgycykypfjkanqrngnu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoZ3ljeWt5cGZqa2FucXJuZ251Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYzNjUxNzIsImV4cCI6MjAyMTk0MTE3Mn0.ULXXJLWmNMUOIVnEC3rJv5t7367nNqaI2AVmT9-onwQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export const supabase2 = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storageKey: "s1",
  },
});

export default supabase;
