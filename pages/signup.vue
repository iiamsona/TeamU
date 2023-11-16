<template>
  <section class="pa-8 pa-lg-16">
    <div class="mb-8">
      <h1 class="grey--text text--darken-4 text-h4 font-weight-bold">
        Welcome to TeamU
      </h1>
      <p class="grey--text text--darken-3 mb-0">
        Please enter your details
      </p>
    </div>

    <v-form v-model="valid" @submit.prevent="signup">
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
        class="rounded-lg mb-6"
        hide-details="auto"
      />

      <v-text-field
        v-model="form.confirmPassword"
        type="password"
        label="Confirm Password"
        placeholder="Please confirm your password"
        outlined
        required
        :rules="passwordRules"
        class="rounded-lg mb-2"
        hide-details="auto"
      />

      <v-btn
        type="submit"
        color="primary"
        x-large
        block
        depressed
        class="rounded-lg mb-6 mt-8"
      >
        Sign up
      </v-btn>

      <p class="text-body-2 text-center mb-0">
        Already have an account?
        <nuxt-link to="/signin" class="dark--text font-weight-bold">
          Sign in here
        </nuxt-link>
      </p>
    </v-form>
  </section>
</template>

<script>
export default {
  layout: 'auth',
  data () {
    return {
      valid: false,
      form: {
        email: null,
        password: null,
        confirmPassword: null
      },
      emailRules: [
        v => !!v || 'Email is required',
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
    async signup () {
      if (this.valid) {
        const user = await this.$supabase.auth.signUp({
          email: this.form.email,
          password: this.form.password
        })

        console.log(user)
        // Open modal and let user know that his account has been created
        // The text should say that he needs to confirm the email and then show login button and close
        // Clear the form after that
      }
    }
  }
}
</script>
