<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button
                v-if="showBackButton"
                :default-href="pageDefaultBackLink"
                :icon="chevronBack"
            ></ion-back-button>
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
</template>

<script>
import {IonPage, IonHeader, IonTitle, IonContent, IonToolbar, IonBackButton, IonButtons, IonMenuButton} from '@ionic/vue'
import {chevronBack} from "ionicons/icons";

export default {
  data() {
    return {
      chevronBack,
    }
  },
  props: {
    pageTitle: String,
    pageDefaultBackLink: String,
    showBackButton: {
      type: Boolean,
      default: true
    }
  },
  components: {
    IonPage,
    IonHeader,
    IonTitle,
    IonContent,
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonMenuButton,
  }
}
</script>