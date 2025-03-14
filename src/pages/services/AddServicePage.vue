<template>
  <base-layout>
    <base-card :title="$t('addService.titleLabel')">
      <form class="ion-padding" @submit.prevent="submitForm">
        <ion-item>
          <ion-label position="floating">{{ $t('addService.form.nameLabel') }}</ion-label>
          <ion-input class="ion-margin-top" type="text" v-model.trim="name" required/>
        </ion-item>

        <ion-item>
          <ion-label>{{ $t('addService.form.categoryLabel') }}</ion-label>
          <ion-select v-model="category" :cancel-text="$t('addService.form.cancelText')" :ok-text="$t('addService.form.okText')">
            <ion-select-option v-for="category in categories" :value="category.id">{{category.name}}</ion-select-option>
          </ion-select>
        </ion-item>
        <p v-if="!formIsValid">{{ $t('addService.form.errorMessage') }}</p>
        <p v-if="!!error">{{ error }}</p>

        <ion-button type="submit" expand="block">{{ $t('addService.form.submitButton') }}</ion-button>
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

