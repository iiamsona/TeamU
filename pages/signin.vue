<template>
  <section class="pa-8 pa-lg-16">
    <div class="mb-8">
      <h1 class="grey--text text--darken-4 text-h4 font-weight-bold">
        Welcome back to TeamU
      </h1>
      <p class="grey--text text--darken-3 mb-0">
        Continue with Google or enter your details
      </p>
    </div>

    <v-btn
      type="submit"
      x-large
      block
      depressed
      outlined
      class="rounded-lg"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="mr-2"
      >
        <path fill-rule="evenodd" clip-rule="evenodd" d="M23.04 12.2613C23.04 11.4459 22.9668 10.6618 22.8309 9.90906H12V14.3575H18.1891C17.9225 15.795 17.1123 17.0129 15.8943 17.8284V20.7138H19.6109C21.7855 18.7118 23.04 15.7636 23.04 12.2613Z" fill="#4285F4" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9999 23.4998C15.1049 23.4998 17.7081 22.47 19.6108 20.7137L15.8942 17.8282C14.8645 18.5182 13.5472 18.9259 11.9999 18.9259C9.00469 18.9259 6.46946 16.903 5.56514 14.1848H1.7231V17.1644C3.61537 20.9228 7.50446 23.4998 11.9999 23.4998Z" fill="#34A853" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.56523 14.1851C5.33523 13.4951 5.20455 12.7581 5.20455 12.0001C5.20455 11.2422 5.33523 10.5051 5.56523 9.81512V6.83557H1.72318C0.944318 8.38807 0.5 10.1444 0.5 12.0001C0.5 13.8558 0.944318 15.6122 1.72318 17.1647L5.56523 14.1851Z" fill="#FBBC05" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9999 5.07386C13.6883 5.07386 15.2042 5.65409 16.3961 6.79364L19.6945 3.49523C17.7029 1.63955 15.0997 0.5 11.9999 0.5C7.50446 0.5 3.61537 3.07705 1.7231 6.83545L5.56514 9.815C6.46946 7.09682 9.00469 5.07386 11.9999 5.07386Z" fill="#EA4335" />
      </svg>
      Login with Google
    </v-btn>

    <v-divider class="my-11" />

    <v-form v-model="valid" @submit.prevent="login">
      <v-text-field
        v-model="form.email"
        type="email"
        label="Email"
        placeholder="Please enter your email address"
        outlined
        required
        :rules="emailRules"
        class="rounded-lg mb-6"
        hide-details="auto"
      />

      <v-text-field
        v-model="form.password"
        type="password"
        label="Password"
        placeholder="Please enter your password"
        outlined
        required
        :rules="passwordRules"
        class="rounded-lg mb-2"
        hide-details="auto"
      />

      <div>
        <p class="text-body-2 font-weight-bold text-decoration-underline text-right">
          Forgot password
        </p>
      </div>

      <v-btn
        type="submit"
        color="primary"
        x-large
        block
        depressed
        class="rounded-lg mb-6 mt-8"
      >
        Sign in
      </v-btn>

      <p class="text-body-2 text-center mb-0">
        Don’t have an account?
        <nuxt-link to="/signup" class="dark--text font-weight-bold">
          Sign up here
        </nuxt-link>
      </p>
    </v-form>
    <GeneralSnackBar
      :title="snackbar.title"
      :text="snackbar.text"
      :color="snackbar.color"
      :state.sync="snackBarState"
    />
  </section>
</template>

<script>
import snackbar from '@/mixins/snackbar'

export default {
  mixins: [snackbar],
  layout: 'auth',
  data () {
    return {
      valid: false,
      form: {
        email: null,
        password: null
      },
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required'
      ]
    }
  },
  head () {
    return {
      title: 'Sign in'
    }
  },
  methods: {
    async login () {
      if (this.valid) {
        const response = await this.$supabase.auth.signIn({
          email: this.form.email,
          password: this.form.password
        })

        if (response.error) {
          return this.toggleSnackbar('Error', response.error.message, 'red accent-2')
        }

        const { data, error } = await this.$supabase.from('profiles').select('*').eq('id', response.user.id).limit(1)

        if (!response.error && !error) {
          this.$store.commit('user/setUser', response.user)
          this.$store.commit('user/setProfile', data[0])
          return this.$router.push('/')
        }
      }
    }
  }
}
</script>
