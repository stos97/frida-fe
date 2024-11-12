<template>
  <div>
    <TheMenu/>
    <ion-page id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button :default-href="pageDefaultBackLink"></ion-back-button>
          </ion-buttons>
          <ion-title>{{ pageTitle ?? "Frida Beauty" }}</ion-title>
          <ion-buttons slot="end">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <slot></slot>
        <slot name="fab-button"></slot>
      </ion-content>
    </ion-page>
  </div>
</template>

<script>
import {IonPage, IonHeader, IonTitle, IonContent, IonToolbar, IonBackButton, IonButtons, IonMenuButton} from '@ionic/vue'
import TheMenu from "@/components/layout/TheMenu.vue";

export default {
  props: ['pageTitle', 'pageDefaultBackLink'],
  components: {
    IonPage,
    IonHeader,
    IonTitle,
    IonContent,
    IonToolbar,
    IonBackButton,
    IonButtons,
    TheMenu,
    IonMenuButton,
  }
}
</script>