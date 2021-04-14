<template>
  <div class="container">
    <div class="dashboard-bg-image"></div>
    <div class="dashboard-container" style="width: 1920px;height: 1080px;" :style="styles">
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
  props: {
    lock: {
      type: Boolean
    },
  },
  data() {
    return {
      scaleX: 1,
      scaleY: 1,
      marginHorizontal: 0,
      title: '这是标题'
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
    styles() {
      return {
        transform: `scaleX(${this.scaleX}) scaleY(${this.scaleY}) translateX(-50%) translateY(-50%)`
      }
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
      let scaleX = 1;
      let scaleY = 1;
      //
      if (this.lock) {
        scaleX = scaleY = containerWidth / defaultWidth;
      } else {
        scaleX = containerWidth / defaultWidth;
        scaleY = containerHeight / defaultHeight;
      }

      this.scaleX = scaleX;
      this.scaleY = scaleY;
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

<style lang="scss" scoped>

.container {
  position: relative;
  background-color: rgb(3, 12, 59);
  overflow: hidden;
  width: 100%;
  height: 100vh;
  transform-origin: 0 0;
}

.dashboard-bg-image {
  width: 100%;
  height: 100vh;
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
  top: 50%;
  left: 50%;
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
