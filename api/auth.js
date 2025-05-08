import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

export default async (req, res) => {
  try {
    const { login, password } = req.body
    
    if (req.method === 'POST') {
      if (req.url === '/api/auth/register') {
        // Регистрация через Supabase Auth
        const { data, error } = await supabase.auth.signUp({
          email: `${login}@luna.app`,
          password,
          options: {
            data: { login }
          }
        })
        
        if (error) throw error
        
        // Создаем профиль
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            login
          })
          
        if (profileError) throw profileError
        
        return res.json({ 
          token: data.session.access_token,
          user: data.user
        })
      }

      if (req.url === '/api/auth/login') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: `${login}@luna.app`,
          password
        })
        
        if (error) throw error
        
        return res.json({ 
          token: data.session.access_token,
          user: data.user
        })
      }
    }
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
  
  return res.status(405).end()
}
