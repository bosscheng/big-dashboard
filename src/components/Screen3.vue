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
  name: "Screen3",
  data() {
    return {
      scaleX: 1,
      scaleY: 1,
      marginHorizontal: 0,
    };
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
  mounted() {
    this.init();
  },
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
    }
  },

  destroyed() {
    this.stopTimeout();
    this.stopTimeout2();
    this.stopTimeout3();
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