<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Что вы съели?</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Что вы съели?</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-segment color="primary" :value="currentSegment" style="margin-top: 3vh; margin-bottom: 1vh; margin-left: 3vw; width: 94%; margin-right: 3vw;">
                <ion-segment-button value="shared" @click="changeListView('shared')">
                    <ion-label>Общее</ion-label>
                </ion-segment-button>
                <ion-segment-button value="local" @click="changeListView('local')">
                    <ion-label>Мой список</ion-label>
                </ion-segment-button>
            </ion-segment>
            <div v-if="currentListView == 'shared'">     
                <DynamicScroller
                    style="margin-top: 3vh"
                    :items="shared_items"
                    :min-item-size="100"
                    gridItems=2
                    class="scroller" keyField="code"
                >
                    <template v-slot="{ item, index, active }">
                    <DynamicScrollerItem
                        :item="item"
                        :min-item-size="500"
                        :active="active"
                        :gridItems="2"
                        :data-index="index"
                    >
                    <ion-item @click="selectedEatenElement(item.friendly_name, item.calories, item.proteins, item.fats, item.carbohydrates)">
                            <ion-icon :icon="ellipseOutline"></ion-icon>
                            <ion-label style="margin-left: 2vw;">{{ item.friendly_name }}</ion-label>
                        </ion-item>
                    </DynamicScrollerItem>
                    </template>
                </DynamicScroller>
                
        </div>
        <div v-if="currentListView == 'local'">     
            <DynamicScroller v-if="local_items.length > 0"
                style="margin-top: 3vh"
                :items="local_items"
                :min-item-size="100"
                gridItems=2
                class="scroller" keyField="code"
            >
                <template v-slot="{ item, index, active }">
                <DynamicScrollerItem
                    :item="item"
                    :min-item-size="500"
                    :active="active"
                    :gridItems="2"
                    :data-index="index"
                >
                <ion-item @click="selectedEatenElement(item.friendly_name, item.calories, item.proteins, item.fats, item.carbohydrates)">
                        <ion-icon :icon="ellipseOutline"></ion-icon>
                        <ion-label style="margin-left: 2vw;">{{ item.friendly_name }}</ion-label>
                    </ion-item>
                </DynamicScrollerItem>
                </template>
            </DynamicScroller>
            <div v-if="local_items.length == 0" style="margin-left: 3vw; margin-top: 5vh;">
                <span>Вы еще не добавляли продукты в свой личный список для быстрого ввода.</span>
            </div>
        </div>
      </ion-content>
      <ion-modal
                @willDismiss="Modal_onWillDismiss"
                :is-open="modalState == 'confirmEatenAdd'"
                trigger="open-modal"
                :initial-breakpoint="0.85"
                :breakpoints="[0, 0.85]"
                handle-behavior="cycle"
        >
            <ion-content class="ion-padding">
                <div class="ion-margin-top">
                    <ion-label style="white-space: pre-wrap;"><b>Добавляем "{{temp_eatenelement_data.friendly_name}}" в сегодняшнюю историю?</b><br>
                        <br/>   Калории: {{Math.round(temp_eatenelement_data.calories / 100 * addEatenPortionSize)}}
                        <br>    Белки: {{Math.round(temp_eatenelement_data.proteins / 100 * addEatenPortionSize)}}
                        <br>    Жиры: {{Math.round(temp_eatenelement_data.fats / 100 * addEatenPortionSize)}}
                        <br>    Углеводы: {{Math.round(temp_eatenelement_data.carbohydrates / 100 * addEatenPortionSize)}}<br>
                        <i> (на {{addEatenPortionSize}} грамм)</i></ion-label>
                    <div style="margin-top: 3vh;"></div>
                    <ion-label style="white-space: pre-wrap;"><b>Употребленная порция</b> <i>(в граммах)</i></ion-label>
                    <ion-item fill="solid" class="md ionitem_margin">
                        <ion-input v-model="addEatenPortionSize" type="number" min="0" placeholder="в граммах"></ion-input>
                    </ion-item>
                    <div style="margin-top: 4vh;"></div>
                    <ion-label style="white-space: pre-wrap;"><b>Время</b></ion-label>
                    <div style="margin-top: 2vh;"></div>
                    <ion-datetime class="datetime_rounded" presentation="time"  v-model="addEatenDateTime">
                    </ion-datetime>

                    <ion-button @click="completeAdd" style="margin-top: 3vh;" class="btn_tinypadding" color="tertiary" expand="block">Добавить</ion-button>
                </div>
            </ion-content>
            
        </ion-modal>
    </ion-page>
  </template>

  <style scoped>

  .datetime_rounded{
    border-radius: 20px;
  }

  .ionitem_margin{
    padding-left: 1vw;
    padding-right: 1vw;
    margin-left: -5vw;
    line-height: 0.7;
  }
