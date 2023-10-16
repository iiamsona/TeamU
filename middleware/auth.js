export default ({ app, $supabase, redirect }) => {
  const accessToken = app.$cookies.get('my-access-token')
  const refreshToken = app.$cookies.get('my-refresh-token')
  const session = $supabase.auth.session()

  if ((!refreshToken && !accessToken) || !session) {
    redirect('/signin')
  }
}
