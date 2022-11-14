<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <flow-form
        v-if="renderComponent"
        ref="flowform"
        v-on:complete="onComplete"
        v-bind:language="language"
        v-bind:progressbar="false"
        v-bind:standalone="true"
      >
        <question 
          v-for="(question, index) in questions" 
          v-bind="question" 
          v-bind:key="'m' + index" 
          v-model="question.model"
        >
        </question>
        
        <!-- Custom content for the Complete/Submit screen slots in the FlowForm component -->
        <template v-slot:complete>
          <div class="f-section-wrap">
            <div v-if="quiz_status == 'inprogress'">
              <span class="fh2">Пожалуйста, подождите: приложение анализирует ваши ответы...</span>
            </div>
            <div v-if="quiz_status == 'done'">
              <div class="div_results_padding">
                <img src="../assets/images/casual-life-3d-pie-chart.png" class="quiz_upperimg"/>
                <h2 class="quiz_upperh2">Рекомендуемая цель</h2>
                <h1 class="quiz_upperh1"><i>{{metric_tdee}}</i> <span class="quiz_upperspan"><i>kcal/день</i></span></h1>
              </div>
              
              <router-link to="/tabs/main" @click="save_state">
                <ion-button color="tertiary" expand="block">Продолжить</ion-button>
              </router-link>
              
              <ion-button color="light" class="btn_tinypadding" expand="block" @click="retry">Изменить</ion-button>
            </div>
          </div>  
        </template>
        <!-- We've overriden the default "complete" slot content -->
        <template v-slot:completeButton>
          <div class="f-submit">
            <!-- Leave empty to hide default submit button -->
          </div>
        </template>
      </flow-form>
    </ion-content>
  </ion-page>
</template>

<style scoped>
*{
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Roboto, sans-serif;
}
.btn_tinypadding{
  margin-top: 2vh;
}
.quiz_upperh2{
  margin-top: 5vh;
  margin-left: 0.4vh;
  font-size: 3.5vh !important;
  font-weight: 600;
}

.quiz_upperh1{
  margin-top: -2vh;
  margin-left: -0.2vh;
  color: rgba(111, 5, 120, 0.447);
  font-size: 8vh !important;
  font-weight: 800;
}

.quiz_upperspan{
  margin-left: -2vw;
  font-size: 3.4vh !important;
  font-weight: 700;
}
.div_results_padding{
  margin-left: 2vw;
}
.quiz_upperimg{
  height: 30vh;
}
.vff ul.f-radios li {
  border-radius: 20px !important;
}

