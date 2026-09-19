import { supabase } from "@/supabase/supabase-client";



const avatarBucket = await supabase.storage.createBucket('avatar');