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
      <ion-title class="ion-padding">Kategorije</ion-title>
      <ion-item v-for="addition in additions" :key="addition.id">{{addition.name}}</ion-item>
    </div>
  </base-layout>
</template>

<script>
import {IonFab, IonFabButton, IonIcon, IonItem, IonTitle} from "@ionic/vue";
import {add} from 'ionicons/icons';

export default {
  components: {IonTitle, IonFab, IonFabButton, IonIcon, IonItem},
  data() {
    return {
      isLoading: false,
      error: null,
      add,
      isModalOpen: false,
    }
  },
  computed: {
    additions() {
      return this.$store.getters.additions;
    }
  },
  created() {
    this.getAllAdditions();
  },
  methods: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    async getAllAdditions() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('getAllAdditions');
        this.isLoading = false;
      } catch (err) {
        this.error = err.message || 'Fail to fetch additions!';
      }
      this.isLoading = false;
    }
  }
}
</script>
