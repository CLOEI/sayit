type Post = {
  id: number
  created_at: string
  title: string
  body: string
  author_profile: string
  author_name: string
  user_id: string
}
type Comments = {
  id: number
  created_at: string
  comment: string
  user_id: string
  post_id: number
  author_profile: string
  author_name: string
}
