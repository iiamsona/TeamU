<template>
  <section>
    <v-row>
      <v-dialog v-model="dialog" max-width="500">
        <v-card rounded="lg">
          <v-card-title class="mb-4">
            <span class="text-h5">New event</span>
          </v-card-title>

          <v-card-text>
            <validation-observer v-slot="{ handleSubmit }" ref="observer" slim>
              <v-form @submit.prevent="handleSubmit(submit)">
                <!-- title input -->
                <validation-provider
                  v-slot="{ errors }"
                  name="title"
                  rules="required|max:255"
                  class="mb-2"
                  tag="div"
                >
                  <v-text-field
                    v-model="form.name"
                    outlined
                    :counter="255"
                    :error-messages="errors"
                    label="Title"
                  >
                    <!-- color picker -->
                    <template #prepend>
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
                  </v-text-field>
                </validation-provider>
                <!-- description input -->
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
                <!-- row of dates -->
                <v-row no-gutter>
                  <v-col>
                    <!-- start date -->
                    <validation-provider
                      v-slot="{ errors }"
                      slim
                      name="start date"
                      rules="required"
                      class="mb-2"
                      tag="div"
                    >
                      <v-datetime-picker
                        v-model="form.start"
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
                    <!-- start date -->
                    <validation-provider
                      v-slot="{ errors }"
                      slim
                      name="end date"
                      rules="required"
                      class="mb-2"
                      tag="div"
                    >
                      <v-datetime-picker
                        v-model="form.end"
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
                <!-- form btns -->
                <div class="text-right mt-4">
                  <v-btn v-if="form.name === null" depressed @click="dialog = false">
                    Close
                  </v-btn>
                  <v-btn v-else depressed color="error" @click="openDeleteConfirmation">
                    Delete
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
      <!-- add new event btn -->
      <div>
        <v-btn color="primary" depressed class="mb-2" @click="dialog = true">
          Add new event
        </v-btn>
      </div>
      <!-- delete dialog -->
       <v-dialog
        v-model="dialogConfirmaition"
        max-width="450"
      >
        <v-card>
          <v-card-title class="text-h5">
            Event Remove
          </v-card-title>

          <v-card-text>
            Are you sure that you want to remove the event, you can't revert this action?
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
      <!-- calendars -->
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
              <div class="d-flex align-center">
                <p class="mb-0 mr-2 grey--text text--darken-4 font-weight-bold">
                  {{ calendarDates }}
                </p>
                <v-btn icon small depressed @click="$refs.calendar.prev()">
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn icon small depressed @click="$refs.calendar.next()">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </div>
            </div>
          </v-card>
          <v-sheet height="450">
            <v-calendar
              ref="calendar"
              v-model="value"
              :weekdays="[1, 2, 3, 4, 5, 6, 0]"
              :type="activeType"
              color="primary"
              :events="events"
              event-overlap-mode="column"
              :event-overlap-threshold="30"
              @change="rangeChanged"
              @click:event="openEditModal"
            />
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet height="540">
            <v-calendar
              ref="dayCalendar"
              v-model="dayValue"
              type="day"
              :events="events"
              color="primary"
            />
          </v-sheet>
        </v-col>
      </v-row>
    </v-row>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { ValidationProvider } from 'vee-validate'
import { cloneDeep } from 'lodash'
import snackbar from '@/mixins/snackbar'

export default {
  name: 'Calendar',
  components: { ValidationProvider },
  mixins: [snackbar],
  async asyncData ({ store }) {
    await store.dispatch('events/fetchEvents')
  },
  data () {
    return {
      dialog: false,
      eventFormLoading: false,
      dialogConfirmaition: false,
      calendarDates: '',
      value: '',
      dayValue: '',
      removableId: null,
      form: {
        name: null,
        description: null,
        color: '#BE8CFF',
        start: null,
        end: null
      },
      defaultColor: '#BE8CFF',
      eventColors: [
        ['#BE8CFF', '#FFC94A'],
        ['#4E7AB2', '#B6C258'],
        ['#A9A9A9', '#F27B3F'],
        ['#7B638D', '#8AC4FF'],
        ['#C15374', '#000000']
      ],
      types: ['week', 'month'],
      type: 1
    }
  },
  async fetch () {
    await this.fetchEvents()
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
        this.form = {
          name: null,
          description: null,
          color: '#BE8CFF',
          start: null,
          end: null
        }
      }
    }
  },
  computed: {
    ...mapState('events', ['events']),
    ...mapState('user', ['user']),
    activeType () {
      return this.types[this.type]
    }
  },
  methods: {
    ...mapActions('events', ['fetchEvents', 'upsertEvent', 'deleteEvent']),
    rangeChanged ({ start }) {
      const date = new Date(start.date)
      const year = date.getFullYear()
      const month = date.getMonth() + 1 // Adding 1 cuz getMonth() returns a zero-based index
      this.calendarDates = `${year}-${month}`
    },
    async deleteItem () {
      await this.deleteEvent(this.removableId)
      this.dialogConfirmaition = false
      this.dialog = false
    },
    openDeleteConfirmation () {
      this.removableId = this.form.id
      this.dialogConfirmaition = true
    },
    openEditModal (events) {
      this.form = cloneDeep(events.event)
      this.dialog = true
    },
    async submit () {
      this.eventFormLoading = true
      if (!this.form.user_id) {
        this.form.user_id = this.user.id
      }
      try {
        await this.upsertEvent({
          name: this.form.name,
          description: this.form.description,
          color: this.form.color,
          start: this.form.start,
          end: this.form.end
        })
        console.log(this.name)
        this.toggleSnackbar('Success',
          !this.form.id ? 'The event has been created successfully!' : 'The event has been updated successfully!'
        )
      } catch (error) {
        this.toggleSnackbar('Error', 'Something went wrong, please try later!', 'red accent-2')
      } finally {
        this.dialog = false
      }
    }
  }
}
</script>
