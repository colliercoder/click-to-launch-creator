// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://enhzqqxathcpcgidoxju.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuaHpxcXhhdGhjcGNnaWRveGp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyMjAwNDAsImV4cCI6MjA1Mzc5NjA0MH0.FfVVE-t_87zeEckpyu0_1lxfdulROjO8aujMjfczt3w";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);