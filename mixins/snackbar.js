export default {
  data () {
    return {
      snackbar: {
        color: 'primary',
        title: '',
        text: ''
      },
      snackBarState: false
    }
  },
  methods: {
    toggleSnackbar (title = '', text = '', color = 'primary') {
      this.snackBarState = true
      this.snackbar.title = title
      this.snackbar.text = text
      this.snackbar.color = color
    }
  },
  watch: {
    snackBarState (newValue) {
      if (!newValue) {
        this.snackbar.title = ''
        this.snackbar.text = ''
        this.snackbar.color = 'primary'
      }
    }
  }
}
