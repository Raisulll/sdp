import { createClient } from "@supabase/supabase-js";

const URL = import.meta.env.VITE_SUPABASE_URL;
const ANON_KEY = import.meta.env.VITE_SUPABASE_SERVICE_ROLE;

const supabase = createClient(URL, ANON_KEY);

export default supabase;
