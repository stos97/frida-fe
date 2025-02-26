<template>
  <ion-item @click="toggleDetails">
    <ion-label slot="start"> {{ service.name }}</ion-label>
    <ion-label slot="end"> {{ priceFormated }}</ion-label>
  </ion-item>
  <base-card v-if="showDetails">
    <ion-item>
      <ion-label>{{$t('workerServices.table.time')}}: {{ minutesNeeded }} min</ion-label>
    </ion-item>
    <ion-title class="ion-text-center">{{$t('additions.titleLabel')}}</ion-title>
  </base-card>
</template>

<script>

import {IonItem, IonLabel, IonTitle} from '@ionic/vue';
import {ref} from "vue";

export default {
  components: {IonItem, IonLabel, IonTitle},
  props: ['service', 'additions', 'price', 'minutesNeeded'],
  setup(props) {
    const priceFormated = ref(props.price + ' RSD');
    const showDetails = ref(false);

    const toggleDetails = () => {
      showDetails.value = !showDetails.value;
    }

    return {
      priceFormated,
      showDetails,
      toggleDetails,
    }
  }
}
</script>

<style scoped>
ion-item {
  --background: rgba(255, 255, 255, 0.1);
  --border-style: none;
}

ion-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
</style>
