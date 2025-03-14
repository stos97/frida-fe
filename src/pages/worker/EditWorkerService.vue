<template>
  <base-layout>
    <base-card :title="editedService?.service.name">
      <form @submit.prevent="submitForm">
        <ion-item>
          <ion-label position="floating">{{ $t('editWorkerService.form.priceLabel') }}</ion-label>
          <ion-input class="ion-margin-top" type="number" v-model.number="price" :value="price" required/>
        </ion-item>

        <ion-item>
          <ion-label position="floating">{{ $t('editWorkerService.form.timeLabel') }}</ion-label>
          <ion-input class="ion-margin-top" type="number" v-model.number="minutesNeeded" :value="minutesNeeded"
                     required/>
        </ion-item>

        <ion-item-group>
          <ion-item>
            <ion-label>{{ $t('editWorkerService.form.additionsLabel') }}</ion-label>
          </ion-item>

          <ion-item v-for="addition in availableAdditions" :key="addition.id">
            <ion-item-group>
              <ion-item lines="none">
                <ion-label>{{ addition.name }}</ion-label>
              </ion-item>

              <ion-item>
                <ion-label>{{ $t('editWorkerService.form.priceLabel') }}</ion-label>
                <ion-input type="number" :value="addition.price" v-model.number="addition.price"/>
              </ion-item>

              <ion-item lines="none">
                <ion-label>{{ $t('editWorkerService.form.timeLabel') }}</ion-label>
                <ion-input type="number" :value="addition.minutesNeeded" v-model.number="addition.minutesNeeded"/>
              </ion-item>

            </ion-item-group>
          </ion-item>
        </ion-item-group>

        <ion-button class="ion-margin-top" type="submit" expand="block">update</ion-button>
      </form>
    </base-card>
  </base-layout>
</template>

<script>
import {useRoute, useRouter} from "vue-router";
import {useStore} from 'vuex';
import {computed, onMounted, ref, watch} from "vue";
import {IonButton, IonInput, IonItem, IonItemGroup, IonLabel} from "@ionic/vue";


export default {
  components: {IonButton, IonItemGroup, IonInput, IonLabel, IonItem},
  props: ['workerId', 'serviceId'],
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const workerId = route.params.workerId;
    const serviceId = route.params.serviceId;
    const isLoading = ref(false);

    const editedService = computed(() => store.getters.editedService);
    const price = ref(editedService.value?.price);
    const minutesNeeded = ref(editedService.value?.minutesNeeded);
    const service = computed(() => store.getters.service);
    const availableAdditions = ref([]);

    const mergeAdditions = () => {
      availableAdditions.value.map((addition) => {
        const additionService = editedService.value.additions.find(a => a.addition_id === addition.id);
        if (additionService) {
          addition.price = additionService.price;
          addition.minutesNeeded = additionService.minutesNeeded;
        }

        return addition;
      });
    }

    mergeAdditions();

    onMounted(async () => {
      await getServiceByWorkerId();
      await getServiceById();
    });

    watch(editedService, (newValue) => {
      price.value = newValue?.price;
      minutesNeeded.value = newValue?.minutesNeeded;
    });

    watch(service, (newService) => {
      availableAdditions.value = newService?.additions;
      mergeAdditions();
    });

    const getServiceByWorkerId = async () => {
      isLoading.value = true;
      try {
        await store.dispatch('getServiceByWorkerId', {
          serviceId,
          workerId
        });
      } catch (err) {
        console.log(err)
      } finally {
        isLoading.value = false;
      }
    };

    const getServiceById = async () => {
      try {
        await store.dispatch('getServiceById', {
          id: serviceId,
        });
      } catch (err) {
      }
    }

    const getFormattedAdditions = () => {
      const formattedAdditions = [];

      for (const addition of availableAdditions.value) {
        if ((addition.hasOwnProperty('price') && addition.price !== '') || (addition.hasOwnProperty('minutesNeeded') && addition.minutesNeeded !== '')) {
          formattedAdditions.push({
            addition_id: addition.id,
            price: addition.price,
            minutesNeeded: addition.minutesNeeded,
          });
        }
      }

      return formattedAdditions;
    }

    const submitForm = async () => {
      const additions = getFormattedAdditions();

      try {
        await store.dispatch('updateWorkerService', {
          workerId,
          serviceId,
          price: price.value,
          minutesNeeded: minutesNeeded.value,
          additions
        });

        await router.replace(`/workers/${workerId}/details`);
      } catch (err) {
        console.log(err)
      }
    }

    return {
      editedService,
      price,
      minutesNeeded,
      availableAdditions,
      submitForm,
    }
  }
}
</script>


<style scoped>
ion-item {
  --background: rgba(255, 255, 255, 0.1);
}
</style>
