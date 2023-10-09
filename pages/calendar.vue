<template>
  <v-row tag="section">
    <v-dialog v-model="newEvent" max-width="500">
      <v-card rounded="lg">
        <v-card-title class="mb-4">
          <span class="text-h5">New event</span>
        </v-card-title>

        <v-card-text>
          <validation-observer v-slot="{ handleSubmit }" ref="observer" slim>
            <v-form @submit.prevent="handleSubmit(submit)">
              <validation-provider
                v-slot="{ errors }"
                name="title"
                rules="required|max:255"
                class="mb-2"
                tag="div"
              >
                <v-text-field
                  v-model="form.title"
                  outlined
                  :counter="255"
                  :error-messages="errors"
                  label="Title"
                />
              </validation-provider>

              <validation-provider
                v-slot="{ errors }"
                slim
                name="description"
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
                  persistent-hint
                  :error-messages="errors"
                />
              </validation-provider>

              <v-row no-gutter>
                <v-col>
                  <validation-provider
                    v-slot="{ errors }"
                    slim
                    name="start date"
                    rules="required"
                    class="mb-2"
                    tag="div"
                  >
                    <v-datetime-picker
                      v-model="event.start"
                      :text-field-props="{ outlined: true, prependIcon: 'mdi-calendar', errorMessages: errors }"
                      :date-picker-props="{noTitle: true}"
                      label="Start time"
                      ok-text="Save"
                      clear-text="Reset"
                    >
                      <template #dateIcon>
                        <v-icon>mdi-calendar</v-icon>
                      </template>
                      <template #timeIcon>
                        <v-icon>mdi-clock-outline</v-icon>
                      </template>
                    </v-datetime-picker>
                  </validation-provider>
                </v-col>
                <v-col>
                  <validation-provider
                    v-slot="{ errors }"
                    slim
                    name="start date"
                    rules="required"
                    class="mb-2"
                    tag="div"
                  >
                    <v-datetime-picker
                      v-model="event.end"
                      :text-field-props="{ outlined: true, errorMessages: errors }"
                      :date-picker-props="{ noTitle: true }"
                      label="End time"
                      ok-text="Save"
                      clear-text="Reset"
                    >
                      <template #dateIcon>
                        <v-icon>mdi-calendar</v-icon>
                      </template>
                      <template #timeIcon>
                        <v-icon>mdi-clock-outline</v-icon>
                      </template>
                    </v-datetime-picker>
                  </validation-provider>
                </v-col>
              </v-row>
              <div class="text-right mt-4">
                <v-btn depressed @click="newEvent = false">
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
    <div>
      <v-btn color="primary" depressed @click="newEvent = true">
        Add new event
      </v-btn>
    </div>
  </v-row>
</template>

<script>
export default {
  name: 'Calendar',
  data () {
    return {
      newEvent: false,
      form: {
        title: null,
        description: null
      },
      event: {
        start: null,
        end: null
      }
    }
  },
  methods: {
    async submit () {
      if (this.form.id) {
        await this.updateJob({
          name: this.form.title,
          description: this.form.description,
          id: this.form.id
        })
      } else {
        this.form.user_id = this.user.id
        await this.createEvent(this.form)
      }

      this.dialog = false
    }
  }
}
</script>
