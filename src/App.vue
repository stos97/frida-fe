<template>
  <ion-app>
    <TheMenu v-if="isAuthenticated"/>
    <ion-router-outlet id="main-content"/>
  </ion-app>
</template>

<script>
import {IonApp, IonRouterOutlet} from '@ionic/vue';

export default {
  components: {
    IonApp,
    IonRouterOutlet
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  async mounted() {
    await this.$store.dispatch('tryLogin')
    if (this.isAuthenticated) {
      this.$router.replace('/' + this.$store.getters.user.role)
    }
  }
}
</script>
