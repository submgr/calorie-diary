<template>
    <div id="container">
      <div v-if="data_list_final.length == 0">
        <div style="margin-top: 10vh"></div>
        <strong>Пока пусто!</strong>
        <p>Пора начать этот прекрасный день,<br/><a href="#">начните с первого съеденного продукта,</a><br/>для добавления используйте "+"</p>
      </div>
      <div v-if="data_list_final.length > 0" style="margin-top: 0vh !important;">
        <strong>Сегодня вы съели...</strong>
        <div class="ionlist_custom ionlist_custom_top">
          <ion-list style="margin-top: 2vh;" class="item-background-color">
            <ion-item v-for="row in data_list_final" :key="row.code" >
              <ion-grid class="ionlist_custom">
                <ion-row class="ionlist_custom">
                  <ion-col size="9">
                    <ion-label>{{ row.friendly_name }} — <i>{{new Date(row.time).getHours()}}:{{('0'+ new Date(row.time).getMinutes()).slice(-2)}}</i><br/>{{ row.calories }}kcal, {{ row.proteins }} белков,<br/>{{ row.fats }} жиров, {{ row.carbohydrates }} углеводов</ion-label>
                  </ion-col>
                  <ion-col size="2"><ion-icon :icon="trashOutline" @click="deleteRow(row.unique)" style="margin-left: 2vw; font-size: 37px; color: red; opacity: 0.4; margin-top: 1vh;" /></ion-col>
                </ion-row>
              </ion-grid>
            </ion-item>
          </ion-list>
        </div>
        
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';

  import { IonList, IonItem, IonLabel, IonGrid, IonRow, IonCol,IonIcon } from '@ionic/vue';

  import { trashOutline } from 'ionicons/icons';
  
  export default defineComponent({
    name: 'EatenList',
    components: {IonList, IonItem, IonLabel, IonGrid, IonRow, IonCol, IonIcon},
    props: {
      data_list: Array,
      localstorage_datacode: String
    },
    data(){
      return{
        data_list_final: []
      }
    },
    setup() {
      return {
        trashOutline
      }
    },
    methods: {
      deleteRow(unique){
        this.data_list_final = this.data_list_final.filter(function( obj: any ) {
          return obj["unique"] !== unique;
        });
        localStorage.setItem(this.localstorage_datacode + "", JSON.stringify(this.data_list_final))
        console.log("After update...", this.data_list_final)
      },
      serviceJob_loadDataList(){
        var userdata = JSON.parse(localStorage.getItem("local_userdata"))
        console.log(userdata)
        const thisday = `eatinghistory_${new Date().getFullYear()}_${new Date().getMonth()}_${new Date().getDate()}`;
        if(!localStorage.getItem(thisday)){
          localStorage.setItem(thisday, JSON.stringify([]))
        }
        this.data_list_final = JSON.parse(localStorage.getItem(thisday))
        console.log("Mounted/component", this.data_list_final)
        //alert(JSON.stringify(this.data_list_final))
      }
    },
    watch: {
      '$route' () {
        this.serviceJob_loadDataList();
      }
    },
    mounted(){
      this.serviceJob_loadDataList();
    }
  });
  </script>
  
  <style scoped>
.item-background-color{
  margin-left: 2vw;
  margin-bottom: 2wh;
  margin-right: 2vw;
    --ion-item-background:#F4F5F7;
    border-radius: 20px;
  }

  #container {
    text-align: center;
    position: static;
    left: 0;
    right: 0;
    padding-bottom: 10vh;
  }
  
  #container strong {
    font-size: 20px;
    line-height: 26px;
  }
  
  #container p {
    font-size: 16px;
    line-height: 22px;
    color: #8c8c8c;
    margin: 0;
  }
  
  #container a {
    text-decoration: none;
  }

  @media (prefers-color-scheme: dark) {
  .item-background-color{
    --ion-item-background:#8888885a;
  }

  ion-icon{
    opacity: 1 !important;
    color:rgb(187, 112, 112) !important;
  }
}
  </style>
  