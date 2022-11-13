<template>
<div style="flex: 1;
  border: 2px solid blueviolet;
  margin: 10px; width: 40%">
    <div class="card-alfa custom-swiper bg-i1 suggestion-block bg-2" style="margin-left: 0% !important; margin-right: 0% !important;">
    <div style="text-align: center;">
        <img style="height: 100%; text-align: center; border-radius: 25px;" :src="source.image_src" />
    </div>
    <div class="suggestion-text-wrapper">
        <div class="text-a1 suggestion-text">{{ source.friendly_name }}</div>
    </div>
</div>
</div>
</template>

  
<style>
.card-alfa {
    position: relative;
    border-radius: 25px;
    height: 20%;
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

  
<script>
export default {
    name: 'item-component',
    props: {
        index: { // index of current item
            type: Number
        },
        source: { // here is: {uid: 'unique_1', text: 'abc'}
            type: Object,
            default () {
                return {}
            }
        }
    }
}
</script>
