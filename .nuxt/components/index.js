export { default as NavDashboardAside } from '../../components/navigation/DashboardAside.vue'
export { default as NavDashboardHeader } from '../../components/navigation/DashboardHeader.vue'
export { default as NavDashboardSubHeader } from '../../components/navigation/DashboardSubHeader.vue'
export { default as GeneralSnackBar } from '../../components/general/SnackBar.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
