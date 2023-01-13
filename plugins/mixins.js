import Vue from 'vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
Vue.use(VueToast);
const mixin = {
  transp () {
    return Vue.$toast.open({
      message: 'Something went wrong!',
      type: 'error',
      // all of other options may go here
    })
  }
}
Vue.mixin(mixin)




