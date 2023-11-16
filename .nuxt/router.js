import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1005d3a8 = () => interopDefault(import('../pages/calendar.vue' /* webpackChunkName: "pages/calendar" */))
const _a4bcbc80 = () => interopDefault(import('../pages/jobs.vue' /* webpackChunkName: "pages/jobs" */))
const _668f68af = () => interopDefault(import('../pages/profile.vue' /* webpackChunkName: "pages/profile" */))
const _4bbe828c = () => interopDefault(import('../pages/signin.vue' /* webpackChunkName: "pages/signin" */))
const _6054d902 = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _5583df24 = () => interopDefault(import('../pages/Schedules/shifts.vue' /* webpackChunkName: "pages/Schedules/shifts" */))
const _6047aed8 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/calendar",
    component: _1005d3a8,
    name: "calendar"
  }, {
    path: "/jobs",
    component: _a4bcbc80,
    name: "jobs"
  }, {
    path: "/profile",
    component: _668f68af,
    name: "profile"
  }, {
    path: "/signin",
    component: _4bbe828c,
    name: "signin"
  }, {
    path: "/signup",
    component: _6054d902,
    name: "signup"
  }, {
    path: "/Schedules/shifts",
    component: _5583df24,
    name: "Schedules-shifts"
  }, {
    path: "/",
    component: _6047aed8,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