.scroller {
  height: 100%;
}

.card-alfa {
    position: relative;
    border-radius: 25px;
    height: 20%;
    width: 100%;
    background-image: linear-gradient(-20deg, #262527 0%, #312936 100%);
    margin-top: 7%;
    margin-left: 4%;
    margin-right: 4%;
}

.suggestion-block {
    margin-top: 0 !important;
    margin-bottom: 5%;
    height: 24vh !important;
    background-color: rgba(255, 255, 255, 0.104) !important;
}

.text-a1 {
    margin-left: 4%;
    margin-right: 4%;
    text-align: left;
    position: absolute;
    white-space: normal;
    word-wrap: break-word !important;
    background-image: linear-gradient(45deg, #797973 0%, #ffffff 50%, #fbfcdb 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    bottom: 9%;
    left: 0% !important;
    font-size: 29px;
    font-weight: 500;
}
  </style>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { IonContent, IonPage, IonDatetime, IonHeader, IonToolbar, IonTitle, IonSegment, IonModal, IonButton, IonInput, IonItem } from '@ionic/vue';

  import FoodListElement from '../components/FoodListElement.vue'
  import {DynamicScroller, DynamicScrollerItem} from 'vue-virtual-scroller'

  import { ellipseOutline } from 'ionicons/icons';

  import items from "../assets/data/food.json";
  
  export default defineComponent({
    name: 'Tab3Page',
    components: { IonDatetime, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, DynamicScroller, DynamicScrollerItem, IonItem, IonSegment, IonModal, IonButton, IonInput },
    data () {
      return {
        modalState: "none",
        currentSegment: "shared",
        addEatenDateTime: "",
        addEatenPortionSize: 100,
        currentListView: "shared",
        temp_eatenelement_data: {},
        itemComponent: FoodListElement,
        shared_items: items,
        local_items: JSON.parse(localStorage.getItem("local_productsbase"))
      }
    },
    watch: {
      '$route' () {
        this.local_items = JSON.parse(localStorage.getItem("local_productsbase"))
      }
    },
    setup(){
        return{
            ellipseOutline
        }
    },
    methods: {
        async Modal_onWillDismiss(){
            this.modalState = "not";
        },
        changeListView(option){
            switch (option) {
                case "shared":
                    this.currentListView = "shared"
                    this.currentSegment = "shared"
                    break;
                case "local":
                    this.currentListView = "local"
                    this.currentSegment = "local"
                    break;
                default:
                    break;
            }
            this.modalState = "not"
        },
        selectedEatenElement(friendly_name, calories, proteins, fats, carbohydrates){
            console.log(friendly_name, calories, proteins, fats, carbohydrates)
            this.temp_eatenelement_data = {friendly_name: friendly_name, calories: calories, proteins: proteins, fats: fats, carbohydrates: carbohydrates}
            console.log(this.temp_eatenelement_data)
            this.modalState = "confirmEatenAdd"
        },
        completeAdd(){
            const d = new Date();
            const thisday = `eatinghistory_${d.getFullYear()}_${d.getMonth()}_${d.getDate()}`;
            if(!localStorage.getItem(thisday)){
                localStorage.setItem(thisday, JSON.stringify([]))
            }
            var todays_history = JSON.parse(localStorage.getItem(thisday))
            console.log("Before..", todays_history)
            var eatelement_data_byproccessing = this.temp_eatenelement_data
            var paramsList = ['calories', 'proteins', 'fats', 'carbohydrates']
            for(var i = 0; i < paramsList.length; i++){
                eatelement_data_byproccessing[paramsList[i]] = Math.round(eatelement_data_byproccessing[paramsList[i]] / 100 * this.addEatenPortionSize)
            }
            eatelement_data_byproccessing['portion'] = this.addEatenPortionSize
            eatelement_data_byproccessing['time'] = this.addEatenDateTime
            if(!this.addEatenDateTime){
                eatelement_data_byproccessing['time'] = new Date();
            }
            function makeid(length) {
                var result           = '';
                var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for ( var i = 0; i < length; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
            }
            eatelement_data_byproccessing['unique'] = makeid(32)
            todays_history.push(eatelement_data_byproccessing)
            localStorage.setItem(thisday, JSON.stringify(todays_history))
            console.log("After..", todays_history)

            this.modalState = 'none'
            this.$router.replace('home')
            
        }
    }
  });
  </script>
  