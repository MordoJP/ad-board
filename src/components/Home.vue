<template>
  <div>
    <v-container fluid>
      <v-layout row>
        <v-flex xs12>
          <v-carousel
            cycle
            height="400"
            hide-delimiter-background
            show-arrows-on-hover
          >
            <v-carousel-item
              v-for="ad in ads"
              :key="ad.id"
              :src="ad.imageSrc"
            >
              <div class="card-link">
                <v-btn text dark :to="'/ad/' + ad.id">
                  <v-row
                    class="fill-height"
                    align="center"
                    justify="center"
                  >
                    <div class="text-h4">
                      {{ ad.title }}
                    </div>
                  </v-row>
                </v-btn>
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex
          xs12
          sm6
          md4
          v-for="ad of ads"
          :key="ad.id"
          class=""
        >
          <v-card
            class="mx-auto"
            max-width="350"
          >
            <v-img
              :src="ad.imageSrc"
              height="200px"
            ></v-img>

            <v-card-title>
              {{ ad.title }}
            </v-card-title>

            <v-card-subtitle>
              {{ ad.description }}
            </v-card-subtitle>

            <v-card-actions>
              <v-btn
                icon
                @click="ad.showInfo = !ad.showInfo"
              >
                <v-icon>{{ ad.showInfo ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn text :to="'/ad/' + ad.id"> Open </v-btn>
              <v-btn text class="indigo darken-3 white--text"> Buy </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="ad.showInfo">
                <v-divider></v-divider>

                <v-card-text>
                  I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
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

<style scoped>
.card-link {
  position: absolute;
  top: 50%;
  left: 50%;
  background: rgba(0, 0, 0, .3);
  transform: translate(-50%, -50%);
  padding: 10px 10px;
  border-radius: 5px;
}
</style>
