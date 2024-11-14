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
      <ion-title class="ion-padding">Usluge</ion-title>

      <ion-card v-for="(listOfServices, name) in services" :key="name">
        <ion-card-header>
          <ion-card-title>{{ name }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item v-for="service in listOfServices" :key="service.id">
              <ion-label>{{ service.name }}</ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>


      <!--      <ion-item v-for="(listOfServices, name) in services" :key="name">-->
      <!--        {{name}}-->
      <!--        <ion-item v-for="service in listOfServices" :key="service.id">{{service.name}}</ion-item>-->
      <!--      </ion-item>-->
    </div>
  </base-layout>
</template>
<script>
import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonTitle,
  IonItem,
  IonList,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
} from "@ionic/vue";
import {add} from 'ionicons/icons';

export default {
  components: {
    IonTitle,
    IonFab,
    IonFabButton,
    IonIcon,
    IonItem,
    IonList,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
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
      return this.$store.getters.services;
    }
  },
  methods: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    async getAllServices() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("getAllServices")
        this.isLoading = false;
      } catch (err) {
        this.error = err.message || 'Invalid Credentials!';
      }
      this.isLoading = false;
    }
  },
  created() {
    this.getAllServices();
  }
}
</script>