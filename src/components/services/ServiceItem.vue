<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{ categoryName }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ion-list>
        <ion-item v-for="service in services" :key="service.id">
          <ion-label>{{ service.name }}</ion-label>
          <ion-buttons>
            <ion-button
                slot="end"
                color="danger"
                @click="handleDelete(service)"
            >
              <ion-icon :icon="trash"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-item>
      </ion-list>
    </ion-card-content>
  </ion-card>
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
  props: ['categoryName', 'services'],
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
    handleDelete(service) {
      this.$emit('delete-service', service.id);
    }
  }
}
</script>