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
      marginYHorizontal: 0,
      marginXHorizontal: 0,
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

  watch: {},

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
      console.log(`${containerHeight},${containerWidth}`);
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
      }, 100), false);
    },
  },

  destroyed() {

  }

};
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
