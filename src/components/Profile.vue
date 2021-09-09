<template>
    <div class="profile mt-14 mb-8 mx-auto border max-w-4xl rounded-xl shadow-lg overflow-hidden p-8 ">
        <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
                <h3 class="text-xl font-semibold leading-6 text-gray-900 font">Profile</h3>
                <p class="mt-1 text-md text-gray-600">
                    This information is your profile information.
                </p>
            </div>
        </div>
        <div class="hidden sm:block" aria-hidden="true">
            <div class="py-5">
                <div class="border-t border-gray-200" />
            </div>
        </div>
        <div class="grid grid-cols-3 gap-6">
            
            <label class="text-sm font-medium text-gray-700 my-auto">
                Profile Picture
            </label>
            
            <div class="col-span-2 ">
                <div class="flex items-center">
                    <span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <svg v-if="!profilePictureSrc" class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg> 
                        <img v-else :src="profilePictureSrc" class="w-full h-full object-cover">
                    </span>
                    <input type="file" id="upload_file" name="upload_file" ref="file" v-on:change="changeProfilePic()" hidden>
                    <label for="upload_file" refs="upload_file" class="flex justify-center ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <svg v-if="isProfilePictureLoading" class="animate-spin h-5 w-5 mx-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p v-else>Change</p>
                    </label>
                </div>
            </div>
        </div>
        <div class="hidden sm:block" aria-hidden="true">
            <div class="py-5">
                <div class="border-t border-gray-200" />
            </div>
        </div>

        <ValidationObserver v-slot="{ invalid }">
            <form @submit.prevent="onSubmit">
                <div class="grid grid-cols-3 gap-6">
                    <label for="first_name" class="text-sm font-medium text-gray-700 my-auto">
                        First Name*
                    </label>
                    <div class="col-span-2">
                        <TextInput v-model="first_name" name="First Name" rules="required|max:255|alpha_spaces" id="first_name" />
                    </div>
                </div>
                <div class="hidden sm:block" aria-hidden="true">
                    <div class="py-5">
                        <div class="border-t border-gray-200" />
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-6">
                    
                    <label for="last_name" class="text-sm font-medium text-gray-700 my-auto">
                        Last Name*
                    </label>
                    
                    <div class="col-span-2 ">
                         <TextInput v-model="last_name" name="Last Name" rules="required|max:255|alpha_spaces" id="last_name"/>
                    </div>
                </div>
                <div class="hidden sm:block" aria-hidden="true">
                    <div class="py-5">
                        <div class="border-t border-gray-200" />
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-6">
                    
                    <label for="middle_name" class="text-sm font-medium text-gray-700 my-auto">
                        Middle Name
                    </label>
                    
                    <div class="col-span-2 ">
                         <TextInput v-model="middle_name" name="Middle Name" rules="max:255|alpha_spaces" id="middle_name" />
                    </div>
                </div>
                <div class="hidden sm:block" aria-hidden="true">
                    <div class="py-5">
                        <div class="border-t border-gray-200" />
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-6">
                    
                    <label for="email" class="text-sm font-medium text-gray-700 my-auto">
                        Email Address*
                    </label>
                    
                    <div class="col-span-2 ">
                        <TextInput v-model="email" name="Email" rules="required|max:255|email" id="email" type="email" />
                    </div>
                </div>
                <div class="hidden sm:block" aria-hidden="true">
                    <div class="py-5">
                        <div class="border-t border-gray-200" />
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-6">
                    
                    <label for="birthday" class="text-sm font-medium text-gray-700 my-auto">
                        Birthdate
                    </label>
                    
                    <div class="col-span-2 ">
                        <TextInput v-model="birthday" name="Birthday" rules="valid_date" id="birthdate" placeholder="YYYY-MM-DD"/>
                    </div>
                </div>
                <div class="hidden sm:block" aria-hidden="true">
                    <div class="py-5">
                        <div class="border-t border-gray-200" />
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-6">
                    
                    <label for="mobile_number" class="text-sm font-medium text-gray-700 my-auto">
                        Mobile Number
                    </label>
                    
                    <div class="col-span-2 ">
                        <TextInput v-model="mobile_number" name="Mobile Number" rules="valid_mobile_number" id="mobile_number" placeholder="+639123456789"/>
                    </div>
                </div>
                <div class="hidden sm:block" aria-hidden="true">
                    <div class="py-5">
                        <div class="border-t border-gray-200" />
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-6">
                    
                    <label for="sex" class="text-sm font-medium text-gray-700 my-auto">
                        Sex
                    </label>
                    
                    <div class="col-span-2 ">
                        <select v-model="sex" name="sex" id="sex">
                            <option value=""></option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                </div>
                <div class="hidden sm:block" aria-hidden="true">
                    <div class="py-5">
                        <div class="border-t border-gray-200" />
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-6">
                    
                    <label for="home_address" class="text-sm font-medium text-gray-700 my-auto">
                        Home Address
                    </label>
                    
                    <div class="col-span-2 ">
                        <TextInput v-model="home_address" name="Home Address" rules="max:255" id="home_address" />
                    </div>
                </div>
                <div class="hidden sm:block" aria-hidden="true">
                    <div class="py-5">
                        <div class="border-t border-gray-200" />
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-6">
                    
                    <label for="barangay" class="text-sm font-medium text-gray-700 my-auto">
                        Barangay
                    </label>
                    
                    <div class="col-span-2 ">
                        <TextInput v-model="barangay" name="Barangay" rules="max:255" id="barangay" />
                    </div>
                </div>
                <div class="hidden sm:block" aria-hidden="true">
                    <div class="py-5">
                        <div class="border-t border-gray-200" />
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-6">
                    
                    <label for="city" class="text-sm font-medium text-gray-700 my-auto">
                        City
                    </label>
                    
                    <div class="col-span-2 ">
                        <TextInput v-model="city" name="City" rules="max:255" id="city" />
                    </div>
                </div>
                <div class="hidden sm:block" aria-hidden="true">
                    <div class="py-5">
                        <div class="border-t border-gray-200" />
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-6">
                    
                    <label for="region" class="text-sm font-medium text-gray-700 my-auto">
                        Region
                    </label>
                    
                    <div class="col-span-2 ">
                        <TextInput v-model="region" name="Region" rules="max:255" id="region" />    
                    </div>
                </div>
                <div class="hidden sm:block" aria-hidden="true">
                    <div class="py-5">
                        <div class="border-t border-gray-200" />
                    </div>
                </div>
                

                <div class="flex items-center justify-between">
                    <div class="text-sm">
                    <a href="/dashboard/change-password" class="font-medium underline text-blue-600 hover:text-blue-500">
                        Click here to change your password
                    </a>
                    </div>
                    <div class="grid justify-items-end">
                        <button type="submit" :disabled="invalid" class="disabled:opacity-50 disabled:cursor-not-allowed group relative flex py-2 px-5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p v-else>Save</p>
                        </button>
                    </div>
                </div>
            </form>
        </ValidationObserver>
    </div>
