import "dotenv/config";
import { createClient } from "@supabase/supabase-js";


const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
	throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey);