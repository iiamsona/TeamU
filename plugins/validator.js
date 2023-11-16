import * as rules from 'vee-validate/dist/rules.umd.js'
import { confirmed } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, localize } from 'vee-validate'
import en from 'vee-validate/dist/locale/en.json'
import Vue from 'vue'

localize({ en })

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})

extend('number', {
  message: 'The field should contain at least one numeric character',
  validate: (value) => {
    const parsedValue = String(value)
    return parsedValue.match(/[0-9]/g) !== null
  }
})

extend('lowercase', {
  message: 'The {_field_} must contain at least one lowercase letter.',
  validate: (value) => {
    return /[a-z]/.test(value)
  }
})

extend('year', {
  message: 'The field should contain valid year',
  validate: (value) => {
    const currentYear = new Date().getFullYear()

    if (value < currentYear) {
      return false
    }

    return true
  }
})

extend('confirmed', {
  ...confirmed,
  message: attribute => `The ${attribute} does not match.`
})

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
