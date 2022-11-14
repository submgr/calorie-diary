<template>
<ion-page>
    <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom">
            <ion-tab-button tab="tab1" href="/tabs/ownFoodList">
                <ion-icon :icon="bookmarksOutline" />
                <ion-label>Мой каталог</ion-label>
            </ion-tab-button>

            <ion-tab-button tab="tab2" href="/tabs/home">
                <ion-icon :icon="happyOutline" />
                <ion-label>Сегодня</ion-label>
            </ion-tab-button>

            <ion-tab-button tab="tab3" href="/tabs/summaryData">
                <ion-icon :icon="sparklesOutline" />
                <ion-label>Результаты</ion-label>
            </ion-tab-button>
        </ion-tab-bar>
    </ion-tabs>
</ion-page>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue';
import {
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonLabel,
    IonIcon,
    IonPage,
    IonRouterOutlet
} from '@ionic/vue';
import {
    ellipse,
    square,
    triangle,
    bookmarksOutline,
    happyOutline,
    sparklesOutline
} from 'ionicons/icons';

export default defineComponent({
    name: 'TabsPage',
    components: {
        IonLabel,
        IonTabs,
        IonTabBar,
        IonTabButton,
        IonIcon,
        IonPage,
        IonRouterOutlet
    },
    setup() {
        return {
            ellipse,
            square,
            triangle,
            bookmarksOutline,
            happyOutline,
            sparklesOutline
        }
    }
});
</script>
