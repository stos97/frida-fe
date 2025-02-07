<template>
  <form @submit.prevent="submitForm">
    <ion-item>
      <ion-label>Dodatak</ion-label>
      <ion-select slot="end" v-model="additionId" @click="getAllAdditions">
        <ion-select-option
            v-for="addition in additions"
            :key="addition.id"
            :value="addition.id"
        >{{ addition.name }}</ion-select-option>
      </ion-select>
    </ion-item>

    <ion-button class="ion-margin-top" type="submit" expand="block">Dodaj</ion-button>
  </form>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { IonButton, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/vue';
import {useStore}  from "vuex";

export default {
  components: { IonButton, IonItem, IonLabel, IonSelect, IonSelectOption },
  props: ['serviceId'],
  emits: ['attach-addition'],
  setup(props, { emit }) {
    const store = useStore();

    const additionId = ref(null);
    const additions = computed(() => store.getters.additions);

    const getAllAdditions = async () => {
      try {
        await store.dispatch('getAllAdditions', {
          service_id: props.serviceId
        });
      } catch (err) {
        console.error('Failed to fetch additions:', err.message || 'Error');
      }
    };

    const submitForm = () => {
      const addition = additions.value.find(addition => addition.id === additionId.value);
      emit('attach-addition', addition);
      additionId.value = null;
    };

    onMounted(async () => {
      await getAllAdditions();
    });

    return {
      additionId,
      additions,
      getAllAdditions,
      submitForm
    };
  },
};
</script>

<style scoped>
ion-item {
  --background: rgba(255,255,255, 0.1);
  --border-style: none;
}
</style>
