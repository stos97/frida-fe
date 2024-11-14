<template>
  <ion-menu side="end" menuId="menu" contentId="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item v-for="menuItem in menuItems" @click="navigateTo(menuItem.redirectTo)" :key="menuItem.redirectTo">{{menuItem.menuName}}</ion-item>
        <ion-item @click="logout">Odjavi se</ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script>
import {IonContent, IonHeader, IonTitle, IonToolbar, menuController, IonItem, IonList, IonMenu} from "@ionic/vue";

export default {
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonList,
    IonMenu,
  },
  data() {
    return {
      menuItems: []
    };
  },
  created() {
    this.menuItems = this.getMenuOptions()
  },
  methods: {
    async navigateTo(to) {
      await menuController.close('menu');
      this.$router.push(to);
    },
    async logout() {
      try {
        await this.$store.dispatch('logout');
        await menuController.close('menu');
        window.location.assign('/');
      } catch (err) {
        console.log(err)
      }
    },
    getMenuOptions() {
      const role = this.$store.getters.user.role;

      if (role === 'admin') {
        return [
          {
            redirectTo: '/admin',
            menuName: 'Pocetna'
          },
          {
            redirectTo: '/categories',
            menuName: 'Kategorije'
          },
          {
            redirectTo: '/services',
            menuName: 'Usluge'
          },
          {
            redirectTo: '/additions',
            menuName: 'Dodaci'
          },
        ];
      } else {
        return [
          {
            redirectTo: '/user',
            menuName: 'Users'
          }
        ]
      }
    }
  }
}
</script>