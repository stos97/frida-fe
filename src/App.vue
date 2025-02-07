<template>
  <ion-app>
    <TheMenu v-if="isAuthenticated"/>
    <ion-router-outlet id="main-content"/>
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { onMounted, computed } from 'vue';

export default {
  components: {
    IonApp,
    IonRouterOutlet,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const isAuthenticated = computed(() => store.getters.isAuthenticated);

    onMounted(async () => {
      await store.dispatch('tryLogin');
      if (isAuthenticated.value) {
        await router.replace('/' + store.getters.user.role);
      }
    });

    return {
      isAuthenticated,
    };
  },
};
</script>
