<template>
  <div class="container">
    <div class="dashboard-bg-image"></div>
    <div class="dashboard-container" style="width: 1920px;height: 1080px;" :style="transformStyle">
      <div class="dashboard-bg-image2"></div>
      <div class="dashboard-bg-image2-box"></div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {getComputedStyle} from "@/utils";
import {debounce} from "lodash";

/**
 * Date: 7/7/20
 */

export default {
  name: "Screen2",
  data() {
    return {
      scaleX: 1,
      scaleY: 1,
    };
  },
  props: {
    lock: {
      type: Boolean,
      default: false
    }

  },
  mounted() {
    this.init();
  },
  computed: {
    transformStyle: function () {
      return {
        transform: `scaleX(${this.scaleX}) scaleY(${this.scaleY}) translateX(-50%) translateY(-50%)`
      };
    }
  },
  methods: {
    init() {
      this.listenResize();
    },
    initData() {
      this.scaleX = 1;
      this.scaleY = 1;
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
    }
  },

  destroyed() {
  }
}

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
}

.dashboard-container {
  position: relative;
  user-select: none;
  width: 100%;
  height: 100%;
  transform-origin: 0 0;
  transition: all .3s linear;
  overflow: hidden;
  top: 50%;
  left: 50%;
}
</style>