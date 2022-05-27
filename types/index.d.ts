type Posts = {
  id: number
  created_at: string
  title: string
  body: string
  user_id: string
  comment_count: number
  name: string
  avatar_url: string
  updated_at: string | null
}
interface Comments {
  id: number
  created_at: string
  content: string
  reply_to: string
  parent_id: number
  replies: Comments[] | null
  user_id: string
  post_id: number
  author_name: string
  author_profile: string
}
type Profile = {
  id: string
  name: string
  avatar_url: string | null
}
