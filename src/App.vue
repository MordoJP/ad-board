<template>
  <v-app>
    <v-navigation-drawer app
      v-model="drawer">
      <v-list>
        <v-list-item
          v-for="(link, i) of links"
          :key="i"
          :to="link.url">
          <v-list-item-icon>
            <v-icon>
              {{ link.icon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="link.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark color="indigo darken-1">
      <v-app-bar-nav-icon
      @click="drawer = !drawer"
      class="hidden-md-and-up"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" custom v-slot="{ navigate }" class="pointer">
          <span @click="navigate" role="link">Ad application</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          v-for="link in links"
          :key="link.title"
          :to="link.url"
          text>
          <v-icon left>{{ link.icon }}</v-icon>
          {{ link.title }}</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>

    <template v-if="error">
      <v-snackbar
        :multi-line="true"
        :timeout="5000"
        color="error"
        @input="closeError"
        value="true"
      >
        {{ error }}

        <template v-slot:action="{ attrs }">
          <v-btn
            dark
            text
            v-bind="attrs"
            @click.native="closeError"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
    links () {
      if (this.isUserLoggedIn) {
        return [
          { title: 'Orders', icon: 'mdi-cards-diamond', url: '/orders' },
          { title: 'New ad', icon: 'mdi-note-plus', url: '/new' },
          { title: 'My ads', icon: 'mdi-format-list-bulleted-square', url: '/list' }
        ]
      }
      return [
        { title: 'Login', icon: 'mdi-account-tie', url: '/login' },
        { title: 'Registration', icon: 'mdi-human-handsup', url: '/registration' }
      ]
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
