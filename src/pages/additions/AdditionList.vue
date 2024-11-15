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
      <base-card v-for="(listOfAdditions, type) in additions" :key="type" :title="type">
        <additions-item
            :type="type"
            :additions="listOfAdditions"
        ></additions-item>
      </base-card>
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
import AdditionsItem from "@/components/additions/AdditionsItem.vue";
import ServiceItem from "@/components/services/ServiceItem.vue";

export default {
  components: {
    ServiceItem,
    AdditionsItem,
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
    }
  }
}
</script>
