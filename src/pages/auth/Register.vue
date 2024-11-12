<template>
  <ion-page>
    <ion-content>
      <base-spinner v-if="isLoading"></base-spinner>
      <p v-if="!!error">{{ error }}</p>
      <form class="ion-padding" @submit.prevent="submitForm">
        <ion-list>
          <ion-item>
            <ion-label>
              <ion-label>Email</ion-label>
              <ion-input type="email" v-model.trim="email.val" required/>
              <p v-if="!email.isValid">Email nije dobar</p>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-label>
              <ion-label>Ime</ion-label>
              <ion-input type="text" v-model.trim="name.val" required/>
              <p v-if="!name.isValid">Ime nije dobro</p>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-label>
              <ion-label>Telefon</ion-label>
              <ion-input type="tel" v-model.trim="phone.val" required/>
              <p v-if="!phone.isValid">Telefon nije dobar</p>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-label class="ion-padding-top">
              <ion-label>Sifra</ion-label>
              <ion-input type="password" v-model="password.val" required/>
              <p v-if="!password.isValid">Sifra mora da bude najmanje 6 karaktera</p>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-label class="ion-padding-top">
              <ion-label>Sifra ponovljeno</ion-label>
              <ion-input type="password" v-model="passwordConfirmation.val" required/>
              <p v-if="!passwordConfirmation.isValid">Sifre se ne podudaraju</p>
            </ion-label>
          </ion-item>
          <p v-if="!formIsValid">Forma nije ok, ispravite polja</p>

          <ion-button type="submit" expand="block">Registruj se</ion-button>
          <ion-button router-link="/login" fill="outline" expand="block">Prijavi se</ion-button>
        </ion-list>
      </form>
    </ion-content>
  </ion-page>
</template>

<script>
import {IonButton, IonInput, IonItem, IonLabel, IonList, IonPage, IonContent} from "@ionic/vue";

export default {
  components: {IonInput, IonLabel, IonList, IonItem, IonButton, IonPage, IonContent},
  data() {
    return {
      name: {
        val: '',
        isValid: true,
      },
      email: {
        val: '',
        isValid: true,
      },
      password: {
        val: '',
        isValid: true,
      },
      passwordConfirmation: {
        val: '',
        isValid: true,
      },
      phone: {
        val: '',
        isValid: true,
      },
      formIsValid: true,
      isLoading: false,
      error: null,
    }
  },
  methods: {
    async submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }


      this.isLoading = true;
      try {
        await this.$store.dispatch('register', {
          email: this.email.val,
          name: this.name.val,
          password: this.password.val,
          passwordConfirmation: this.passwordConfirmation.val,
          phone: this.phone.val,
        });

        this.$router.replace('/user');
      }
      catch (err) {
        this.error = err.message || 'Registration Fail!';
      }

      this.isLoading = false;
    },
    validateForm() {
      this.formIsValid = true;

      if (this.email.val === '' || !this.email.val.includes('@')) {
          this.formIsValid = false;
          this.email.isValid = false;
      }

      if (this.password.val.length < 6) {
        this.formIsValid = false;
        this.password.isValid = false;
      }

      if (this.password.val !== this.passwordConfirmation.val) {
        this.formIsValid = false;
        this.passwordConfirmation.isValid = false;
      }

      if (this.name.val === '') {
        this.formIsValid = false;
        this.name.isValid = false;
      }

      if (this.phone.val === '') {
        this.formIsValid = false;
        this.phone.isValid = false;
      }
    }
  }
}
</script>
