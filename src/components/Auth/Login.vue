<template>
  <v-container fluid class="mt-5">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="indigo accent-2">
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              validation
            >
              <v-text-field
                prepend-icon="mdi-card-account-mail"
                name="email"
                label="Email"
                type="email"
                v-model="email"
                :error-messages="emailErrors"
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-key"
                name="password"
                label="Password"
                :type="showPass ? 'text' : 'password'"
                v-model="password"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[passwordRules.required, passwordRules.min]"
                @click:append="showPass = !showPass"
                autocomplete="on"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="indigo darken-3 white--text"
              @click="onSubmit"
              :loading="loading"
              :disabled="!valid || loading"
            >Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email }
  },
  data () {
    return {
      email: '',
      password: '',
      valid: false,
      showPass: false,
      passwordRules: {
        required: value => !!value || 'Password is required',
        min: v => v.length >= 6 || 'Password must be equal or more than 6 characters'
      }
    }
  },
  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onSubmit () {
      if (this.valid) {
        const user = {
          email: this.email,
          password: this.password
        }

        this.$store.dispatch('loginUser', user)
          .then(() => {
            this.$router.push('/')
          })
          .catch(() => {})
      }
    }
  },
  created () {
    if (this.$route.query.loginError) {
      this.$store.dispatch('setError', 'no-access-right')
    }
  }
}
</script>
