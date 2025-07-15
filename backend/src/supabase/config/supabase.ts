
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://occxzvskpsbvawaifggq.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseKey) {
  throw new Error('Missing SUPABASE_KEY environment variable');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;