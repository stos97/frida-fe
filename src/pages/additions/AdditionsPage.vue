<template>
  <base-layout>
    <template v-slot:fab-button>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button router-link="/additions/add">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </template>
    <base-spinner v-if="isLoading"></base-spinner>
    <p v-if="!!error">{{ error }}</p>
    <div v-else>
      <ion-title class="ion-padding ion-text-center">Dodaci</ion-title>
      <additions-list :additions="additions"></additions-list>
    </div>
  </base-layout>
</template>

<script>
import {
  IonButton,
  IonButtons,
  IonCard, IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonFab,
  IonFabButton,
  IonIcon,
  IonTitle
} from "@ionic/vue";
import {add} from 'ionicons/icons';
import AdditionsList from "@/components/additions/AdditionsList.vue";

export default {
  components: {
    AdditionsList,
    IonCardContent, IonButton, IonButtons, IonCard,
    IonCardTitle, IonCardHeader, IonTitle, IonFab, IonFabButton, IonIcon
  },
  data() {
    return {
      isLoading: false,
      error: null,
      add,
    }
  },
  computed: {
    additions() {
      return this.$store.getters.transformedAdditions;
    }
  },
  created() {
    this.getAllAdditions();
  },
  methods: {
    async getAllAdditions() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('getAllAdditions');
        this.isLoading = false;
      } catch (err) {
        this.error = err.message || 'Fail to fetch additions!';
      }
      this.isLoading = false;
    },
  },
  async beforeRouteEnter(_, __, next) {
    try {
      await this.getAllAdditions();
      next();
    } catch (err) {
      next();
    }
  }
}
</script>
