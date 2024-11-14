<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{ categoryName }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ion-list>
        <ion-item v-for="service in services" :key="service.id">
          <ion-label>{{ service.name }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-card-content>
  </ion-card>
</template>
<script>
import {IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonList} from "@ionic/vue";

export default {
  props: ['categoryName', 'services'],
  components: {IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonList},
}
</script>