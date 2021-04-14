<template>
  <div class="wrap">
    <router-link to="/demo1" class="item">demo1</router-link>
    <router-link to="/demo2" class="item">demo2</router-link>
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