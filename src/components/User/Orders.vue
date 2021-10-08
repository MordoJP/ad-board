<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
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
                @click="test"
                color="indigo darken-3"
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
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      orders: [
        {
          id: 'asd',
          name: 'Nikitka',
          phone: '+7-495-565-40-57',
          adId: '123',
          done: false
        }
      ]
    }
  },
  methods: {
    markDone (order) {
      order.done = true
    },
    test (event) {
      console.log(event.target.status)
    }
  }
}
</script>
