<template>
    <ion-item>
      <ion-label @click="toggleDetails">{{ service.name }}</ion-label>
      <ion-buttons>
        <ion-button
            color="danger"
            @click="handleDelete"
        >
          <ion-icon :icon="trash"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-item>
  <base-card
      v-if="showDetails"
  >
    <ion-card-title>Dodaci</ion-card-title>
    <addition-item
        @delete-addition="detachAddition"
        v-for="addition in service.additions"
        :key="addition.id"
        :addition="addition"
    >
    </addition-item>
  </base-card>
</template>

<script>
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle, IonIcon,
  IonItem,
  IonLabel,
  IonList
} from "@ionic/vue";
import {trash} from 'ionicons/icons';
import AdditionItem from "@/components/additions/AdditionItem.vue";

export default {
  props: ['service'],
  emits: ['delete-service'],
  components: {
    AdditionItem,
    IonIcon, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonList
  },
  data() {
    return {
      trash,
      showDetails: false,
    }
  },
  methods: {
    handleDelete() {
      this.$emit('delete-service', this.service.id);
    },
    toggleDetails() {
      this.showDetails = !this.showDetails;
    },
    async detachAddition(id) {
      const filteredAdditions = this.service.additions.filter(addition => addition.id !== id);
      try {
        await this.$store.dispatch('detachAdditionFromService', {
          id: this.service.id,
          additions: filteredAdditions,
        });
      } catch (err) {
        this.error = err.message || 'Fail to detach addition!';
      }
    }
  },
}
</script>

<style scoped>

ion-item {
  --background: rgba(255,255,255, 0.1);
  --border-style: none;
}

ion-card {
  background: rgba(255,255,255, 0.1);
  border-radius: 10px;
}

</style>
