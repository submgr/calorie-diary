<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Сегодня</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Сегодня</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-fab slot="fixed" horizontal="end" vertical="bottom" @click="add_eaten">
            <ion-fab-button color="success">
                <ion-icon :icon="add"></ion-icon>
            </ion-fab-button>
        </ion-fab>

        <ion-card color="medium">
            <ion-card-header>
            <ion-card-title>{{thisday_calories}}/{{Math.round(userdata.metric_tdee)}} kcal</ion-card-title>
            <ion-card-subtitle>восполнено за день</ion-card-subtitle>
            </ion-card-header>

            <ion-card-content>
            Сегодня вы выполнили цель на {{Math.round(100 / userdata.metric_tdee * thisday_calories)}}% для калорий.<br/><br/>
            Белки: {{thisday_proteins}}/{{Math.round(userdata.metric_tdee * 0.0455)}} грамм<br/>
            Жиры: {{thisday_fats}}/{{Math.round(userdata.metric_tdee * 0.0325)}} грамм<br/>
            Углеводы: {{thisday_carbohydrates}}/{{Math.round(userdata.metric_tdee * 0.1355)}} грамм
            </ion-card-content>
        </ion-card>

        <!-- <FillingBox percentage="30" /> -->

        <EatenList style="margin-top: 0%" :data_list="todays_history" :localstorage_datacode="localstorage_datacode" />
        
      </ion-content>
    </ion-page>
  </template>

  <style scoped>
    ion-card{
        border-radius: 30px;
    }
    .scroller {
        height: 100%;
    }
  </style>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/vue';
  //import FillingBox from '@/components/FillingBox.vue';
  import EatenList from '@/components/EatenList.vue';

  import { add } from 'ionicons/icons';
  
  export default defineComponent({
    name: 'Tab2Page',
    components: { EatenList, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonFab, IonFabButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent },
    setup() {
      const list = ref([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      return { add, list }
    },
    mounted(){
      this.pageJob();
    },
    data(){
        return {
            modal_state: "hidden",
            thisday_calories: 0,
            thisday_proteins: 0,
            thisday_fats: 0,
            thisday_carbohydrates: 0,
            userdata: {},
            todays_history: [],
            localstorage_datacode: ""
        }
    },
    watch: {
      '$route' () {
        this.pageJob();
      }
    },
    methods: {
        add_eaten(){
            //alert("Got it.")
            //this.modal_state = "addElementModalActive"
            this.$router.push('eatenAdd')
        },
        pageJob(){
          this.thisday_calories = 0;
          this.thisday_proteins = 0;
          this.thisday_fats = 0;
          this.thisday_carbohydrates = 0;
          this.userdata = JSON.parse(localStorage.getItem("local_userdata"))
          console.log(this.userdata)
          const d = new Date();
          const thisday = `eatinghistory_${d.getFullYear()}_${d.getMonth()}_${d.getDate()}`;
          this.localstorage_datacode = thisday;
          if(!localStorage.getItem(thisday)){
            localStorage.setItem(thisday, JSON.stringify([]))
          }
          this.todays_history = JSON.parse(localStorage.getItem(thisday))
          console.log(this.todays_history)

          for(var i = 0; i < this.todays_history.length; i++){
            this.thisday_calories += this.todays_history[i].calories;
            this.thisday_proteins += this.todays_history[i].proteins;
            this.thisday_fats += this.todays_history[i].fats;
            this.thisday_carbohydrates += this.todays_history[i].carbohydrates;
          }

          const tabsEl = document.querySelector('ion-tab-bar');
          if (tabsEl) {
            tabsEl.hidden = false;
            tabsEl.style.height = "1";
          }
        }
    }
  });
  </script>
  