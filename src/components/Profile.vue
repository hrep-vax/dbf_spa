<template>
  <div class="profile mt-4 sm:mt-14 mb-8 mx-auto border max-w-4xl rounded-xl shadow-lg overflow-hidden p-8">
    <div class="md:col-span-1">
      <div class="mb-5 sm:mb-0">
        <h3 class="text-xl font-semibold leading-6 text-message font">Profile</h3>
        <p class="mt-1 text-md text-message-lighter">This information is your profile information.</p>
      </div>
    </div>
    <div class="hidden sm:block" aria-hidden="true">
      <div class="py-5">
        <div class="border-t border-gray-200"/>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-6 mb-4 sm:mb-0">
      <label class="text-sm font-medium text-message my-auto"> Profile Picture </label>
      <div class="col-span-2">
        <div class="flex items-center">
          <span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
            <svg v-if="!profilePictureSrc" class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path
                  d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <img v-else :src="profilePictureSrc" class="w-full h-full object-cover"/>
          </span>
          <label
              for="upload_file"
              refs="upload_file"
              class="
              flex
              justify-center
              ml-5
              bg-white
              py-2
              px-3
              border border-gray-300
              rounded-md
              shadow-sm
              text-sm
              leading-4
              font-medium
              text-message
              hover:bg-gray-50
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
            "
          >
            <svg
                v-if="isProfilePictureLoading"
                class="animate-spin h-5 w-5 mx-4 text-gray-400"
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
            <p v-else>Change</p>
          </label>
          <ValidationProvider name="Profile Picture" rules="image|size:5120" v-slot="{ errors }" ref="profilePicUpload">
            <input
                type="file"
                id="upload_file"
                name="upload_file"
                ref="file"
                v-on:change="changeProfilePic()"
                accept="image/jpeg,image/png"
                :disabled="isProfilePictureLoading"
                hidden
                class="disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <span class="text-xs text-danger ml-2">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
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
          <label for="profile-first-name" class="text-sm font-medium text-message my-auto"> First Name* </label>
          <div class="col-span-2">
            <app-text-input v-model="first_name" name="First Name" rules="required|max:255" id="profile-first-name"/>
          </div>
        </div>
        <div class="hidden sm:block" aria-hidden="true">
          <div class="py-5">
            <div class="border-t border-gray-200"/>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-6 mb-4 sm:mb-0">
          <label for="profile-last-name" class="text-sm font-medium text-message my-auto"> Last Name* </label>

          <div class="col-span-2">
            <app-text-input v-model="last_name" name="Last Name" rules="required|max:255" id="profile-last-name"/>
          </div>
        </div>
        <div class="hidden sm:block" aria-hidden="true">
          <div class="py-5">
            <div class="border-t border-gray-200"/>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-6 mb-4 sm:mb-0">
          <label for="profile-middle-name" class="text-sm font-medium text-message my-auto"> Middle Name </label>

          <div class="col-span-2">
            <app-text-input v-model="middle_name" name="Middle Name" rules="max:255" id="profile-middle-name"/>
          </div>
        </div>
        <div class="hidden sm:block" aria-hidden="true">
          <div class="py-5">
            <div class="border-t border-gray-200"/>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-6 mb-4 sm:mb-0">
          <label for="profile-email" class="text-sm font-medium text-message my-auto"> Email Address* </label>

          <div class="col-span-2">
            <app-text-input v-model="email" name="Email" rules="required|max:255|email" id="profile-email"
                            type="email"/>
          </div>
        </div>
        <div class="hidden sm:block" aria-hidden="true">
          <div class="py-5">
            <div class="border-t border-gray-200"/>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-6 mb-4 sm:mb-0">
          <label for="profile-birthday" class="text-sm font-medium text-message my-auto"> Birthdate </label>

          <div class="col-span-2">
            <app-text-input v-model="birthday" name="Birthday" rules="valid_date" id="profile-birthday"
                            placeholder="YYYY-MM-DD"/>
          </div>
        </div>
        <div class="hidden sm:block" aria-hidden="true">
          <div class="py-5">
            <div class="border-t border-gray-200"/>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-6 mb-4 sm:mb-0">
          <label for="profile-mobile-number" class="text-sm font-medium text-message my-auto"> Mobile Number </label>
          <div class="col-span-2">
            <app-text-input
                v-model="mobile_number"
                name="Mobile Number"
                rules="valid_mobile_number"
                id="profile-mobile-number"
                placeholder="+639123456789"
            />
          </div>
        </div>
        <div class="hidden sm:block" aria-hidden="true">
          <div class="py-5">
            <div class="border-t border-gray-200"/>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-6 mb-4 sm:mb-0">
          <label for="profile-sex" class="text-sm font-medium text-message my-auto"> Sex </label>

          <div class="col-span-2">
            <select v-model="sex" name="sex" id="profile-sex">
              <option value=""></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div class="hidden sm:block" aria-hidden="true">
          <div class="py-5">
            <div class="border-t border-gray-200"/>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-6 mb-4 sm:mb-0">
          <label for="profile-home-address" class="text-sm font-medium text-message my-auto"> Home Address </label>

          <div class="col-span-2">
            <app-text-input v-model="home_address" name="Home Address" rules="max:255" id="profile-home-address"/>
          </div>
        </div>
        <div class="hidden sm:block" aria-hidden="true">
          <div class="py-5">
            <div class="border-t border-gray-200"/>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-6 mb-4 sm:mb-0">
          <label for="profile-barangay" class="text-sm font-medium text-message my-auto"> Barangay </label>

          <div class="col-span-2">
            <app-text-input v-model="barangay" name="Barangay" rules="max:255" id="profile-barangay"/>
          </div>
        </div>
        <div class="hidden sm:block" aria-hidden="true">
          <div class="py-5">
            <div class="border-t border-gray-200"/>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-6 mb-4 sm:mb-0">
          <label for="profile-city" class="text-sm font-medium text-message my-auto"> City </label>

          <div class="col-span-2">
            <app-text-input v-model="city" name="City" rules="max:255" id="profile-city"/>
          </div>
        </div>
        <div class="hidden sm:block" aria-hidden="true">
          <div class="py-5">
            <div class="border-t border-gray-200"/>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-6 mb-4 sm:mb-0">
          <label for="profile-region" class="text-sm font-medium text-message my-auto"> Region </label>

          <div class="col-span-2">
            <app-text-input v-model="region" name="Region" rules="max:255" id="profile-region"/>
          </div>
        </div>
        <div class="hidden sm:block" aria-hidden="true">
          <div class="py-5">
            <div class="border-t border-gray-200"/>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="text-sm">
            <router-link :to="{name: 'change-password'}" class="font-medium underline text-primary hover:text-primary-darker">
              Click here to change your password
            </router-link>
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
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import {ValidationObserver} from 'vee-validate'
import Vue from 'vue'
import TextInput from '../components/TextInput.vue'
import {mapActions} from 'vuex'
import {createURLFromBlob} from '../util/helper'

