<template>
    <div class="wrapper">
        <div class="container">
            <div class="dashboard-bg-image"></div>
            <div :style="marginStyle">
                <div style="position: relative;">
                    <div class="dashboard-container" style="width: 1920px;height: 1080px;" :style="transformStyle">
                        <top-title :title.sync="title"></top-title>
                        <!-- left -->
                        <dashboard1></dashboard1>
                        <!-- right -->
                        <dashboard2></dashboard2>
                        <!-- right -->
                        <dashboard3></dashboard3>
                        <!-- right -->
                        <dashboard4></dashboard4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TopTitle from '../components/TopTitle';
    import {getComputedStyle} from "../utils";
    import {debounce} from "lodash";
    import Dashboard1 from '../components/Dashboard1';
    import Dashboard2 from '../components/Dashboard2';
    import Dashboard3 from '../components/Dashboard3';
    import Dashboard4 from '../components/Dashboard4';

    export default {
        name: "Dashboard",
        data() {
            return {
                scaleX: 1,
                scaleY: 1,
                marginHorizontal: 0,
                title:'这是标题'
            };
        },
        components: {
            TopTitle,
            Dashboard1,
            Dashboard2,
            Dashboard3,
            Dashboard4
        },
        created() {

        },
        mounted() {
            this.init();
        },
        computed: {
            transformStyle: function () {
                return {
                    transform: `scale(${this.scaleX}, ${this.scaleY})`
                };
            },
            marginStyle: function () {
                return {
                    margin: `0px ${this.marginHorizontal}px`
                };
            }
        },

        watch: {},

        methods: {
            init() {
                this.listenResize();
            },
            initScale() {
                let $container = document.querySelector('.container');
                let containerWidth = getComputedStyle($container, 'width').replace("px", "");
                let containerHeight = getComputedStyle($container, 'height').replace("px", "");
                containerWidth = Number(containerWidth);
                containerHeight = Number(containerHeight);
                containerWidth = isNaN(containerWidth) ? 0 : containerWidth;
                containerHeight = isNaN(containerHeight) ? 0 : containerHeight;

                let defaultHeight = 1080;
                let defaultWidth = 1920;
                // sacle 缩放比例。
                let scale = 1;
                if (containerHeight < defaultHeight) {
                    scale = containerHeight / defaultHeight;
                }

                this.scaleX = scale;
                this.scaleY = scale;

                let marginWidth = defaultWidth * scale;
                //
                this.marginHorizontal = 0;
                if (containerWidth > marginWidth) {
                    marginWidth = (containerWidth - marginWidth) / 2;
                    this.marginHorizontal = marginWidth;
                }
            },
            listenResize() {
                this.initScale();
                window.addEventListener('resize', debounce(() => {
                    this.initScale();
                }, 300));
            },
        },

        destroyed() {

        }

    };
</script>

<style lang="scss">

    .wrapper {
        height: 100%;
        width: 100%;
        position: relative;
    }

    .container {
        background-color: rgb(3, 12, 59);
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }


    .dashboard-bg-image {
        width: 100%;
        height: 100%;
        position: absolute;
        background: url('../assets/bg2.jpg');
    }

    .dashboard-container {
        position: relative;
        user-select: none;
        width: 100%;
        height: 100%;
        transform-origin: 0 0;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, .5);
        transition: all .3s linear;
        overflow: hidden;
    }

    .dashboard-error {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        .dashboard-error-inner {
            color: #fff;
            font-size: 32px;
        }
    }


</style>
