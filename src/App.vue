<template>
  <ion-app>
    <base-spinner v-if="isOffline">
      <p>No Internet Connection</p>
    </base-spinner>
    <TheMenu v-if="isAuthenticated"/>
    <ion-router-outlet id="main-content"/>
  </ion-app>
</template>

<script>
import {IonApp, IonRouterOutlet, isPlatform} from '@ionic/vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import {ref, computed, onMounted, onUnmounted} from 'vue';
import {Network} from "@ionic-native/network";

export default {
  components: {
    IonApp,
    IonRouterOutlet,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const isOffline = ref(false);

    const updateNetworkStatus = () => {
      const status = Network.Connection;
      isOffline.value = status === 'none';  // 'none' means no network connection
    };

    onMounted(() => {
      if (isPlatform('capacitor') || isPlatform('cordova')) {
        updateNetworkStatus();  // Initial check for network status

        // Subscribe to network status change events
        Network.onDisconnect().subscribe(() => {
          isOffline.value = true;
        });

        Network.onConnect().subscribe(() => {
          isOffline.value = false;
        });
      }
    });

    // Clean up when component is unmounted
    // onUnmounted(() => {
    //   if (isPlatform('capacitor') || isPlatform('cordova')) {
    //     // Unsubscribe from network listeners if needed
    //     Network.onDisconnect().unsubscribe();
    //     Network.onConnect().unsubscribe();
    //   }
    // });

    const isAuthenticated = computed(() => store.getters.isAuthenticated);

    onMounted(async () => {
      await store.dispatch('tryLogin');
      if (isAuthenticated.value) {
        await router.replace('/' + store.getters.user.role);
      }
    });

    return {
      isAuthenticated,
      isOffline
    };
  },
};
</script>
