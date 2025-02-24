<template>
  <ion-item>
      {{ worker.name }}
      <ion-avatar slot="end">
        <img :src="image" alt="image"/>
      </ion-avatar>
  </ion-item>

  <ion-item>
    Broj telefona: {{ worker.phone }}
  </ion-item>
</template>

<script>
import {IonItem, IonAvatar} from '@ionic/vue';
import {computed} from "vue";

export default {
  props: ['worker'],
  components: {IonItem, IonAvatar},
  setup(props) {

    const image = computed(() => {
      const imagePath = props.worker.image_path ?? 'src/assets/default.jpg';
      const url = props.worker.image_path ? import.meta.env.VITE_API_BASE_URL : window.location.origin;

      return new URL(imagePath, url).href;
    })
    return {
      image
    }
  }
}
</script>

<style scoped>
ion-item {
  --background: rgba(255, 255, 255, 0.1);
  --border-style: none;
}

ion-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

ion-img {
  width: 100px;
  height: auto;
}
</style>
