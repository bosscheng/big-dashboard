<template>
  <div class="wrap">
    <router-link to="/demo1" class="item">以1920等比例缩放</router-link>
    <br>
    <router-link to="/demo2" class="item">占满全屏</router-link>
    <br>
    <router-link to="/demo3" class="item">根据屏幕等比例缩放</router-link>

  </div>
</template>

<script>
export default {
  name: "demo"
}
</script>

<style scoped>
.wrap {
  position: relative;
  width: 300px;
  height: 300px;
  margin: 0 auto;
  top: 50%
}

.item{
  font-size: 20px;
  margin: 0 20px;
}
</style>