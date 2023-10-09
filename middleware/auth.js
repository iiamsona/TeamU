export default ({ app, redirect }) => {
  const accessToken = app.$cookies.get('my-access-token')
  const refreshToken = app.$cookies.get('my-refresh-token')

  if (!refreshToken && !accessToken) {
    redirect('/signin')
  }
}
