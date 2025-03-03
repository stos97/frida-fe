<template>
  <ion-grid>
    <ion-row>
      <ion-col @click="toggleDetails" size="7">{{ service.name }}</ion-col>
      <ion-col>{{ formatPrice(price) }}</ion-col>
      <ion-col size="1">
        <ion-icon @click="handleDelete" :icon="trashIcon"></ion-icon>
      </ion-col>
    </ion-row>
  </ion-grid>
  <base-card v-if="showDetails">
    <ion-grid>
      <ion-row>
        <ion-col>{{ $t('workerServices.table.time') }}: {{ formatMinutes(minutesNeeded) }}</ion-col>
      </ion-row>
    </ion-grid>

    <div v-if="formatedAdditions.length > 0">
      <ion-title class="ion-text-center">{{ $t('additions.titleLabel') }}</ion-title>
      <ion-grid>
        <ion-row>
          <ion-col>{{ $t('workerServices.table.name') }}</ion-col>
          <ion-col>{{ $t('workerServices.table.price') }}</ion-col>
          <ion-col>{{ $t('workerServices.table.time') }}</ion-col>
        </ion-row>
        <ion-row v-for="addition in formatedAdditions" :key="addition.id">
          <ion-col>{{addition.name}}</ion-col>
          <ion-col>{{formatPrice(addition.price)}}</ion-col>
          <ion-col>{{formatMinutes(addition.minutesNeeded)}}</ion-col>
        </ion-row>
      </ion-grid>
    </div>
  </base-card>
</template>

<script>

import {IonTitle, IonGrid, IonCol, IonRow, IonIcon, IonButton, IonButtons} from '@ionic/vue';
import {computed, ref} from "vue";
import {trash} from "ionicons/icons";

export default {
  components: {IonButtons, IonButton, IonIcon, IonTitle, IonGrid, IonCol, IonRow},
  props: ['service', 'additions', 'price', 'minutesNeeded'],
  emits: ['delete-worker-service'],
  setup(props, {emit}) {
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

    const handleDelete = () => {
      emit('delete-worker-service', props.service.id);
    };

    const formatPrice = (price) => {
      return price + ' RSD';
    };

    const formatMinutes = (minutes) => {
      return minutes + ' min';
    };

    return {
      showDetails,
      toggleDetails,
      formatedAdditions,
      trashIcon,
      handleDelete,
      formatPrice,
      formatMinutes,
    }
  }
}
</script>

<style scoped>

ion-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
</style>
