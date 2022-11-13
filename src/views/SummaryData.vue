<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Результаты</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Результаты</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-segment color="primary" :value="current_segment" style="margin-top: 3vh; margin-bottom: 1vh; margin-left: 3vw; width: 94%; margin-right: 3vw;">
                <ion-segment-button value="weekly" @click="changeChartView('weekly')">
                    <ion-label>Неделя</ion-label>
                </ion-segment-button>
                <ion-segment-button value="monthly" @click="changeChartView('monthly')">
                    <ion-label>Месяц</ion-label>
                </ion-segment-button>
            </ion-segment>
      
      <div v-if="current_segment == 'weekly'">
        <apexchart
          type="area"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
      <div v-if="current_segment == 'monthly'">
        <apexchart
          type="area"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSegment } from '@ionic/vue';
//yimport ExploreContainer from '@/components/ExploreContainer.vue';

import VueApexCharts from "vue3-apexcharts";

export default defineComponent({
  name: 'Tab3Page',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonSegment,
    apexchart: VueApexCharts },
  data: function() {
    return {
      current_segment: "weekly",
      chartOptions: {
        stroke: {
          curve: 'smooth'
        },
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          type: "string",
          categories: [],
        },
      },
      series: [
        {
          name: "series-1",
          data: [0],
        },
      ],
    };
  },
  methods: {
    changeChartView(newChartView){
      switch (newChartView) {
        case "weekly":
          this.current_segment = "weekly"
          this.chartOptions = {
              stroke: {
                curve: 'smooth'
              },
              chart: {
                id: "vuechart-example",
              },
              xaxis: {
                type: "string",
                categories: ["ПН","ВТ","СР","ЧТ","ПТ","СБ","ВС"],
              },
            }
            this.series =[
              {
                name: "series-1",
                data: [0.5, 0.9, 0.4, 1.2, 0.7, 1.7, 0.9],
              },
            ]
          break;
        case "monthly":
          this.current_segment = "monthly"
          break;
        default:
          break;
      }
    }
  },
  mounted(){
    this.changeChartView("weekly");
  }
});
</script>
