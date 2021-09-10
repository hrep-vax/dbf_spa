<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="landing bg-white overflow-hidden">
  
        <header class="text-gray-600 body-font">
            <div class="container mx-auto flex justify-between p-5 flex-col md:flex-row items-center max-w-7xl">
                <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    
                </a>
                
                <div name="buttons">
                    <button type="button" v-on:click="gotoLogin" class="mr-3 inline-flex items-center border-0 py-3 px-7 focus:outline-none hover:text-gray-900 rounded text-md mt-4 md:mt-0 font-medium">
                        <p>Sign In</p>
                    </button>
                    <button type="button" v-on:click="gotoRegister" class="inline-flex items-center bg-gray-900 text-white border-0 py-3 px-4 focus:outline-none hover:bg-gray-800 rounded text-md mt-4 md:mt-0 font-medium">
                        <p class="mr-2">Sign Up</p>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </header>



        <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div class="text-center">
            <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span class="block xl:inline">Data to enrich your</span>
              {{ ' ' }}
              <span class="block text-indigo-600 xl:inline">online business</span>
            </h1>
            <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
            </p>
            <div class="mt-5 sm:mt-8 flex justify-center">
              <div class="rounded-md shadow">
                <a href="#" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                  Get started
                </a>
              </div>
              <div class="mt-3 sm:mt-0 sm:ml-3">
                <a href="#" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                  Live demo
                </a>
              </div>
            </div>
          </div>
        </main>

  </div>
</template>

<script>

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default {
  components: {
  },
  setup() {
    return {
      navigation,
    }
  },
  methods: {
      gotoRegister() {
          this.$router.push({path: "/register"})
      },
      gotoLogin() {
          this.$router.push({path: "/login"})
      }
  },
}
</script>