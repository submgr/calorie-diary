<template>
<ion-page>
    <ion-header>
        <ion-toolbar>
            <ion-title>Личный список</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
        <ion-header collapse="condense">
            <ion-toolbar>
                <ion-title size="large">Личный список</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-fab slot="fixed" horizontal="end" vertical="bottom" @click="add_ownfood">
            <ion-fab-button color="success">
                <ion-icon :icon="add"></ion-icon>
            </ion-fab-button>
        </ion-fab>

        <div class="left_normalized_margin" style="margin-bottom: 10vh;">
            <p><a href="#">В этом разделе вы можете добавлять дополнительные продукты, если их нет в общей базе.</a></p>
            <ion-list class="item-background-color">
                <DynamicScroller v-if="local_items" :items="local_items" :min-item-size="100" class="scroller" keyField="code">
                    <template v-slot="{ item, index, active }">
                        <DynamicScrollerItem :item="item" :min-item-size="500" :active="active" :data-index="index">
                            <ion-item>
                                <ion-grid class="ionlist_custom">
                                    <ion-row class="ionlist_custom">
                                        <ion-col size="10">
                                            <ion-label style="margin-left: 0vw;">{{ item.friendly_name }} — {{ item.calories }}kcal,<br />{{ item.proteins }} белков, {{ item.fats }} жиров,<br />{{ item.carbohydrates }} углеводов</ion-label>
                                        </ion-col>
                                        <ion-col size="2">
                                            <ion-icon :icon="trashOutline" class="ion-iconzed" @click="deleteRow(row.unique)" style="margin-left: 0vw; font-size: 37px; color: red; opacity: 0.4; margin-top: 1vh;" />
                                        </ion-col>
                                    </ion-row>
                                </ion-grid>

                            </ion-item>
                        </DynamicScrollerItem>
                    </template>
                </DynamicScroller>
            </ion-list>

            <div v-if="!local_items" style="margin-left: 3vw; margin-top: 5vh;">
                <span>Вы еще не добавляли продукты в свой личный список для быстрого ввода.</span>
            </div>
        </div>
    </ion-content>
    <ion-modal @willDismiss="Modal_onWillDismiss" :is-open="modalState == 'addOwnFoodModal'" trigger="open-modal" :initial-breakpoint="0.85" :breakpoints="[0, 0.85]" handle-behavior="cycle">
        <ion-content class="ion-padding">
            <div class="ion-margin-top">
                <ion-label style="white-space: pre-wrap;">Укажите параметры для добавления нового элемента в ваш список продуктов.</ion-label>
                <ion-item class="custom_input">
                    <ion-label>Название</ion-label>
                    <ion-input v-model="inputData_title" placeholder="Вводите здесь"></ion-input>
                </ion-item>
                <div style="margin-top: 3vh;"></div>
                <ion-label style="white-space: pre-wrap;">Введите содержание калорий, белков, жиров и углеводов на <b><i><u>100 грамм</u></i></b> продукта:</ion-label>
                <ion-item class="custom_input">
                    <ion-label>Калории</ion-label>
                    <ion-input v-model="inputData_calories" type="number" placeholder="значение на 100 грамм"></ion-input>
                </ion-item>
                <ion-item class="custom_input lower_top_margin">
                    <ion-label>Белки</ion-label>
                    <ion-input v-model="inputData_proteins" type="number" placeholder="значение на 100 грамм"></ion-input>
                </ion-item>
                <ion-item class="custom_input lower_top_margin">
                    <ion-label>Жиры</ion-label>
                    <ion-input v-model="inputData_fats" type="number" placeholder="значение на 100 грамм"></ion-input>
                </ion-item>
                <ion-item class="custom_input lower_top_margin">
                    <ion-label>Углеводы</ion-label>
                    <ion-input v-model="inputData_carbohydrates" type="number" placeholder="значение на 100 грамм"></ion-input>
                </ion-item>
                <ion-button @click="complete_add_ownfood" style="margin-top: 3vh;" class="btn_tinypadding" color="tertiary" expand="block">Добавить</ion-button>
            </div>
        </ion-content>

    </ion-modal>
</ion-page>
</template>

<style scoped>
.item-background-color {
    margin-top: 5vh;
    margin-left: -2vw;
    margin-bottom: 2wh;
    margin-right: 2vw;
    --ion-item-background: #F4F5F7;
    border-radius: 20px;
    z-index: 2;
}

.left_normalized_margin {
    margin-left: 4vw;
}

.custom_input {
    border-radius: 15px;
    margin-top: 3vh;
}

.lower_top_margin {
    margin-top: 1vh;
}

.custom_input ion-input {
    height: 8vh;
}

@media (prefers-color-scheme: dark) {
    .item-background-color {
        --ion-item-background: #8888885a;
        opacity: 1;
    }

    .ion-iconzed {
        opacity: 1 !important;
        color: rgb(187, 112, 112) !important;
    }
}
</style>

<script lang="ts">
import {
    defineComponent
} from 'vue';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonModal,
    IonLabel,
    IonInput,
    IonIcon,
    IonFab,
    IonFabButton,
    IonList,
    IonButton,
    IonCol,
    IonGrid,
    IonItem,
    IonRow
} from '@ionic/vue';

import items from "../assets/data/food.json";

import {
    DynamicScroller,
    DynamicScrollerItem
} from 'vue-virtual-scroller'

import {
    trashOutline
} from 'ionicons/icons';

import {
    add
} from 'ionicons/icons';

export default defineComponent({
    name: 'Tab2Page',
    components: {
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonPage,
        DynamicScroller,
        DynamicScrollerItem,
        IonIcon,
        IonFab,
        IonList,
        IonButton,
        IonCol,
        IonGrid,
        IonItem,
        IonRow,
        IonFabButton,
        IonModal,
        IonLabel,
        IonInput
    },
    data() {
        return {
            local_items: JSON.parse(localStorage.getItem("local_productsbase")),
            //local_items: items,
            modalState: "not",
            inputData_title: "",
            inputData_calories: "",
            inputData_proteins: "",
            inputData_fats: "",
            inputData_carbohydrates: "",
        }
    },
    setup() {
        return {
            trashOutline,
            add
        }
    },
    methods: {
        async Modal_onWillDismiss() {
            this.modalState = "not";
        },
        add_ownfood() {
            this.modalState = "addOwnFoodModal"
        },
        complete_add_ownfood() {
            function makeid(length) {
                var result = '';
                var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for (var i = 0; i < length; i++) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
            }
            if (this.inputData_title == "") {
                this.inputData_title = "Продукт%" + makeid(4)
            }
            if (this.inputData_calories == "") {
                this.inputData_calories = "100"
            }
            if (this.inputData_proteins == "") {
                this.inputData_proteins = "10"
            }
            if (this.inputData_fats == "") {
                this.inputData_fats = "10"
            }
            if (this.inputData_carbohydrates == "") {
                this.inputData_carbohydrates = "10"
            }
            var requestObject = {
                "code": makeid(32),
                "friendly_name": this.inputData_title,
                "calories": this.inputData_calories,
                "proteins": this.inputData_proteins,
                "fats": this.inputData_fats,
                "carbohydrates": this.inputData_carbohydrates
            }

            var local_productsbase = JSON.parse(localStorage.getItem("local_productsbase"))
            local_productsbase.push(requestObject)
            localStorage.setItem("local_productsbase", JSON.stringify(local_productsbase))

            this.modalState = "not"

            this.local_items = JSON.parse(localStorage.getItem("local_productsbase"))
        }
    }
});
</script>
