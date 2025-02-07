<template>
  <ion-menu side="end" menuId="menu" contentId="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item v-for="menuItem in menuItems" @click="navigateTo(menuItem.redirectTo)" :key="menuItem.redirectTo">{{ menuItem.menuName }}</ion-item>
        <ion-item @click="logout">Odjavi se</ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { menuController } from '@ionic/vue';
import {IonTitle, IonHeader, IonItem, IonList, IonMenu, IonContent, IonToolbar} from "@ionic/vue";

export default {
  components: {IonTitle, IonHeader, IonItem, IonList, IonMenu, IonContent, IonToolbar},
  setup() {
    const menuItems = ref([]);
    const router = useRouter();
    const store = useStore();

    const getMenuOptions = () => {
      const role = store.getters.user.role;

      if (role === 'admin') {
        return [
          { redirectTo: '/admin', menuName: 'Pocetna' },
          { redirectTo: '/categories', menuName: 'Kategorije' },
          { redirectTo: '/services', menuName: 'Usluge' },
          { redirectTo: '/additions', menuName: 'Dodaci' },
        ];
      } else {
        return [{ redirectTo: '/user', menuName: 'Users' }];
      }
    };

    const navigateTo = async (to) => {
      await menuController.close('menu');
      await router.push(to);
    };

    const logout = async () => {
      try {
        await store.dispatch('logout');
        await menuController.close('menu');
        window.location.assign('/');
      } catch (err) {
        console.log(err);
      }
    };

    onMounted(() => {
      menuItems.value = getMenuOptions();
    });

    return {
      menuItems,
      navigateTo,
      logout,
    };
  },
};
</script>