export default {
  components: {
    ValidationObserver,
    appTextInput: TextInput,
  },
  data() {
    /* Data for the textboxes */
    return {
      id: '',
      email: '',
      first_name: '',
      last_name: '',
      middle_name: '',
      mobile_number: '',
      sex: '',
      birthday: '',
      home_address: '',
      barangay: '',
      city: '',
      region: '',
      roles: [],
      isLoading: false,
      isProfilePictureLoading: false,
      profilePictureSrc: '',
      profilePictureToUpload: ''
    }
  },
  async created() {
    await this.getUserProfile()
    await this.getUserProfilePicture()
  },
  methods: {
    ...mapActions([
      'handleShowUserProfile',
      'handleUpdateUserProfile',
      'handleGetUserProfilePic',
      'handleUploadUserProfilePic',
    ]),
    async getUserProfile() {
      try {
        this.isLoading = true;
        const userProfile = await this.handleShowUserProfile();

        this.id = userProfile.user.id;
        this.email = userProfile.user.email;
        this.first_name = userProfile.user.first_name;
        this.last_name = userProfile.user.last_name;
        this.middle_name = userProfile.user.middle_name;
        this.mobile_number = userProfile.user.mobile_number;
        this.sex = userProfile.user.sex;
        this.birthday = userProfile.user.birthday;
        this.home_address = userProfile.user.home_address;
        this.barangay = userProfile.user.barangay;
        this.city = userProfile.user.city;
        this.region = userProfile.user.region;
      } catch (error) {
        if (error.response.status === 429) {
          Vue.$toast.open({
            message: "We've recieved too many requests from you, please try again later.",
            type: 'error'
          })

          this.isLoading = false
          return
        }

      }

      this.isLoading = false
    },
    async submitForm() {
      const valid = await this.$refs.profileForm.validate()
      if (!valid) return

      try {
        this.isLoading = true

        const payload = {
          id: this.id,
          email: this.email,
          first_name: this.first_name,
          last_name: this.last_name,
          middle_name: this.middle_name,
          mobile_number: this.mobile_number,
          sex: this.sex,
          birthday: this.birthday,
          home_address: this.home_address,
          barangay: this.barangay,
          city: this.city,
          region: this.region
        }

        await this.handleUpdateUserProfile(payload)

        Vue.$toast.open({
          message: 'Updated profile saved!',
          type: 'success'
        })
      } catch (error) {
        if (error.response.status === 429) {
          Vue.$toast.open({
            message: "We've received too many requests from you, please try again later.",
            type: 'error',
          })

          this.isLoading = false
          return
        }

        if (error.response.data) {
          let errorMessage = ''
          const errorCode = error.response.data.errorCode

          switch (errorCode) {
            case 'VALIDATION_ERROR': {
              errorMessage = 'Profile field/s format invalid'
              break
            }
            default:
              errorMessage = 'Oops... Something went wrong on our end. '
          }

          if (errorCode !== 'UNAUTHENTICATED_ERROR') {
            Vue.$toast.open({
              message: errorMessage,
              type: 'error'
            })
          }
        }
      }

      this.isLoading = false
    },
    async getUserProfilePicture() {
      try {
        this.isProfilePictureLoading = true
        let imgURL = await this.handleGetUserProfilePic()
        this.profilePictureSrc = imgURL
      } catch (error) {
        if (error.response.status === 429) {
          Vue.$toast.open({
            message: "We've received too many requests from you, please try again later.",
            type: 'error'
          })

          this.isProfilePictureLoading = false
          return
        }
      }

      this.isProfilePictureLoading = false
    },
    async changeProfilePic() {
      try {
        const profilePicToUpload = this.$refs.file.files[0]

        /* Manual validation for the input file on click */
        const {valid} = await this.$refs.profilePicUpload.validate(profilePicToUpload)
        if (!valid) return

        this.profilePictureToUpload = profilePicToUpload
        this.isProfilePictureLoading = true

        let formData = new FormData()
        formData.append('image', this.profilePictureToUpload)

        await this.handleUploadUserProfilePic(formData)

        this.profilePictureSrc = createURLFromBlob(this.profilePictureToUpload)

        Vue.$toast.open({
          message: 'Profile picture updated successfully!',
          type: 'success'
        })
      } catch (error) {
        if (error.response.status === 429) {
          Vue.$toast.open({
            message: "We've recieved too many requests from you, please try again later.",
            type: 'error'
          })

          this.isProfilePictureLoading = false
          return
        }
      }
      this.isProfilePictureLoading = false
    }
  }
}
</script>
