type Posts = {
  id: number
  created_at: string
  title: string
  body: string
  user_id: string
}
type Comments = {
  id: number
  created_at: string
  content: string
  user_id: string
  post_id: number
}
type Profile = {
  id: string
  name: string
  avatar_url: string | null
}
