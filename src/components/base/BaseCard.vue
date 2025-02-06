<template>
  <ion-card>
    <ion-card-header v-if="title">
      <ion-card-title class="ion-text-center">{{ title }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <slot></slot>
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
  IonCardTitle,
  IonIcon,
  IonItem,
  IonLabel
} from "@ionic/vue";

export default {
  props: ['title'],
  components: {
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonIcon,
    IonItem,
    IonLabel
  },
}
</script>

<style scoped>
ion-card-header {
  border: 1px solid #AA6D1C;
  background: rgba(254, 241, 188, 0.5);
  border-radius: 30px;
}

ion-card {
  border: 1px solid #AA6D1C;
  padding: 1px;
  border-radius: 30px;
  background: rgba(255,255,255, 0.5);
}
</style>
