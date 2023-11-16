<template>
  <v-row tag="section">
    <v-col sm="12" lg="6">
      <v-card elevation="0" outlined rounded="lg">
        <v-card-title>
          Edit your profile
        </v-card-title>

        <v-card-text>
          <validation-observer v-slot="{ handleSubmit }" slim>
            <v-form @submit.prevent="handleSubmit(submit)">
              <validation-provider
                v-slot="{ errors }"
                name="First Name"
                rules="required|max:100"
                class="mb-2"
                tag="div"
              >
                <v-text-field
                  v-model="form.firstname"
                  outlined
                  :counter="100"
                  :error-messages="errors"
                  label="First Name"
                />
              </validation-provider>

              <validation-provider
                v-slot="{ errors }"
                slim
                name="Last Name"
                rules="required|max:100"
                class="mb-2"
                tag="div"
              >
                <v-text-field
                  v-model="form.lastname"
                  outlined
                  :counter="100"
                  :error-messages="errors"
                  label="Last Name"
                />
              </validation-provider>

              <v-text-field
                v-model="user.email"
                outlined
                disabled
                label="Email"
              />

              <validation-provider
                v-slot="{ errors }"
                slim
                name="Job position"
                rules="max:100"
                class="mb-2"
                tag="div"
              >
                <v-text-field
                  v-model="form.jobPosition"
                  outlined
                  :counter="100"
                  :error-messages="errors"
                  label="Job position"
                  hint="Let people know what you do (optional)."
                  persistent-hint
                />
              </validation-provider>

              <validation-provider
                v-slot="{ errors }"
                slim
                name="Bio"
                rules="max:100"
                class="mb-2"
                tag="div"
              >
                <v-textarea
                  v-model="form.bio"
                  outlined
                  name="Bio"
                  label="Bio"
                  hint="Tell us about yourself (optional)."
                  persistent-hint
                  :error-messages="errors"
                />
              </validation-provider>

              <validation-provider
                v-slot="{ errors }"
                slim
                name="Timezone"
                rules="required"
              >
                <v-select
                  v-model="form.timezone"
                  :items="timezones"
                  label="Timezone"
                  outlined
                  hint="Your current time zone. Used to send summary and notification emails, for times in your activity feeds, and for reminders."
                  persistent-hint
                  :error-messages="errors"
                />
              </validation-provider>
              <div class="mt-4 text-right">
                <v-btn color="primary" type="submit" large :loading="loading">
                  Save Changes
                </v-btn>
              </div>
            </v-form>
          </validation-observer>
        </v-card-text>
      </v-card>
    </v-col>
    <GeneralSnackBar
      :title="snackbar.title"
      :text="snackbar.text"
      :color="snackbar.color"
      :state.sync="snackBarState"
    />
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { cloneDeep } from 'lodash'
import timezones from '@/utils/timezones'
import snackbar from '@/mixins/snackbar'

export default {
  mixins: [snackbar],
  data () {
    return {
      loading: false,
      timezones,
      form: {
        firstname: null,
        lastname: null,
        bio: null,
        jobPosition: null,
        timezone: null
      }
    }
  },
  head () {
    return {
      title: 'Profile'
    }
  },
  computed: {
    ...mapState('user', ['user', 'profile']),
    currentTimezone () {
      return Intl.DateTimeFormat().resolvedOptions().timeZone
    }
  },
  created () {
    if (this.profile) {
      this.form = cloneDeep(this.profile)
    }

    this.form.id = this.user.id
    this.form.timezone = this.currentTimezone
  },
  methods: {
    ...mapActions('user', ['upsertProfile']),
    async submit () {
      this.loading = true

      try {
        await this.upsertProfile(this.form)
        this.toggleSnackbar('Success', 'Your profile data has been updated successfully!')
      } catch (error) {
        this.toggleSnackbar('Error', 'Something went wrong, please try later!', 'red accent-2')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
