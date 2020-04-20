<template>
    <div class="title"><span class="left-z"></span>{{title}} <span class="right-z"></span></div>
</template>

<script>
    export default {
        name: "TopTitle",
        props: ['title'],
    };
</script>

<style scoped lang="scss">
    .title {
        text-align: center;
        font-size: 36px;
        color: #ffffff;
        line-height: 47px;
        margin-top: 20px;
        position: relative;
    }

    .left-z {
        position: absolute;
        width: 528px;
        height: 25px;
        background: url("../assets/left-z.png") no-repeat center;
        background-size: 100% 100%;
        top: 20px;
        left: 49px;
    }

    .right-z {
        position: absolute;
        width: 528px;
        height: 25px;
        background: url("../assets/right-z.png") no-repeat center;
        background-size: 100% 100%;
        top: 20px;
        right: 49px;
    }
</style>
