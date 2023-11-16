export default ({ app, $supabase }) => {
  $supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
      const maxAge = 100 * 365 * 24 * 60 * 60 // 100 years, never expires

      app.$cookies.set('my-access-token', session.access_token, { path: '/', maxAge, SameSite: 'Lax', secure: true })
      app.$cookies.set('my-refresh-token', session.refresh_token, { path: '/', maxAge, SameSite: 'Lax', secure: true })
    }

    if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
      const expires = new Date(0).toUTCString()

      app.$cookies.remove('my-access-token', { path: '/', expires, SameSite: 'Lax', secure: true })
      app.$cookies.remove('my-refresh-token', { path: '/', expires, SameSite: 'Lax', secure: true })
    }
  })
}
