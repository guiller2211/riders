import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl: string = 'https://mygdufjetbyenygxcgiv.supabase.co';
const supabaseKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15Z2R1ZmpldGJ5ZW55Z3hjZ2l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc3Mzk1MTEsImV4cCI6MjAyMzMxNTUxMX0.6LzrqX3Yf6_BzOuzxMYTDhuCc5wVuEsiA9hOX5tR9Y4';
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabase;
