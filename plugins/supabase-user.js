export default async ({ app, $supabase, store, redirect }) => {
  const accessToken = app.$cookies.get('my-access-token')
  const refreshToken = app.$cookies.get('my-refresh-token')

  if (!accessToken || !refreshToken) {
    return false
  }

  await $supabase.auth.setSession({ refresh_token: refreshToken, access_token: accessToken })

  const user = await $supabase.auth.user()

  if (!user) {
    return redirect('/signin')
  }

  const { data, error } = await $supabase.from('profiles').select('*').eq('id', user.id).limit(1)

  if (error) {
    return false
  }

  store.commit('user/setUser', user, { root: true })
  store.commit('user/setProfile', data[0] ?? null, { root: true })
}
