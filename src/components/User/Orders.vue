<template>
  <v-container class="mt-5">
    <v-layout>
      <v-flex xs12 class="text-center pt-5" v-if="loading">
        <v-progress-circular
          :size="120"
          :width="10"
          color="indigo lighten-2"
          indeterminate
        ></v-progress-circular>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 v-else-if="!loading && orders.length !== 0">
        <h1 class="text--secondary mb-3">Orders</h1>
        <v-list
          subheader
          two-line
          flat
        >
          <v-list-item
            multiple
            v-for="(order, i) in orders"
            :key="i"
          >
            <v-list-item-action>
              <v-checkbox
                :input-value="order.done"
                @change="markDone(order)"
                color="indigo accent-2"
              ></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ order.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ order.phone }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                :to="'/ad/' + order.adId"
                class="indigo darken-2"
                dark
              >Open</v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-flex>
      <v-flex xs12 class="text-center" v-else>
        <h1 class="text--secondary">You have no orders.</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    loading () {
      // достаем состояние нашего стора
      return this.$store.getters.loading
    },
    orders () {
      return this.$store.getters.orders
    }
  },
  methods: {
    markDone (order) {
      this.$store.dispatch('markOrderDone', order.id)
        .then(() => {
          order.done = true
        })
        .catch(() => {})
    }
  },
  created () {
    this.$store.dispatch('fetchOrders')
  }
}
</script>
