<template>
  <base-layout>
    <template v-slot:fab-button>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button router-link="/additions/add">
          <ion-icon :icon="addIcon"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </template>
    <base-spinner v-if="isLoading"></base-spinner>
    <p v-if="!!error">{{ error }}</p>
    <div v-else>
      <ion-title class="ion-padding ion-text-center">{{ $t('additions.titleLabel') }}</ion-title>
      <additions-list :additions="additions"></additions-list>
    </div>
  </base-layout>
</template>

<script>
import {ref, computed, onMounted, watchEffect} from 'vue';
import {useRoute} from 'vue-router'
import {useStore} from 'vuex';
import {add} from 'ionicons/icons';
import AdditionsList from "@/components/additions/AdditionsList.vue";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonFab,
  IonFabButton,
  IonIcon,
  IonTitle
} from "@ionic/vue";

export default {
  components: {
    AdditionsList,
    IonCardContent, IonButton, IonButtons, IonCard,
    IonCardTitle, IonCardHeader, IonTitle, IonFab, IonFabButton, IonIcon
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const isLoading = ref(false);
    const error = ref(null);
    const addIcon = ref(add);

    const additions = computed(() => store.getters.transformedAdditions);

    const getAllAdditions = async () => {
      isLoading.value = true;
      try {
        await store.dispatch('getAllAdditions');
      } catch (err) {
        error.value = err.message || 'Fail to fetch additions!';
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(async () => {
      await getAllAdditions();
    });

    watchEffect(async () => {
      if (route.path === '/additions') {
        await getAllAdditions();
      }
    });

    return {
      isLoading,
      error,
      additions,
      addIcon
    };
  }
};
</script>
