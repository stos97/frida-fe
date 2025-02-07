<template>
  <base-layout>
    <template v-slot:fab-button>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button>
          <ion-icon :icon="addIcon"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </template>
    <base-spinner v-if="isLoading"></base-spinner>
    <p v-if="!!error">{{ error }}</p>
    <div v-else>
      <ion-title class="ion-padding ion-text-center">Usluge</ion-title>
      <services-list :services="services"></services-list>
    </div>
  </base-layout>
</template>

<script>
import {ref, computed, onMounted, watchEffect} from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { IonFab, IonFabButton, IonIcon, IonTitle } from '@ionic/vue';
import { add } from 'ionicons/icons';
import ServicesList from '@/components/services/ServicesList.vue';

export default {
  components: {
    IonFab,
    IonFabButton,
    IonIcon,
    IonTitle,
    ServicesList,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const addIcon = add;
    const isLoading = ref(false);
    const error = ref(null);

    const services = computed(() => store.getters.transformedServices);

    const getAllServices = async () => {
      isLoading.value = true;
      try {
        await store.dispatch('getAllServices');
      } catch (err) {
        error.value = err.message || 'Fail to load services!';
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(async () => {
      await getAllServices();
    });

    watchEffect(async () => {
      if (route.path === '/services') {
        await getAllServices();
      }
    });

    return {
      addIcon,
      isLoading,
      error,
      services,
    };
  },
};
</script>