</template>

<script>
    import { ValidationObserver } from 'vee-validate';
    import Vue from 'vue'
    import TextInput from '../components/TextInput.vue'
    import { mapActions } from 'vuex' 


    export default {
        name: "Profile",
        components: {
            ValidationObserver,
            TextInput
        },
        data () { /* Data for the textboxes */
            return {
                id: "",
                email: "",
                first_name: "",
                last_name: "",
                middle_name: "",
                mobile_number: "",
                sex: "",
                birthday: "",
                home_address: "",
                barangay : "",
                city: "",
                region : "",
                roles: [],
                isLoading: false,
                isProfilePictureLoading: false,
                profilePictureSrc: "",
                profilePictureToUpload: "",
            }
        },
        async created() {
            await this.getUserProfile()
            await this.getUserProfilePicture();
        },
        methods: {
            ...mapActions(['handleShowUserProfile', 'handleUpdateUserProfile', 'handleGetUserProfilePic', 'handleUploadUserProfilePic']),
            async getUserProfile() {  
                try {
                    this.isLoading = true
                    const userProfile = await this.handleShowUserProfile()
                    
                    this.id = userProfile.user.id
                    this.email = userProfile.user.email
                    this.first_name = userProfile.user.first_name
                    this.last_name = userProfile.user.last_name
                    this.middle_name = userProfile.user.middle_name
                    this.mobile_number = userProfile.user.mobile_number
                    this.sex = userProfile.user.sex
                    this.birthday = userProfile.user.birthday
                    this.home_address = userProfile.user.home_address
                    this.barangay = userProfile.user.barangay
                    this.city = userProfile.user.city
                    this.region = userProfile.user.region

                }
                catch (error) {
                    console.log("error", error.response.data)
                    let errorMessage = ''
                    const errorCode = error.response.data.errorCode

                    switch (errorCode) {
                        case 'UNAUTHENTICATED_ERROR': {
                            errorMessage = 'Session is expired'
                            break
                        }
                        default:
                            errorMessage = 'Oops... Something went wrong on our end. Please contact your server administrator.'
                    }

                    Vue.$toast.open({
                        message: errorMessage,
                        type: "error"
                    });
                }

                this.isLoading = false;
            },
            async onSubmit() {
                try {
                    this.isLoading = true

                    const payload = {
                        "id": this.id,
                        "email": this.email,
                        "first_name": this.first_name,
                        "last_name": this.last_name,
                        "middle_name": this.middle_name,
                        "mobile_number": this.mobile_number,
                        "sex": this.sex,
                        "birthday": this.birthday,
                        "home_address": this.home_address,
                        "barangay": this.barangay,
                        "city": this.city,
                        "region": this.region
                    }

                    console.log("payload", payload);
                    
                    await this.handleUpdateUserProfile(payload)

                    Vue.$toast.open({
                        message: "Updated profile saved!",
                        type: "success"
                    });
                }
                catch (error) {
                    console.log("error", error.response.data)
                    let errorMessage = ''
                    const errorCode = error.response.data.errorCode

                    switch (errorCode) {
                        case 'VALIDATION_ERROR': {
                            errorMessage = 'Profile field/s format invalid'
                            break
                        }
                        case 'UNAUTHENTICATED_ERROR': {
                            errorMessage = 'Session is expired'
                            break
                        }
                        default:
                            errorMessage = 'Oops... Something went wrong on our end. Please contact your server administrator.'
                    }

                    Vue.$toast.open({
                        message: errorMessage,
                        type: "error"
                    });
                }

                this.isLoading = false;
            },
            async getUserProfilePicture() {
                
                try {
                    this.isProfilePictureLoading = true
                    let imgURL = await this.handleGetUserProfilePic()
                    this.profilePictureSrc = imgURL;
                }
                catch (error) {
                    //console.log("[File] Profile Picture Error", error)
                    
                    if(  error.response.data ) {
                        let errorMessage = ''
                        const errorCode = error.response.data.errorCode

                        switch (errorCode) {
                            case 'RESOURCE_NOT_FOUND_ERROR': {
                                errorMessage = 'Profile Picture not found.'
                                break
                            }
                            default:
                                errorMessage = 'Oops... Something went wrong on our end. Please contact your server administrator.'
                        }

                        console.log("[Server] Profile Picture Error", errorMessage)
                    }
                    
                }

                this.isProfilePictureLoading = false;
            },
            async changeProfilePic() {

                try {
                    this.profilePictureToUpload = this.$refs.file.files[0];
                    this.isProfilePictureLoading = true;

                    let formData = new FormData();
                    formData.append('image', this.profilePictureToUpload);

                    let user = await this.handleUploadUserProfilePic(formData);
                    console.log(user)

                    this.profilePictureSrc = window.URL.createObjectURL(this.profilePictureToUpload)
                    
                    Vue.$toast.open({
                        message: "Profile picture updated successfully!",
                        type: "success"
                    });
                }
                catch (error) {
                    console.log(error.response)
                    if(  error.response.data ) {
                        let errorMessage = ''
                        const errorCode = error.response.data.errorCode

                        switch (errorCode) {
                            case 'UNAUTHENTICATED_ERROR': {
                                errorMessage = 'Session is expired'
                                break
                            }
                            default:
                                errorMessage = 'Oops... Something went wrong on our end. Please contact your server administrator.'
                        }
                        console.log("[Server] ", errorMessage)
                    }
                }
                this.isProfilePictureLoading = false;
            }
        }
    };
</script>
