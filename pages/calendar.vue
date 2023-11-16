<template>
  <section>
    <v-row>
      <v-col cols="12">
        <v-btn color="primary" depressed @click.prevent="eventDialog = true">
          Add new event
        </v-btn>
        <v-btn outlined deprressed color="primary" @click.prevent="shiftDialog = true">
          Create Shift
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="eventDialog" max-width="600">
      <v-card rounded="lg">
        <v-card-title>
          <span class="text-h5">{{ eventForm.id ? 'UPdate Event' : 'Create Event' }}</span>
        </v-card-title>
        <v-card-text>
          <validation-observer v-slot="{ handleSubmit }" ref="eventObserver" slim>
            <v-form @submit.prevent="handleSubmit(submitEvent)">
              <validation-provider
                v-slot="{ errors }"
                name="Name"
                rules="required|max:255"
                class="mb-2"
                tag="div"
              >
                <v-text-field
                  v-model="eventForm.name"
                  outlined
                  :counter="255"
                  :error-messages="errors"
                  label="Name"
                >
                  <template #prepend>
                    <v-menu
                      v-model="colorPickerDialog"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :nudge-bottom="40"
                      transition="scale-transition"
                      offset-y
                      color="white"
                    >
                      <template #activator="{ on }">
                        <v-btn icon color="primary" v-on="on">
                          <v-icon :style="{ color: eventColor }">
                            mdi-circle
                          </v-icon>
                        </v-btn>
                      </template>
                      <v-row class="white">
                        <v-col
                          v-for="(colors, index) in colorOptions"
                          :key="index"
                        >
                          <v-btn v-for="(color, cindex) in colors" :key="cindex" icon @click="selectColorDialog(color)">
                            <v-icon :style="{ color }">
                              mdi-circle
                            </v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-menu>
                  </template>
                </v-text-field>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="Description"
                rules="required|max:255"
                class="mb-2"
                tag="div"
              >
                <v-textarea
                  v-model="eventForm.description"
                  outlined
                  :counter="255"
                  :error-messages="errors"
                  label="Description"
                />
              </validation-provider>

              <validation-provider
                v-slot="{ errors }"
                slim
                name="End"
                rules="required"
              >
                <v-datetime-picker
                  v-model="eventForm.start"
                  :text-field-props="{ outlined: true, errorMessages: errors }"
                  :date-picker-props="{ noTitle: true, max: eventForm.end ? $moment(eventForm.end.toString()).format('YYYY-MM-DD') : null }"
                  :time-picker-props="{ noTitle: true, format: '24hr', max: eventForm.end ? $moment(eventForm.end.toString()).format('HH:mm') : null}"
                  ok-text="Save"
                  clear-text="Reset"
                  label="Start time"
                >
                  <template #dateIcon>
                    <v-icon>mdi-calendar</v-icon>
                  </template>
                  <template #timeIcon>
                    <v-icon>mdi-clock-outline</v-icon>
                  </template>
                </v-datetime-picker>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                slim
                name="End"
                rules="required"
              >
                <v-datetime-picker
                  v-model="eventForm.end"
                  :text-field-props="{outlined: true, errorMessages: errors}"
                  :date-picker-props="{noTitle: true, min: eventForm.start ? $moment(eventForm.start.toString()).format('YYYY-MM-DD') : null}"
                  :time-picker-props="{noTitle: true, format: '24hr', min: eventForm.start ? $moment(eventForm.start.toString()).format('HH:mm') : null}"
                  ok-text="Save"
                  clear-text="Reset"
                  label="End time"
                >
                  <template #dateIcon>
                    <v-icon>mdi-calendar</v-icon>
                  </template>
                  <template #timeIcon>
                    <v-icon>mdi-clock-outline</v-icon>
                  </template>
                </v-datetime-picker>
              </validation-provider>

              <div class="text-right mt-4">
                <v-btn depressed v-if="eventForm.id" @click="deleteEvent" color="error">
                  Delete
                </v-btn>
                <v-btn depressed @click="eventDialog = false">
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

    <v-dialog v-model="shiftDialog" max-width="500">
      <v-card rounded="lg">
        <v-card-title>
          <span class="text-h5">New Shift</span>
        </v-card-title>
        <v-card-text>
          <validation-observer v-slot="{ handleSubmit }" ref="shiftObserver" slim>
            <v-form @submit.prevent="handleSubmit(submitShift)">
              <validation-provider
                v-slot="{ errors }"
                name="Name"
                rules="required|max:255"
                class="mb-2"
                tag="div"
              >
                <v-text-field
                  v-model="shiftForm.name"
                  outlined
                  :counter="255"
                  :error-messages="errors"
                  label="Name"
                />
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="Description"
                rules="required|max:255"
                class="mb-2"
                tag="div"
              >
                <v-textarea
                  v-model="shiftForm.description"
                  outlined
                  :counter="255"
                  :error-messages="errors"
                  label="Description"
                />
              </validation-provider>

              <v-row>
                <v-col sm="12" lg="6">
                  <v-menu
                    ref="startMenu"
                    v-model="startMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="shiftForm.start"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template #activator="{ on, attrs }">
                      <v-text-field
                        v-model="shiftForm.start"
                        label="start time"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-time-picker
                      v-if="startMenu"
                      v-model="shiftForm.start"
                      format="24hr"
                      full-width
                      @click:minute="$refs.startMenu.save(shiftForm.start)"
                    />
                  </v-menu>
                </v-col>
                <v-col sm="12" lg="6">
                  <v-menu
                    ref="endMenu"
                    v-model="endMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="shiftForm.end"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template #activator="{ on, attrs }">
                      <v-text-field
                        v-model="shiftForm.end"
                        label="End time"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-time-picker
                      v-if="endMenu"
                      v-model="shiftForm.end"
                      format="24hr"
                      full-width
                      @click:minute="$refs.endMenu.save(shiftForm.end)"
                    />
                  </v-menu>
                </v-col>
              </v-row>

              <v-btn-toggle v-model="shiftForm.days" color="primary" outlined  rounded multiple>
                <v-btn v-for="(day, index) in days" :key="index">
                  {{ day }}
                </v-btn>
              </v-btn-toggle>

              <div class="text-right mt-4">
                <v-btn depressed v-if="shiftForm.id" @click="removeShift" color="error">
                  Delete
                </v-btn>
                <v-btn depressed @click="shiftDialog = false">
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

    <v-row>
      <v-col v-for="(shift, index) in shifts" :key="index" sm="6" lg="3">
        <v-card flat outlined rounded="lg">
          <v-card-text>
            <i>{{ shift.name }}</i>
          </v-card-text>

          <v-card-text>
            <p>
              <v-icon>mdi-clock-outline</v-icon>
              {{ $moment(shift.start, 'HH:mm:ss').format('HH:mm') }} - {{ $moment(shift.end, 'HH:mm:ss').format('HH:mm') }}
            </p>
          </v-card-text>

          <v-card-actions>
            <v-btn x-small text color="primary" @click="openShiftEditModal(shift)">
              Edit
            </v-btn>
            <v-btn x-small text color="primary" @click="generateEvents(shift)">
              Add to calendar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col sm="12" lg="8">
        <v-card>
          <v-card-title>
            Shift Calendar
          </v-card-title>
          <v-card-subtitle>
            This is main calendar where you can see all your one-time events and job shifts.
          </v-card-subtitle>
          <v-card-text>
            <div class="mb-4 d-flex justify-space-between align-center">
              <v-btn-toggle
                v-model="type"
                rounded
                mandatory
                color="primary"
              >
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
            <v-sheet height="600">
              <v-calendar
                ref="calendar"
                v-model="value"
                :weekdays="[1, 2, 3, 4, 5, 6, 0]"
                :type="activeType"
                :events="events"
                event-overlap-mode="column"
                :event-overlap-threshold="30"
                @change="rangeChanged"
                @click:event="openEventEditModal($event)"
              />
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="12" lg="4">
        <v-card>
          <v-card-title>
            Today is {{ $moment().format('DD MMM YYYY') }}
          </v-card-title>
          <v-card-subtitle>Here you can see all scheduled events for today.</v-card-subtitle>
          <v-card-text>
            <v-sheet height="645">
              <v-calendar ref="dayCalendar" v-model="dayValue" type="day" :events="events" />
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <GeneralSnackBar
      :title="snackbar.title"
      :text="snackbar.text"
      :color="snackbar.color"
      :state.sync="snackBarState"
    />
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { cloneDeep } from 'lodash'
import snackbar from '@/mixins/snackbar'

