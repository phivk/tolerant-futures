import { createClient } from '@supabase/supabase-js'
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmc3NzeHZjYm56ZWZxaWF3cXlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTAxMTgwODksImV4cCI6MTk2NTY5NDA4OX0.TTw9qeALK50U8s1vA2k6kDKGwCewObZhtkFFASgwi6M'
export default ({ app }, inject) => {
  const supabaseUrl = 'https://ffsssxvcbnzefqiawqyd.supabase.co'
  const supabaseKey = SUPABASE_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)

  inject('supabase', supabase)
}
