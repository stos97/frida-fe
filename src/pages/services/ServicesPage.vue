<template>
  <base-layout>
    <template v-slot:fab-button>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button>
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </template>
    <base-spinner v-if="isLoading"></base-spinner>
    <p v-if="!!error">{{ error }}</p>
    <div v-else>
      <ion-title class="ion-padding ion-text-center">Usluge</ion-title>
      <services-list :services="services"></services-list>
    </div>
  </base-layout>
</template>
<script>
import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonTitle,
} from "@ionic/vue";
import {add} from 'ionicons/icons';
import ServicesList from "@/components/services/ServicesList.vue";

export default {
  components: {
    IonTitle,
    IonFab,
    IonFabButton,
    IonIcon,
    ServicesList,
  },
  data() {
    return {
      add,
      isLoading: false,
      error: null,
    }
  },
  computed: {
    services() {
      return this.$store.getters.transformedServices;
    }
  },
  methods: {
    async getAllServices() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('getAllServices')
        this.isLoading = false;
      } catch (err) {
        this.error = err.message || 'Fail to load services!';
      }
      this.isLoading = false;
    },
  },
  created() {
    this.getAllServices()
  },
  async beforeRouteEnter(_, __, next) {
    try {
      await this.getAllServices();
      next();
    } catch (err) {
      next();
    }
  }
}
</script>