export default {
  mixins: [snackbar],
  data () {
    return {
      eventFormLoading: false,
      shiftFormLoading: false,
      eventDialog: false,
      shiftDialog: false,
      startMenu: false,
      endMenu: false,
      eventForm: {
        name: null,
        description: null,
        start: null,
        end: null
      },
      shiftForm: {
        name: null,
        description: null,
        start: null,
        end: null,
        days: []
      },
      calendarDates: '',
      value: '',
      dayValue: '',
      type: 1,
      types: ['week', 'month'],
      colorPickerDialog: false,
      eventColor: '#a503fc',
      colorOptions: [
        ['#03b1fc', '#a503fc'],
        ['#f7f30a', '#41fa41'],
        ['#ff2317', '#ff17c1'],
        ['#707070', '#81a698']
      ],
      days: ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']
    }
  },
  async fetch () {
    await this.fetchEvents()
    await this.fetchShifts()
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      events: state => state.events.events,
      shifts: state => state.shifts.shifts
    }),
    activeType () {
      return this.types[this.type]
    }
  },
  watch: {
    eventDialog (newValue) {
      if (!newValue) {
        this.$refs.eventObserver.reset()
        this.eventForm = { name: null, description: null, start: null, end: null }
      }
    },
    shiftDialog (newValue) {
      if (!newValue) {
        this.$refs.shiftObserver.reset()
        this.shiftForm = {
          name: null,
          description: null,
          start: null,
          end: null,
          days: []
        }
      }
    }
  },
  methods: {
    ...mapActions('events', ['fetchEvents', 'upsertEvent', 'deleteEvent', 'bulkAddEvents']),
    ...mapActions('shifts', ['fetchShifts', 'upsertShift', 'deleteShift']),
    rangeChanged ({ start, end }) {
      this.calendarDates = `${start.date} - ${end.date}`
    },
    selectColorDialog (color) {
      this.eventColor = color
      this.colorPickerDialog = false
    },
    async submitEvent () {
      this.eventFormLoading = true

      if (!this.eventForm.user_id) {
        this.eventForm.user_id = this.user.id
      }

      try {
        await this.upsertEvent(this.eventForm)
        this.toggleSnackbar('Success', `The event has been ${this.eventForm.id ? 'updated' : 'created'} successfully!`)
      } catch (error) {
        this.toggleSnackbar('Error', 'Something went wrong, please try later!', 'red accent-2')
      } finally {
        this.eventFormLoading = false
        this.eventDialog = false
      }
    },
    async bulkSubmitEvents (events) {
      try {
        await this.bulkAddEvents(events)
        this.toggleSnackbar('Success', 'The events has been created successfully!')
      } catch (error) {
        this.toggleSnackbar('Error', 'Something went wrong, please try later!', 'red accent-2')
      }
    },
    async deleteEvent () {
      try {
        await this.deleteEvent(this.eventForm.id)
        this.toggleSnackbar('Success', 'The event has been deleted successfully!')
      } catch (error) {
        this.toggleSnackbar('Error', 'Something went wrong, please try later!', 'red accent-2')
      } finally {
        this.eventDialog = false
      }
    },
    async submitShift () {
      this.shiftFormLoading = true

      if (!this.shiftForm.user_id) {
        this.shiftForm.user_id = this.user.id
      }

      try {
        await this.upsertShift(this.shiftForm)
        this.toggleSnackbar('Success', `The shift has been ${this.shiftForm.id ? 'updated' : 'created'} successfully!`)
      } catch (error) {
        this.toggleSnackbar('Error', 'Something went wrong, please try later!', 'red accent-2')
      } finally {
        this.shiftFormLoading = false
        this.shiftDialog = false
      }
    },
    async removeEvent () {
      try {
        await this.deleteEvent(this.eventForm.id)
        this.toggleSnackbar('Success', 'The event has been deleted successfully!')
      } catch (error) {
        this.toggleSnackbar('Error', 'Something went wrong, please try later!', 'red accent-2')
      } finally {
        this.eventDialog = false
      }
    },
    async removeShift () {
      try {
        await this.deleteShift(this.shiftForm.id)
        this.toggleSnackbar('Success', 'The shift has been deleted successfully!')
      } catch (error) {
        this.toggleSnackbar('Error', 'Something went wrong, please try later!', 'red accent-2')
      } finally {
        this.shiftDialog = false
      }
    },
    generateEvents (shift) {
      const events = []

      const start = this.$moment()
      const end = start.clone().add('weeks', 1).add('days', 1)
      const daysDiff = end.diff(start, 'days')
      const shiftDays = shift.days.split('').map(d => Number(d))

      for (let index = 0; index < daysDiff; index++) {
        const day = !index ? start : start.clone().add('days', index)
        const dayIndex = start.isoWeekday()

        if (shiftDays.includes(dayIndex - 1)) {
          events.push({
            name: shift.name,
            description: shift.description,
            start: new Date(`${day.format('YYYY-MM-DD')} ${shift.start}`).toISOString(),
            end: new Date(`${day.format('YYYY-MM-DD')} ${shift.end}`).toISOString(),
            user_id: this.user.id
          })
        }
      }

      this.bulkSubmitEvents(events)
    },
    openEventEditModal (event) {
      this.eventForm = cloneDeep(event.eventParsed.input)
      this.eventDialog = true
    },
    openShiftEditModal (shift) {
      this.shiftForm = cloneDeep(shift)
      this.shiftForm.days = this.shiftForm.days.split('').map(d => Number(d))
      this.shiftDialog = true
    }
  }
}
</script>
