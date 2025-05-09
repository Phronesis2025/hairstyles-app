import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tzqjcusfzcpyzjkvtwrg.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6cWpjdXNmemNweXpqa3Z0d3JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3MjY3OTIsImV4cCI6MjA2MjMwMjc5Mn0.HK0ecNHwCeAzWbrHlVqJlUmNqoo57XV6ivnKd1CBtks"; // Replace with your anon key from /server/.env

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
