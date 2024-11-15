<template>
  <base-layout>
    <template v-slot:fab-button>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="toggleModal">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </template>
    <base-spinner v-if="isLoading"></base-spinner>
    <p v-if="!!error">{{ error }}</p>
    <div v-else>
      <ion-title class="ion-padding ion-text-center">Usluge</ion-title>
      <base-card v-for="(listOfServices, categoryName) in services" :key="categoryName" :title="categoryName">
        <service-item
            :category-name="categoryName"
            :services="listOfServices"
            @delete-service="deleteService"
        ></service-item>
      </base-card>
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
import ServiceItem from "@/components/services/ServiceItem.vue";

export default {
  components: {
    ServiceItem,
    IonTitle,
    IonFab,
    IonFabButton,
    IonIcon,
  },
  data() {
    return {
      add,
      isModalOpen: false,
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
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
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
    async deleteService(id) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('deleteService', {
          id
        });
        this.isLoading = false;
      } catch (err) {
        this.error = err.message || 'Fail to delete service!';
      }
      this.isLoading = false;
    }
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