<template>
  <ion-page>
    <ion-content>
      <p v-if="isLoading">Loading</p>
      <p v-if="!!error">{{ error }}</p>
      <form class="ion-padding" @submit.prevent="submitForm">
        <ion-list>
          <ion-item>
            <ion-label>
              <ion-label>Email</ion-label>
              <ion-input type="email" v-model="email" required/>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-label class="ion-padding-top">
              <ion-label>Sifra</ion-label>
              <ion-input type="password" v-model="password" required/>
            </ion-label>
          </ion-item>
          <p v-if="!formIsValid">Forma nije ok</p>

          <ion-button type="submit" expand="block">Prijavi se</ion-button>
          <ion-button router-link="/register" fill="outline" expand="block">Registruj se</ion-button>
        </ion-list>
      </form>
    </ion-content>
  </ion-page>
</template>

<script>
import {IonPage, IonContent, IonList, IonItem, IonLabel, IonInput, IonButton} from "@ionic/vue";

export default {
  components: {
    IonPage,
    IonContent,
    IonList,
    IonLabel,
    IonInput,
    IonItem,
    IonButton,
  },
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      isLoading: false,
      error: null,
    }
  },
  methods: {
    async submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        return
      }


      this.isLoading = true;
      try {
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        })

        this.$router.replace(this.$store.getters.user.role);
      } catch (err) {
        this.error = err.message || 'Invalid Credentials!';
      }

      this.isLoading = false;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.email === '' || !this.email.includes('@') || this.password.length < 6) {
        this.formIsValid = false;
      }
    }
  }
}
</script>
