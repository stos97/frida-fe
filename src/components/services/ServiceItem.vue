<template>
    <ion-item>
      <ion-label>{{ service.name }}</ion-label>
      <ion-buttons>
        <ion-button
            slot="end"
            color="danger"
            @click="handleDelete"
        >
          <ion-icon :icon="trash"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-item>
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

export default {
  props: ['service'],
  emits: ['delete-service'],
  components: {
    IonIcon, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonList
  },
  data() {
    return {
      trash
    }
  },
  methods: {
    handleDelete() {
      this.$emit('delete-service', this.service.id);
    }
  }
}
</script>

<style scoped>

ion-item {
  --background: rgba(255,255,255, 0.1);
  --border-style: none;
}

</style>
