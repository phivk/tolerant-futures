import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NUXT_ENV_SUPABASE_URL
const supabaseKey = process.env.NUXT_ENV_SUPABASE_KEY

export default ({ app }, inject) => {
  const supabase = createClient(supabaseUrl, supabaseKey)

  inject('supabase', supabase)
}
