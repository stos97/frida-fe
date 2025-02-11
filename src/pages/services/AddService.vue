<template>
  <base-layout>
    <base-card title="Dodaj uslugu">
      <form class="ion-padding" @submit.prevent="submitForm">
        <ion-item>
          <ion-label position="stacked">Naziv</ion-label>
          <ion-input type="text" v-model.trim="name" required/>
        </ion-item>

        <ion-item>
          <ion-label>Kategorija</ion-label>
          <ion-select v-model="category">
            <ion-select-option v-for="category in categories" :value="category.id">{{category.name}}</ion-select-option>
          </ion-select>
        </ion-item>
        <p v-if="!formIsValid">Forma nije validna</p>
        <p v-if="!!error">{{ error }}</p>

        <ion-button type="submit" expand="block">Dodaj</ion-button>
      </form>
    </base-card>
  </base-layout>

</template>

<script>
import {computed, onMounted, ref} from "vue";
import {IonButton, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption} from "@ionic/vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export default {
  components: {IonSelectOption, IonSelect, IonItem, IonInput, IonLabel, IonButton},
  setup() {
    const name = ref('');
    const category = ref(null);
    const error = ref(null);
    const formIsValid = ref(true);

    const store = useStore();
    const router = useRouter();

    const categories = computed(() => store.getters.categories);

    onMounted(async () => {
      await store.dispatch('getAllCategories');
    })

    const submitForm = async () => {

      if (name.value === '' || category.value == null) {
        formIsValid.value = false;

        return;
      }

      try {
        await store.dispatch('addService', {
          name: name.value,
          category_id: category.value,
        });
        name.value = '';
        category.value = null;
        await router.replace('/services');
      } catch (err) {
        error.value = err.message || 'Error while adding service';
      }
    }

    return {
      name,
      category,
      categories,
      formIsValid,
      error,
      submitForm,
    }
  }
}
</script>

<style scoped>
ion-item {
  --background: rgba(255, 255, 255, 0.1);
}
</style>

