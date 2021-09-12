<template>
  <ValidationProvider tag="div" :rules="rules" :name="name" :vid="vid" v-slot="{ errors }">
    <input :id="id" :type="type" v-model="currentValue" :placeholder="placeholder" autocomplete="on">
    <div class="flex justify-start ml-2">
        <span class="mt-1 text-xs text-danger">{{ errors[0] }}</span>
    </div>  
  </ValidationProvider>
</template>

<script>
  import { ValidationProvider } from 'vee-validate';

  export default {
    name: 'TextInput',
    components: {
      ValidationProvider
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      id: {
        type: String,
        default: ''
      },
      rules: {
        type: [String, Object],
        default: ''
      },
      name: {
        type: String,
        default: ''
      },
      vid: {
        type: String,
        default: undefined
      },
      type: {
        type: String,
        default: 'text'
      },
      placeholder: {
        type: String,
        default: ''
      }
    },
    data: () => ({
      currentValue: ''
    }),
    watch: {
      currentValue (val) {
        // allows us to use v-model on our input.
        this.$emit('input', val);
      },
      value(val) {
        if (val !== this.currentValue) {
          this.currentValue = val;
        }
      }
    },
    created() {
      if (this.value) {
        this.currentValue = this.value;
      }
    }
  };
</script>