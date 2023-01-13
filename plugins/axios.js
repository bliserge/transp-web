export default function ({ $axios, store, redirect }) {
  if (process.browser) {
    let token = localStorage.getItem('token')
    $axios.onRequest(config => {
      token = localStorage.getItem('token')
      $axios.setToken(token, 'Bearer')
    })
  } else {
    console.error("Not browser")
  }
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      // eslint-disable-next-line no-undef
      $nuxt.$cookies.removeAll()
      redirect('/login')
      return 0
    }
  })
}
