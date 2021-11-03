<template>
  <div class="profile mt-4 sm:mt-14 mb-8 mx-auto border max-w-4xl rounded-xl shadow-lg overflow-hidden p-8">
    <div class="md:col-span-1">
      <div class="mb-5 sm:mb-0">
        <h3 class="text-xl font-semibold leading-6 text-message font">Add DBF Record</h3>
      </div>
    </div>
  
    <div class="hidden sm:block" aria-hidden="true">
      <div class="py-5">
        <div class="border-t border-gray-200"/>
      </div>
    </div>

    <ValidationObserver ref="profileForm">
      <div>
        <div class="grid grid-cols-3 gap-6 mb-4 sm:mb-0">
          <label for="profile-first-name" class="text-sm font-medium text-message my-auto"> Code* </label>
          <div class="col-span-2">
            <app-text-input v-model="code" name="code" rules="required|max:255" id="code"/>
          </div>
        </div>
        <div class="hidden sm:block" aria-hidden="true">
          <div class="py-5">
            <div class="border-t border-gray-200"/>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-6 mb-4 sm:mb-0">
          <label for="profile-last-name" class="text-sm font-medium text-message my-auto"> Amount* </label>

          <div class="col-span-2">
            <app-text-input v-model="amount" name="amount" rules="max:255" id="amount"/>
          </div>
        </div>
        <div class="hidden sm:block" aria-hidden="true">
          <div class="py-5">
            <div class="border-t border-gray-200"/>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-6 mb-4 sm:mb-0">
          <label for="profile-middle-name" class="text-sm font-medium text-message my-auto"> Orno* </label>

          <div class="col-span-2">
            <app-text-input v-model="orno" name="orno" rules="max:255" id="orno"/>
          </div>
        </div>
       
     
        <div class="hidden sm:block" aria-hidden="true">
          <div class="py-5">
            <div class="border-t border-gray-200"/>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-6 mb-4 sm:mb-0">
          <label for="profile-home-address" class="text-sm font-medium text-message my-auto"> Due Date*</label>

          <div class="col-span-2">
            <app-text-input v-model="duedate" name="duedate" rules="max:255" id="duedate"/>
          </div>
        </div>
        

          
          <div class="grid justify-items-end">
            <button
                id="profile-submit-btn"
                type="button"
                :disabled="isLoading"
                @click="submitForm"
                class="
                disabled:opacity-50 disabled:cursor-not-allowed
                group
                relative
                flex
                py-2
                px-5
                border border-transparent
                text-sm
                font-medium
                rounded-md
                text-white
                bg-success-darker
                hover:bg-success
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-success-darker
              "
            >
              <svg
                  v-if="isLoading"
                  class="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p v-else>Save</p>
            </button>
          </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import TextInput from '../components/TextInput.vue'
import Vue from 'vue'
import {mapActions} from 'vuex'
import {handleVuexApiCall} from '../util/helper'
export default {
  components: {
     appTextInput: TextInput
   
  },
  data() {
    return{
       
       code:'',
       amount:'',
       orno:'',
       duedate:'',
       isLoading: false
    }
    
  },
  methods: {
     ...mapActions([
      'handleDbfAdd',
    
    ]),
     async submitForm() {
      const payload = {
        code: this.code,
        amount: this.amount,
        orno: this.orno,
        duedate: this.duedate
        
      }
        const result = await handleVuexApiCall(this.handleDbfAdd, payload)

     if (result.success) Vue.$toast.open({ message: 'Record Added Successfully!',type: 'success' })
      else Vue.$toast.open({ message: result.error.message, type: result.error.type })  
    
    }
  }
}
</script>

