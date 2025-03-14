<template>
  <base-layout>
    <base-card :title="$t('addWorkerService.titleLabel')">
      <form class="ion-padding" @submit.prevent="submitForm">
        <ion-item>
          <ion-label>{{ $t('addWorkerService.form.serviceLabel')}}</ion-label>
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
          <ion-label>{{ $t('addWorkerService.form.priceLabel')}}</ion-label>
          <ion-input type="number" v-model="price" required/>
        </ion-item>
        <ion-item>
          <ion-label>{{ $t('addWorkerService.form.timeLabel')}}</ion-label>
          <ion-input type="number" v-model="minutesNeeded" required/>
        </ion-item>

        <ion-item-group v-if="selectedService">
          <ion-item>
            <ion-label>{{ $t('addWorkerService.form.additionsLabel')}}</ion-label>
          </ion-item>

          <ion-item v-for="addition in availableAdditions" :key="addition.id">
            <ion-item-group>
              <ion-item lines="none">
                <ion-label>{{ addition.name }}</ion-label>
              </ion-item>

              <ion-item>
                <ion-label>{{ $t('addWorkerService.form.priceLabel')}}</ion-label>
                <ion-input type="number" v-model.number="addition.price"/>
              </ion-item>

              <ion-item lines="none">
                <ion-label>{{ $t('addWorkerService.form.timeLabel')}}</ion-label>
                <ion-input type="number" v-model.number="addition.minutesNeeded"/>
              </ion-item>

            </ion-item-group>
          </ion-item>
        </ion-item-group>

        <ion-button class="ion-margin-top" type="submit" expand="block">{{$t('addAddition.form.submitButton') }}</ion-button>
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
    const selectedService = ref(false);
    const price = ref(null);
    const minutesNeeded = ref(null);

    const availableService = computed(() => store.getters.services);
    const availableAdditions = computed(() => store.getters.service?.additions);

    const getFormattedAdditions = () => {
      const formattedAdditions = [];

      for (const addition of availableAdditions.value) {
        if (addition.hasOwnProperty('price') || addition.hasOwnProperty('minutesNeeded')) {
          formattedAdditions.push({
            addition_id: addition.id,
            price: addition.price ?? 0,
            minutesNeeded: addition.minutesNeeded ?? 0,
          });
        }
      }

      return formattedAdditions;
    }

    const submitForm = async () => {
      const formattedAdditions = getFormattedAdditions();

      try {
        await store.dispatch('addServiceToWorker', {
          serviceId: selectedService.value,
          workerId: workerId,
          price: price.value,
          minutesNeeded: minutesNeeded.value,
          additions: formattedAdditions,
        });
      } catch (err) {

      }

      await router.replace('/workers/' + workerId + '/details');
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

    watch(selectedService, async (newValue, _) => {
      try {
        await store.dispatch('getServiceById', {
          id: newValue
        });
      } catch (err) {
      }
    });

    return {
      availableService,
      selectedService,
      availableAdditions,
      submitForm,
      price,
      minutesNeeded,
    }
  }
}
</script>

<style scoped>
ion-item {
  --background: rgba(255, 255, 255, 0.1);
}
</style>
