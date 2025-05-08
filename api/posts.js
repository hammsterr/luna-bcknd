import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

export default async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(token)
    
    if (error) throw error

    switch (req.method) {
      case 'GET':
        const { data: posts } = await supabase
          .from('posts')
          .select(`
            id,
            content,
            likes,
            created_at,
            author:profiles (login, avatar_url)
          `)
          .order('created_at', { ascending: false })
        
        return res.json(posts)

      case 'POST':
        const { content } = req.body
        const { data: post } = await supabase
          .from('posts')
          .insert({
            content,
            author_id: user.id
          })
          .select(`
            id,
            content,
            likes,
            created_at,
            author:profiles (login, avatar_url)
          `)
          .single()
        
        return res.json(post)
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
