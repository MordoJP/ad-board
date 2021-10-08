<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">My ads</h1>
        <v-card
          class="elevation-6 mb-3"
          v-for="(ad, i) in ads"
          :key="i"
        >
          <v-layout justify-center>
            <v-flex xs4>
              <v-img
                :src="ad.imageSrc"
                height="150px"
              ></v-img>
            </v-flex>
            <v-flex xs8>
              <v-card-text>
                <h2 class="text--primary">{{ ad.title }}</h2>
                <p>{{ ad.description }}</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  class="info"
                  :to="'/ad/' + ad.id"
                >Open</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      ads: [
        {
          title: 'First ad',
          description: 'Hello i am description',
          promo: false,
          showInfo: false,
          imageSrc: 'https://images.unsplash.com/photo-1619006179863-f65e2b0c8fba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80',
          id: '123'
        },
        {
          title: 'Second ad',
          description: 'Hello i am description',
          promo: true,
          showInfo: false,
          imageSrc: 'https://images.unsplash.com/photo-1618489517037-66555962ff37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
          id: '1234'
        },
        {
          title: 'Third ad',
          description: 'Hello i am description',
          promo: true,
          showInfo: false,
          imageSrc: 'https://images.unsplash.com/photo-1511878587934-516d7ca5465b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1830&q=80',
          id: '12345'
        },
        {
          title: 'Fourth ad',
          description: 'Hello i am description',
          promo: true,
          showInfo: false,
          imageSrc: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1706&q=80',
          id: '123456'
        },
        {
          title: 'Fifth ad',
          description: 'Hello i am description',
          promo: true,
          showInfo: false,
          imageSrc: 'https://images.unsplash.com/photo-1502920970741-47c1bafc8d49?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80',
          id: '1234567'
        }
      ]
    }
  }
}
</script>
