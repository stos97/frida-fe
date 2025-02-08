<template>
  <div class="spinner-overlay">
    <ion-spinner name="crescent"></ion-spinner>
    <slot></slot>
  </div>
</template>

<style scoped>
.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8); /* Optional: semi-transparent background */
  z-index: 1000; /* Ensure it appears above other content */
}
</style>
<script setup lang="ts">
import {IonSpinner} from "@ionic/vue";
</script>