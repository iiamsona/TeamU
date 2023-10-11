<template>
  <section>
    <v-row>
      <v-dialog v-model="newEvent" max-width="500">
        <v-card rounded="lg">
          <v-card-title class="mb-4">
            <span class="text-h5">New event</span>
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col lg="1" md="1">
                <template>
                  <v-menu rounded="lg" offset-y>
                    <template #activator="{ attrs, on }">
                      <v-sheet
                        rounded="circle"
                        width="22"
                        height="22"
                        :color="form.color ?? defaultColor"
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-list>
                      <v-list-item v-for="(eColors, index) in eventColors" :key="index" class="px-2">
                        <v-btn
                          v-for="(eColor, cIndex) in eColors"
                          :key="cIndex"
                          class="d-flex item-center justify-content-center"
                          icon
                          x-small
                          @click="form.color = eColor"
                        >
                          <v-sheet
                            width="20"
                            height="20"
                            :color="eColor"
                            rounded="circle"
                            :class="{ 'ml-1': cIndex, 'mr-1': !cIndex }"
                            class="d-flex item-center justify-content-center"
                          />
                        </v-btn>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </template>
              </v-col>
              <v-col>
                <validation-provider v-slot="{ handleSubmit }" ref="observer" slim>
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
                  </v-form>
                </validation-provider>
              </v-col>
            </v-row>
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
          </v-card-text>
        </v-card>
      </v-dialog>
      <div>
        <v-btn color="primary" depressed @click="newEvent = true" class="mb-2">
          Add new event
        </v-btn>
      </div>
    </v-row>
    <v-row>
      <v-row>
        <v-col lg="8">
          <v-card outlined rounded="lg">
            <v-card-title>Shift calendar</v-card-title>
            <v-card-subtitle>
              This is main calendar where you can see all your one-time events and job shifts.
            </v-card-subtitle>
            <div class="mb-4 d-flex justify-space-between align-center">
              <v-btn-toggle v-model="type" rounded mandatory color="primary">
                <v-btn v-for="(calendarType, index) in types" :key="index" small>
                  {{ calendarType }}
                </v-btn>
              </v-btn-toggle>
            </div>
            <v-sheet height="450">
            <v-calendar
              ref="calendar"
              v-model="value"
              :weekdays="[1, 2, 3, 4, 5, 6, 0]"
              :type="activeType"
            />
          </v-sheet>
          </v-card>
        </v-col>
        <v-col>
          <v-sheet height="540">
            <v-calendar
              color="primary"
              type="day"
            />
          </v-sheet>
        </v-col>
      </v-row>
    </v-row>
  </section>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'Calendar',
  components: { ValidationProvider },
  data () {
    return {
      newEvent: false,
      form: {
        title: null,
        description: null,
        color: '#BE8CFF'
      },
      defaultColor: '#BE8CFF',
      eventColors: [
        ['#BE8CFF', '#FFC94A'],
        ['#4E7AB2', '#B6C258'],
        ['#A9A9A9', '#F27B3F'],
        ['#7B638D', '#8AC4FF'],
        ['#C15374', '#000000']
      ],
      event: {
        start: null,
        end: null
      },
      types: ['week', 'month'],
      type: 1
    }
  },
  computed: {
    activeType () {
      return this.types[this.type]
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
