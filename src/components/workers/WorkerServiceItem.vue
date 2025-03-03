<template>
  <ion-grid>
    <ion-row>
      <ion-col @click="toggleDetails" size="7">{{ service.name }}</ion-col>
      <ion-col>{{ priceFormated }}</ion-col>
      <ion-col size="1">
        <ion-icon @click="deleteWorkerService(service.id)" :icon="trashIcon"></ion-icon>
      </ion-col>
    </ion-row>
  </ion-grid>
  <base-card v-if="showDetails">
    <ion-item>
      <ion-label>{{ $t('workerServices.table.time') }}: {{ minutesNeeded }} min</ion-label>
    </ion-item>

    <div v-if="formatedAdditions.length > 0">
      <ion-title class="ion-text-center">{{ $t('additions.titleLabel') }}</ion-title>
      <ion-item>
        <ion-label slot="start">{{ $t('workerServices.table.name') }}</ion-label>
        <ion-label slot="end">{{ $t('workerServices.table.price') }}</ion-label>
        <ion-label slot="end">{{ $t('workerServices.table.price') }}</ion-label>
      </ion-item>
      <ion-item v-for="addition in formatedAdditions" :key="addition.id">
        <ion-label slot="start">{{ addition.name }}</ion-label>
        <ion-label slot="end">{{ addition.price }}</ion-label>
        <ion-label slot="end">{{ addition.minutesNeeded }}</ion-label>
      </ion-item>
    </div>
  </base-card>
</template>

<script>

import {IonItem, IonLabel, IonTitle, IonGrid, IonCol, IonRow, IonIcon} from '@ionic/vue';
import {computed, ref} from "vue";
import {trash} from "ionicons/icons";

export default {
  components: {IonIcon, IonItem, IonLabel, IonTitle, IonGrid, IonCol, IonRow},
  props: ['service', 'additions', 'price', 'minutesNeeded'],
  setup(props) {
    const priceFormated = ref(props.price + ' RSD');
    const showDetails = ref(false);
    const trashIcon = ref(trash);

    const toggleDetails = () => {
      showDetails.value = !showDetails.value;
    }

    const formatedAdditions = computed(() => {
      return props.additions.map((addition) => {
        return {
          id: addition.id,
          price: addition.price,
          minutesNeeded: addition.minutesNeeded,
          name: addition.addition.name,
        };
      });
    });

    const deleteWorkerService = (id) => {
      console.log('delete', id);
    }

    return {
      priceFormated,
      showDetails,
      toggleDetails,
      formatedAdditions,
      trashIcon,
      deleteWorkerService,
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
