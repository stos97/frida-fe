<template>
  <base-layout>
    <base-card title="dodaj service">
      <form class="ion-padding" @submit.prevent="submitForm">
        <ion-item>
          <ion-label>Usluga</ion-label>
          <ion-select v-model="selectedService">
            <ion-select-option
                v-for="service in availableService"
                :key="service.id"
                :value="service.id"
            >
              {{ service.name }}
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label>Cena</ion-label>
          <ion-input type="number" v-model="price" required/>
        </ion-item>
        <ion-item>
          <ion-label>Vreme porebno</ion-label>
          <ion-input type="number" v-model="timeNeeded" required/>
        </ion-item>

        <ion-item-group v-if="selectedService">
          <ion-item>
            <ion-label>Dodaci</ion-label>
          </ion-item>

          <ion-item v-for="addition in availableAdditions" :key="addition.id">
            <ion-item-group>
              <ion-item lines="none">
                <ion-label>{{ addition.name }}</ion-label>
              </ion-item>

              <ion-item>
                <ion-label>Cena</ion-label>
                <ion-input type="number" v-model.number="priceData[addition.id]"/>
              </ion-item>

              <ion-item lines="none">
                <ion-label>Vreme</ion-label>
                <ion-input type="number" v-model.number="timeData[addition.id]"/>
              </ion-item>

            </ion-item-group>
          </ion-item>

        </ion-item-group>

        <ion-button class="ion-margin-top" type="submit" expand="block">{{
            $t('addAddition.form.submitButton')
          }}
        </ion-button>
      </form>
    </base-card>
  </base-layout>
</template>

<script>
import {computed, onMounted, ref, watch} from "vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import BaseCard from "@/components/base/BaseCard.vue";
import {IonButton, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, IonItemGroup} from "@ionic/vue";

export default {
  components: {IonSelectOption, IonItem, IonSelect, IonLabel, IonInput, IonButton, BaseCard, IonItemGroup},
  props: ['worker'],
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const isLoading = ref(false);
    const workerId = route.params.id;
    const selectedService = ref(null);
    const price = ref(null);
    const timeNeeded = ref(null);

    const availableService = computed(() => store.getters.services);
    const availableAdditions = computed(() => store.getters.service.additions);
    const priceData = ref([]);
    const timeData = ref([]);

    watch(selectedService, async (newValue, _) => {
      try {
        await store.dispatch('getServiceById', {
          id: newValue
        });
      } catch (err) {
      }
    });

    const submitForm = async () => {
      const formattedAdditions = [];

      console.log(priceData.value.keys())

      for (const addition of availableAdditions.value) {
        if (priceData.value.hasOwnProperty(addition.id) || timeData.value.hasOwnProperty(addition.id)) {
          formattedAdditions.push({
            addition_id: addition.id,
            price: priceData.value[addition.id] ?? 0,
            minutesNeeded: timeData.value[addition.id] ?? 0,
          });
        }
      }


      try {
        await store.dispatch('addServiceToWorker', {
          serviceId: selectedService.value,
          workerId: workerId,
          price: price.value,
          minutesNeeded: timeNeeded.value,
          additions: formattedAdditions,
        });
      } catch (err) {

      }

      await router.replace('/workers/' + workerId);
    };

    const getAllService = async () => {
      isLoading.value = true;

      try {
        await store.dispatch('getAllServices', {
          worker_id: workerId
        });
      } catch (err) {

      } finally {
        isLoading.value = false;
      }
    };

    onMounted(async () => {
      await getAllService();
    });

    return {
      availableService,
      selectedService,
      availableAdditions,
      submitForm,
      price,
      timeNeeded,
      timeData,
      priceData,
    }
  }
}
</script>

<style scoped>
ion-item {
  --background: rgba(255, 255, 255, 0.1);
}
</style>
