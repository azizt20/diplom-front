<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
           alt="Workflow"/>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Зарегестрироваться</h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form @submit="submitCat" class="space-y-6">
          <div>
            <label for="lastname" class="block text-sm font-medium text-gray-700"> Фамилия </label>
            <div class="mt-1">
              <input v-model="lastname" id="lastname" name="lastname" type="text"
                     required=""
                     class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>
          </div>

          <div>
            <label for="name" class="block text-sm font-medium text-gray-700"> Имя </label>
            <div class="mt-1">
              <input v-model="name" id="name" name="name" type="text"
                     required=""
                     class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>
          </div>

          <div>
            <label for="photo" class="block text-sm font-medium text-gray-700"> Фотография </label>
            <div class="mt-1">
              <input id="photo" name="photo" @change="uploadFile" type="file" ref="file"
                     required=""
                     class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>
          </div>

          <div>
            <label for="phone-number" class="block text-sm font-medium text-gray-700"> Ноомер телефона </label>
            <div class="mt-1">
              <input v-model="username" id="phone-number" name="phone-number" type="number" autocomplete="email"
                     required=""
                     class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700"> Пароль </label>
            <div class="mt-1">
              <input v-model="password" id="password" name="password" type="password" autocomplete="current-password"
                     required=""
                     class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>
          </div>

          <div>
            <label for="password2" class="block text-sm font-medium text-gray-700"> Пароль </label>
            <div class="mt-1">
              <input v-model="password2" id="password2" name="password2" type="password" autocomplete="current-password"
                     required=""
                     :class="[password2 == password ? 'focus:border-electric-green': 'focus:border-[#FF0000]'] "
                     class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500  sm:text-sm"/>
            </div>
          </div>

          <div class="flex items-center justify-end">


            <div class="text-md">
              <div @click="sendSms" class="font-medium text-indigo-600 hover:text-indigo-500 hover:cursor-pointer">
                Отправить смс для подтверждения
              </div>
            </div>
          </div>

          <div>
            <button type="submit"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              ВОЙТИ
            </button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>


<script>
import {createNamespacedHelpers} from "vuex";

const {
  mapActions: mapAuthActions,
} = createNamespacedHelpers('auth')

export default {
  name: "LoginView",
  data() {
    return {
      lastname: '',
      name: '',
      image: '',
      username: '',
      password: '',
      password2: '',
    }
  },
  watch: {
    phoneNumber: function () {
      if (!this.phoneNumber.startsWith('+')) {
        this.phoneNumber = '+' + this.phoneNumber
      }
    }
  },
  mounted() {

  },
  methods: {
    ...mapAuthActions({
      registration: "registration",
      sendSms: "sendSms"
    }),

    submitCat(e) {
      e.preventDefault();
      this.registration({
        username: this.username,
        first_name: this.name,
        last_name: this.lastname,
        password: this.password,
        avatar: this.image,
      })
    },
    uploadFile(){
      this.image = this.$refs.file.files[0];
    }
  }

}

</script>


<style scoped lang="scss">
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
</style>
