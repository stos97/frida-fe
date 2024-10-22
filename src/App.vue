<template>
  <ion-app>
    <ion-router-outlet/>
  </ion-app>
</template>

<script>
import {IonApp, IonRouterOutlet} from '@ionic/vue';

export default {
  components: {
    IonApp,
    IonRouterOutlet
  },
  async mounted() {
    await this.$store.dispatch('tryLogin')
    if (this.$store.getters.isAuthenticated) {
      this.$router.replace(this.$store.getters.user.role)
    }

  }
}
</script>
