export default {
  data () {
    return {
      snackbar: {
        state: false,
        color: 'primary',
        title: '',
        text: ''
      }
    }
  },
  methods: {
    toggleSnackbar (title = '', text = '', color = 'primary') {
      this.snackbar.state = true
      this.snackbar.title = title
      this.snackbar.text = text
      this.snackbar.color = color
    }
  }
}
