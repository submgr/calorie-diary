<template>
    <ion-page :style="pageStyle">
    <ion-header>
      <ion-toolbar>
        
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          
        </ion-toolbar>
      </ion-header>

      <div class="floating_element" style="width:250%"><img src="../assets/images/shadow-multi.svg" ></div>
      
      <swiper :modules="modules" :effect="'coverflow'" :pagination="{ clickable: true }">
          <swiper-slide style="display: block; padding-left: 14px; padding-right: 14px;">
            <div class="slide">
              <img src="../assets/images/3d-fluency-blueberry.png" style="height: 19rem; margin-top: 2rem;" />
              <h1 style="font-weight: 700; font-size: 18px !important; color: #4A89DC; margin-top: 2rem; margin-bottom: -1.55rem !important;"></h1>
              <h2 style="font-weight: 800; font-size: 35px; color: white;">Здоровый образ жизни</h2>
              <p style="opacity: 0.6; font-size: 18px; font-weight: 500; color: #999999; line-height: 24px !important; letter-spacing: -0.8px;">
                Питание в значительной степени влияет на ваше здоровье, поэтому важно обращать на него внимание
              </p>
            </div>
          </swiper-slide>

          <swiper-slide style="display: block; padding-left: 10px; padding-right: 10px; padding-top: 0px;">
            <img src="../assets/images/sammy-bodypositive.png" style="height: 20rem; padding-top: 0px"/>
            <h1 style="font-weight: 700; font-size: 18px !important; color: #4A89DC; margin-top: 3.4rem; margin-bottom: -1.55rem !important;"></h1>
            <h2 style="font-weight: 800; font-size: 35px; color: white;">Мы вам поможем</h2>
            <p style="opacity: 0.6; font-size: 18px; font-weight: 500; color: #999999; line-height: 24px !important; letter-spacing: -0.8px;">
                Вы можете ставить себе цели в питании, например, чтобы лучше чувствовать себя во время тренировок, набрать или сбросить вес. И это просто!
            </p>
          </swiper-slide>

          <swiper-slide style="display: block; padding-left: 10px; padding-right: 10px; padding-top: 0px;">
            <img src="../assets/images/3d-fluency-today.png" style="height: 20rem; padding-top: 40px"/>
            <h1 style="font-weight: 700; font-size: 18px !important; color: #4A89DC; margin-top: 3.4rem; margin-bottom: -1.55rem !important;"></h1>
            <h2 style="font-weight: 800; font-size: 35px; color: white;">Мы вам поможем</h2>
            <p style="opacity: 0.6; font-size: 18px; font-weight: 500; color: #999999; line-height: 24px !important; letter-spacing: -0.8px;">
              Приложение создаст персонализированный план калорий, употребления белков, жиров и углеводов, согласно вашим параметрам и целям.
            </p>
          </swiper-slide>

          <swiper-slide style="display: block; padding-left: 11px; padding-right: 11px;">
            <img src="../assets/images/3d-fluency-arrow-right.png" style="height: 16rem;" />
            <h1 style="font-weight: 700; font-size: 18px !important; color: #4A89DC; margin-top: 3.3rem; margin-bottom: -1.55rem !important;"></h1>
            <h2 style="font-weight: 800; font-size: 35px; color: white;">Попробуем?</h2>
            <p style="opacity: 0.6; font-weight: 800; font-size: 15px;  color: white;"></p>
            <p style="opacity: 0.6; font-size: 18px; font-weight: 500; color: #999999; line-height: 24px !important; letter-spacing: -0.8px;">
              Начните прямо сейчас. Для этого укажите всего несколько параметров, чтобы получить персонализированные рекомендации.
            </p>
            <router-link to="/tabs/setupProfile" @click="save_state">
                <img style="height: 5.5rem; margin-top: 1.2rem" src="../assets/images/icon-yellow-gonext.svg">
            </router-link>
          </swiper-slide>
        </swiper>
      
    </ion-content>
  </ion-page>
</template>

<style scoped>
    *{
        font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Roboto, sans-serif;
    }
    .floating_element{
        display:block;
        position: fixed;
        z-index: -1;
        bottom: -100%;
        height: 160%;
        left: 30px;
    }
    .swiper-coverflow{
      height: 90%;
    }
    .swiper-pagination{
      bottom: 20px !important;
      position: relative; z-index: 4000;
    }
    .swiper-pagination-bullet {
      background: #d7fc70 !important;
    }
  </style>

<script lang="ts">
import { defineComponent } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { EffectCoverflow } from "swiper";
import { IonPage, IonHeader, IonToolbar,  IonContent } from '@ionic/vue';

import { arrowForward } from 'ionicons/icons';
import 'swiper/css';
import '@ionic/vue/css/ionic-swiper.css';
import 'swiper/css';

import "swiper/css/effect-cards";

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import "swiper/css/effect-coverflow";

export default defineComponent({
  name: 'Tab3Page',
  components: { IonHeader, IonToolbar, IonContent, IonPage, Swiper, SwiperSlide},
  props: [ 'someFunctionParent' ],
  updated () {
    const tabsEl = document.querySelector('ion-tab-bar');
    if (tabsEl) {
      tabsEl.hidden = true;
      tabsEl.style.height = "1";
    }
  },
  setup () {
    return {
      pageStyle: {
        "--ion-background-color": "#000000",
        "--ion-font-family": "Roboto"
      },
      modules: [Navigation, Pagination, Scrollbar, A11y, EffectCoverflow],
      arrowForward,
      footer: "hide"
    }
    //
  },
  methods: {
    save_state(){
      //localStorage.setItem("already_used", "yes")
    }
  }
});

</script>
