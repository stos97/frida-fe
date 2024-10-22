<template>
  <base-layout page-title="Registracija" page-default-back-link="/login">

    <ion-button router-link="/login" fill="outline" expand="block">Loginuj se</ion-button>
  </base-layout>
</template>

<script>

import BaseLayout from "@/base/BaseLayout.vue";
import {IonButton} from "@ionic/vue";

export default {
  components: {IonButton, BaseLayout}

}
</script>