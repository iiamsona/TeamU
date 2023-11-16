<template>
  <section>
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="mb-4">
          <span class="text-h5">New job</span>
        </v-card-title>

        <v-card-text>
          <validation-observer v-slot="{ handleSubmit }" ref="observer" slim>
            <v-form @submit.prevent="handleSubmit(submit)">
              <validation-provider
                v-slot="{ errors }"
                name="Name"
                rules="required|max:255"
                class="mb-2"
                tag="div"
              >
                <v-text-field
                  v-model="form.name"
                  outlined
                  :counter="255"
                  :error-messages="errors"
                  label="Name"
                />
              </validation-provider>

              <validation-provider
                v-slot="{ errors }"
                slim
                name="Description"
                rules="required|max:500"
                class="mb-2"
                tag="div"
              >
                <v-textarea
                  v-model="form.description"
                  outlined
                  name="Description"
                  label="Description"
                  :counter="500"
                  hint="Tell us about your job."
                  persistent-hint
                  :error-messages="errors"
                />
              </validation-provider>

              <div class="text-right mt-4">
                <v-btn depressed @click="dialog = false">
                  Close
                </v-btn>
                <v-btn color="primary" depressed type="submit">
                  Save
                </v-btn>
              </div>
            </v-form>
          </validation-observer>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogConfirmaition"
      max-width="450"
    >
      <v-card>
        <v-card-title class="text-h5">
          Job Remove
        </v-card-title>

        <v-card-text>
          Are you sure that you want to remove the job, you can't revert this action?
        </v-card-text>

        <v-card-actions>
          <v-btn text @click="dialogConfirmaition = false">
            Close
          </v-btn>

          <v-btn color="red darken-3" text @click="deleteItem">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div>
      <v-btn color="primary" depressed @click="dialog=true">
        Create new job
      </v-btn>
    </div>

    <v-row tag="section" class="mt-4">
      <v-col v-for="(job, index) in jobsList" :key="index" sm="6" lg="3">
        <v-card elevation="0" outlined rounded="lg">
          <v-card-title>
            {{ job.name }}
            <v-icon small class="ml-2">
              mdi-lock
            </v-icon>
          </v-card-title>

          <v-card-text>
            <p>{{ job.description }}</p>
          </v-card-text>

          <v-card-actions>
            <v-btn text color="red accent-4" @click="openDeleteConfirmation(job.id)">
              Delete
            </v-btn>
            <v-btn text color="primary" @click="openEditModal(job)">
              Edit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <GeneralSnackBar
        :title="snackbar.title"
        :text="snackbar.text"
        :color="snackbar.color"
        :state.sync="snackBarState"
      />
    </v-row>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { cloneDeep } from 'lodash'
import snackbar from '@/mixins/snackbar'

export default {
  mixins: [snackbar],
  async asyncData ({ store }) {
    await store.dispatch('jobs/fetchJobs')
  },
  data () {
    return {
      dialog: false,
      dialogConfirmaition: false,
      removableId: null,
      form: {
        name: null,
        description: null
      }
    }
  },
  head () {
    return {
      title: 'Jobs'
    }
  },
  computed: {
    ...mapState('jobs', ['jobsList']),
    ...mapState('user', ['user'])
  },
  watch: {
    dialogConfirmaition (newValue) {
      if (!newValue) {
        this.removableId = null
      }
    },
    dialog (newValue) {
      if (!newValue) {
        this.$refs.observer.reset()
        this.form = { name: null, description: null }
      }
    }
  },
  methods: {
    ...mapActions('jobs', ['createJob', 'updateJob', 'deleteJob']),
    async submit () {
      try {
        if (this.form.id) {
          await this.updateJob(this.form)
        } else {
          this.form.user_id = this.user.id
          await this.createJob(this.form)
        }

        this.toggleSnackbar('Success', `Your job data has been ${this.form.id ? 'updated' : 'created'} successfully!`)
      } catch (error) {
        this.toggleSnackbar('Error', 'Something went wrong, please try later!', 'red accent-2')
        console.log(error)
      } finally {
        this.loading = false
        this.dialog = false
      }
    },
    async deleteItem () {
      await this.deleteJob(this.removableId)
      this.dialogConfirmaition = false
    },
    openEditModal (job) {
      this.form = cloneDeep(job)
      this.dialog = true
    },
    openDeleteConfirmation (id) {
      this.removableId = id
      this.dialogConfirmaition = true
    }
  }
}
</script>
