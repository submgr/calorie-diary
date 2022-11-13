<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Загрузка...</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Загрузка...</ion-title>
          </ion-toolbar>
        </ion-header>

      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent} from '@ionic/vue';
  
  export default defineComponent({
    name: 'Tab3Page',
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
    mounted(){
      if(localStorage.getItem("local_userdata")){
        this.$router.replace('home')
      }else{
        this.$router.replace('hello')
      }
      
    }
  });
  </script>
  