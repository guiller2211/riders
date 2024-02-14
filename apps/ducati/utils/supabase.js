import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://mygdufjetbyenygxcgiv.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15Z2R1ZmpldGJ5ZW55Z3hjZ2l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc3Mzk1MTEsImV4cCI6MjAyMzMxNTUxMX0.6LzrqX3Yf6_BzOuzxMYTDhuCc5wVuEsiA9hOX5tR9Y4';
export const supabase = createClient(supabaseUrl, supabaseKey);
