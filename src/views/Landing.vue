<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
    <div class="text-center">
      <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
        <span class="block xl:inline">Welcome to</span>
        {{ ' ' }}
        <span class="block text-blue-600 xl:inline">Scaffold.IO</span>
      </h1>
      <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
        The VueJS + Tailwind.CSS starter kit for SPA projects
      </p>
      <div class="mt-5 sm:mt-8 flex justify-center">
        <div class="mt-3 sm:mt-0 ml-3">
          <router-link
            :to="{name: 'login'}"
            id="landing-login-btn"
            class="
              w-full
              flex
              items-center
              justify-center
              px-8
              py-3
              border border-transparent
              text-base
              font-medium
              rounded-md
              text-white
              bg-blue-600
              hover:bg-blue-700
              md:py-4 md:text-lg md:px-10
            "
          >
            Sign In
          </router-link>
        </div>
        <div class="mt-3 sm:mt-0 ml-3">
          <router-link
            :to="{name: 'register'}"
            id="landing-register-btn"
            class="
              w-full
              flex
              items-center
              justify-center
              px-8
              py-3
              border border-transparent
              text-base
              font-medium
              rounded-md
              text-blue-600
              bg-blue-100
              hover:bg-blue-200
              md:py-4 md:text-lg md:px-10
            "
          >
            Sign Up
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>
