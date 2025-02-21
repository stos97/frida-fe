<template>
  <ion-menu side="end" menuId="menu" contentId="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t('menu.titleLabel') }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item v-for="menuItem in menuItems" @click="navigateTo(menuItem.redirectTo)" :key="menuItem.redirectTo">
          {{ menuItem.menuName }}
        </ion-item>
        <ion-item @click="logout">{{ $t('menu.logout') }}</ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script>
import {ref, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';
import {menuController} from '@ionic/vue';
import {IonTitle, IonHeader, IonItem, IonList, IonMenu, IonContent, IonToolbar} from "@ionic/vue";
import {useI18n} from 'vue-i18n';

export default {
  components: {IonTitle, IonHeader, IonItem, IonList, IonMenu, IonContent, IonToolbar},
  setup() {
    const menuItems = ref([]);
    const router = useRouter();
    const store = useStore();
    const {t} = useI18n();

    const getMenuOptions = () => {
      const role = store.getters.user.role;

      if (role === 'admin') {
        return [
          {redirectTo: '/admin', menuName: t('menu.admin.homepage')},
          {redirectTo: '/categories', menuName: t('menu.admin.categories')},
          {redirectTo: '/services', menuName: t('menu.admin.services')},
          {redirectTo: '/additions', menuName: t('menu.admin.additions')},
        ];
      } else {
        return [{redirectTo: '/user', menuName: 'Users'}];
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
