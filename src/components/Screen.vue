<template>
  <div class="wrapper">
    <div class="container">
      <div class="dashboard-bg-image"></div>
      <div :style="marginStyle">
        <div style="position: relative;">
          <div class="dashboard-container" style="width: 1920px;height: 1080px;" :style="transformStyle">
            <div class="dashboard-bg-image2"></div>
            <div class="dashboard-bg-image2-box"></div>
            <slot></slot>
          </div>
        </div>
      </div>
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
  name: "Screen",
  data() {
    return {
      scaleX: 1,
      scaleY: 1,
      marginXHorizontal: 0,
      marginYHorizontal: 0,
    };
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
        margin: `${this.marginYHorizontal}px ${this.marginXHorizontal}px`
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
      this.marginXHorizontal = 0;
      this.marginYHorizontal = 0;
    },
    initScale() {
      this.initData();
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
      // 优先 height
      if (containerHeight < defaultHeight) {
        scale = containerHeight / defaultHeight;
        this.scaleX = scale;
        this.scaleY = scale;
      }
      // 然后 width
      else if (containerWidth < defaultWidth) {
        scale = containerWidth / defaultWidth;
        this.scaleX = scale;
        this.scaleY = scale;
      }

      let marginWidth = defaultWidth * scale;
      if (containerWidth > marginWidth) {
        marginWidth = (containerWidth - marginWidth) / 2;
        this.marginXHorizontal = marginWidth;
      }
      let marginHeight = defaultHeight * scale;
      if (containerHeight > marginHeight) {
        marginHeight = (containerHeight - marginHeight) / 2;
        this.marginYHorizontal = marginHeight;
      }
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
}

.dashboard-container {
  position: relative;
  user-select: none;
  width: 100%;
  height: 100%;
  transform-origin: 0 0;
  transition: all .3s linear;
  overflow: hidden;
}


</style>