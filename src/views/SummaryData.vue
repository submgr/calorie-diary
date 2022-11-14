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
        <div style="margin-left: 8vw; margin-top: 5vh; margin-right: 8vw;">
          <ion-label>За последние 7 дней среднее дневное потребление составило {{averageConsumationByPeriodAverage_calories}} калорий.</ion-label>
        </div>
      </div>
      <div v-if="current_segment == 'monthly'">
        <div v-if="requestedTable_isAvailable == 'yes'">
          <apexchart
            type="area"
            :options="chartOptions"
            :series="series"
          ></apexchart>
          <div style="margin-left: 8vw; margin-top: 5vh; margin-right: 8vw;">
            <ion-label>За последние 30 дней среднее дневное потребление составило {{averageConsumationByPeriodAverage_calories}} калорий.</ion-label>
          </div>
        </div>
      </div>
      <div v-if="requestedTable_isAvailable == 'not'" style="margin-left: 8vw; margin-top: 5vh; margin-right: 8vw;">
        <ion-label>Недостаточно данных для отображения этого графика. Продолжайте пользоваться приложением, чтобы в ближайшем времени увидеть здесь статистику.</ion-label>
      </div>
      


    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton } from '@ionic/vue';
//yimport ExploreContainer from '@/components/ExploreContainer.vue';


import VueApexCharts from "vue3-apexcharts";

export default defineComponent({
  name: 'Tab3Page',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonSegment, IonSegmentButton,
    apexchart: VueApexCharts },
  data: function() {
    return {
      requestedTable_isAvailable: "yes",
      current_segment: "weekly",
      averageConsumationByPeriodAverage_calories: 0,
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
        yaxis: {
          tickAmount: 1
        }
      },
      series: [
        {
          name: "series-1",
          data: [0],
        },
      ],
    };
  },
  watch: {
    '$route' () {
      this.changeChartView("weekly");
    }
  },
  methods: {
    changeChartView(newChartView){
      var todaysDate = new Date();
      var weekday = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
      var todaysDate_dayOfWeek = todaysDate.getDay();
      function getWeekDay(position = 0){
        var weeks = Math.floor(position / 7)
        var position_renewed = position - (weeks * 7)
        return weekday[position_renewed]
      }
      function getMonthDay(position = 0){
        const daysAgo = new Date(new Date().getTime());
        daysAgo.setDate(new Date().getDate() - position);
        return daysAgo.getDate()
      }
      function getDateOffset(position = 0){
        position *= -1;
        
        const daysAgo = new Date(new Date().getTime());

        daysAgo.setDate(new Date().getDate() - position);
        const thisday = `eatinghistory_${daysAgo.getFullYear()}_${daysAgo.getMonth()}_${daysAgo.getDate()}`;
        return {
          datetag: thisday
        }
      }
      function getUserPrfomanceByDate(position = 0){
        var dateOffset = getDateOffset(position);

        var thisday_calories = 0;
        var thisday_proteins = 0;
        var thisday_fats = 0;
        var thisday_carbohydrates = 0;

        var historyByDate = JSON.parse(localStorage.getItem(dateOffset.datetag))
        if(historyByDate != "" && historyByDate != null){
          for(var i = 0; i < historyByDate.length; i++){
            thisday_calories += historyByDate[i].calories;
            thisday_proteins += historyByDate[i].proteins;
            thisday_fats += historyByDate[i].fats;
            thisday_carbohydrates += historyByDate[i].carbohydrates;
          }
        }
        

        return {
          calories: thisday_calories,
          proteins: thisday_proteins,
          fats: thisday_fats,
          carbohydrates: thisday_carbohydrates
        }
      }
      function buildArrayToChart(range, categories = "weekdays", hideFor = 0){
        var object = {
          categories: [],
          data: []
        }
        var marker = 0;
        for(var i = range * -1 + 1; i <= 0; i++){
          if(categories == "weekdays"){
            object.categories.push(getWeekDay(i))
          }else if(categories == "monthdays"){
            if(marker > 1){
              i += hideFor;
            }
            object.categories.push(getMonthDay(i * -1))
          }
          object.data.push(getUserPrfomanceByDate(i).calories)
          marker += 1;
        }
        return object;
      }
      switch (newChartView) {
        case "weekly":
          this.current_segment = "weekly"

          this.averageConsumationByPeriodAverage_calories = 0;

          var dataForChart_weekly = buildArrayToChart(7);
          //alert(JSON.stringify(dataForChart))

          for(var i = 0; i < dataForChart_weekly.data.length; i++){
            this.averageConsumationByPeriodAverage_calories += dataForChart_weekly.data[i]
          }

          this.averageConsumationByPeriodAverage_calories = Math.round(this.averageConsumationByPeriodAverage_calories / dataForChart_weekly.data.length);
          
          this.chartOptions = {
              stroke: {
                curve: 'smooth'
              },
              chart: {
                id: "vuechart-example",
                
              },
              xaxis: {
                type: "string",
                categories: dataForChart_weekly.categories,
              },
              yaxis: {
                tickAmount: 1
              }
            }
            this.series =[
              {
                name: "series-1",
                data: dataForChart_weekly.data,
              },
            ]
          break;
        case "monthly":
          //this.requestedTable_isAvailable = "not"

          this.averageConsumationByPeriodAverage_calories = 0;

          this.current_segment = "monthly"

          var dataForChart_monthly = buildArrayToChart(30, "monthdays", 3);
          //alert(JSON.stringify(dataForChart))

          for(var k = 0; k < dataForChart_monthly.data.length; k++){
            this.averageConsumationByPeriodAverage_calories += dataForChart_monthly.data[k]
          }

          this.averageConsumationByPeriodAverage_calories = Math.round(this.averageConsumationByPeriodAverage_calories / dataForChart_monthly.data.length);
          
          this.chartOptions = {
            stroke: {
              curve: 'smooth'
            },
            chart: {
              id: "vuechart-example"
            },
            xaxis: {
              type: "string",
              categories: dataForChart_monthly.categories,
            },
            yaxis: {
              tickAmount: 5
            }
          }
          this.series =[
            {
              name: "series-1",
              data: dataForChart_monthly.data,
            },
          ]

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