@media (prefers-color-scheme: dark) {
  .quiz_upperh1{
    color: rgba(219, 164, 224, 0.799);
  }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import { FlowForm, Question, QuestionModel, QuestionType, ChoiceOption, LanguageModel } from '@ditdot-dev/vue-flow-form'

import { IonButton } from '@ionic/vue';

export default  defineComponent({
  name: 'Tab1Page',
  components: { IonContent, IonPage, FlowForm, Question,IonButton },
  data() {
    return {
      renderComponent: true,
      quiz_questions_holdvar: "",
      quiz_status: "inprogress",
      finalScore: 0,
      metric_tdee: 0,
      loading: false,
      completed: false,
      language: new LanguageModel(),
      questions: [
        {
          type: 'multiplechoice',
          id: 'gender',
          title: 'Ваш пол',
          multiple: false,
          required: true,
          helpTextShow: false,
          options: [
            {
              label: 'Мужской',
              value: 'male'
            },
            {
              label: 'Женский',
              value: 'female'
            },
            {
              label: 'Другое',
              value: 'other'
            }
          ],
          model: "",
        },
        {
          type: 'text',
          id: 'name',
          title: 'Ваше имя',
          multiple: false,
          required: true,
          helpTextShow: false,
          model: "",
        },
        {
          type: 'number',
          id: 'age',
          title: 'Ваш возраст',
          multiple: false,
          min: 1,
          max: 150,
          required: true,
          helpTextShow: false,
          model: "",
        },
        {
          type: 'number',
          id: 'weight',
          title: 'Ваш вес',
          min: 1,
          max: 599,
          subtitle: "килограммы",
          multiple: false,
          required: true,
          helpTextShow: false,
          model: "",
        },
        {
          type: 'number',
          id: 'height',
          title: 'Ваш рост',
          min: 50,
          max: 250,
          subtitle: "сантиметры",
          multiple: false,
          required: true,
          helpTextShow: false,
          model: "",
        },
        {
          type: 'multiplechoice',
          id: 'activitylevel',
          title: 'Ваш уровень активности',
          multiple: false,
          required: true,
          helpTextShow: false,
          options: [
            {
              label: 'Малоподвижный',
              value: 'lowactive'
            },
            {
              label: 'Легкая физ. нагрузка',
              value: 'lowphysactivity'
            },
            {
              label: 'Умеренная физ. нагрузка',
              value: 'moderatephysactivity'
            },
            {
              label: 'Очень активный',
              value: 'veryactive'
            }
          ],
          model: "",
        },
        {
          type: 'multiplechoice',
          id: 'yourtarget',
          title: 'Желаемый вес',
          multiple: false,
          required: true,
          helpTextShow: false,
          options: [
            {
              label: 'Потеря веса',
              value: 'lowactive'
            },
            {
              label: 'Поддержание',
              value: 'lowphysactivity'
            },
            {
              label: 'Набор веса',
              value: 'moderatephysactivity'
            }
          ],
          model: "",
        },
      ]
    }
  },
  methods: {
    /* eslint-disable-next-line no-unused-vars */
    onComplete(completed, questionList) {
      // This method is called whenever the "completed" status is changed.
      this.completed = completed
      // Set `submitted` to true so the form knows not to allow back/forward
      // navigation anymore.
      //!!! this.$refs.flowform.submitted = true
      this.onSendData()
    },
    
    onSendData() {
      // eslint-disable-next-line
      const self = this
      const data = this.getData()

      this.quiz_status = "done";
      this.loading = true
      
      /*
        You can use Fetch API to send the data to your server, eg.:
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
      */
      setTimeout(() => {
        self.loading = false
      }, 1500)
    },
    getData() {
      var questions = {}
  
      this.questions.forEach(question => {
        questions[question.id] = question.model
      })

      //alert(JSON.stringify(questions))

      var metric_bmr = 0;

      switch (questions['gender']) {
        case "male":
          metric_bmr = 10 * questions['weight'] + 6.25 * questions['height'] - 5 * questions['age'] - 161
          break;
        case "female":
          metric_bmr = 10 * questions['weight'] + 6.25 * questions['height'] - 5 * questions['age'] + 5
          break;
        case "other":
          metric_bmr = 10 * questions['weight'] + 6.25 * questions['height'] - 5 * questions['age'] - 80
          break;
        default:
          alert("Critical issue: WRONG_GENDER")
          break;
      }

      var activity_multiplier = 0;
      switch (questions['activitylevel']) {
        case "lowactive":
          activity_multiplier = 1.2;
          break;
        case "lowphysactivity":
          activity_multiplier = 1.45;
          break;
        case "moderatephysactivity":
          activity_multiplier = 1.65;
          break;
        case "veryactive":
          activity_multiplier = 2.05;
          break;
        default:
          alert("Critical issue: WRONG_(activitylevel)")
          break;
      }

      var metric_tdee = metric_bmr * activity_multiplier;
      this.metric_tdee = Math.round(metric_tdee);

      questions['metric_bmr'] = metric_bmr;
      questions['metric_tdee'] = metric_tdee;
      
      this.quiz_questions_holdvar = JSON.stringify(questions)
  
      return questions
    },
    goNext(event) {
      console.log("Going home!", event)
      this.$router.push({path:'/tabs/hello', replace: true});
    },
    save_state(){
      localStorage.setItem("local_productsbase", JSON.stringify([]))
      localStorage.setItem("local_userdata", this.quiz_questions_holdvar)
    },
    async retry(){
      this.renderComponent = false;

      // Wait for the change to get flushed to the DOM
      await this.$nextTick();

      // Add the component back in
      this.renderComponent = true;
    }
  },
  mounted(){
    const tabsEl = document.querySelector('ion-tab-bar');
    if (tabsEl) {
      tabsEl.hidden = true;
      tabsEl.style.height = "1";
    }
  }
});
</script>

<style>
/* Import Vue Flow Form base CSS */
@import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.css';
/* Import one of the Vue Flow Form CSS themes (optional) */
/* @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-minimal.css'; */
/* @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-green.css'; */
@import '../assets/css/quiz-flow.css';
</style>