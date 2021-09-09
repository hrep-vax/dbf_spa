<template>
    <header class="text-gray-600 body-font">
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            <span class="ml-3 text-xl">Web App Kit</span>
            </a>
            <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
                <router-link class="mr-5 hover:text-gray-900 hover:underline" to="/dashboard/home">Home</router-link>
                <router-link class="mr-5 hover:text-gray-900 hover:underline" to="/dashboard/profile">Profile</router-link>
            </nav>
            <button type="button" v-on:click="logout" class="inline-flex items-center bg-gray-100 border-0 py-2 px-4 focus:outline-none hover:bg-gray-200 rounded text-sm mt-4 md:mt-0 font-medium">Logout</button>
        </div>
    </header>
</template>

<script>
    import Vue from "vue";
    import { mapActions } from 'vuex'

    export default {
        name: "NavBar",
        data: () => ({
            isLoading: false
        }),
        methods: {
            ...mapActions(['handleLogout']),
            async logout() {
                try {
                    this.isLoading = true
                    await this.handleLogout()
                    this.$router.push({path: "/login"});
                } 
                catch (error) {
                    console.log(error)
                    Vue.$toast.open({
                        message: 'Oops... Something went wrong on our end. Please contact your server administrator.',
                        type: "error"
                    });
                }
                
                this.isLoading = false
            }
        }
    }
</script>