<template>
  <screen2>
    <top-title :title.sync="title"></top-title>
    <!-- left -->
    <dashboard1></dashboard1>
    <!-- right -->
    <dashboard2></dashboard2>
    <!-- right -->
    <dashboard3></dashboard3>
    <!-- right -->
    <dashboard4></dashboard4>
  </screen2>
</template>

<script>
import TopTitle from '../components/TopTitle';
import Screen2 from "../components/Screen2";
import Dashboard1 from '../components/Dashboard1';
import Dashboard2 from '../components/Dashboard2';
import Dashboard3 from '../components/Dashboard3';
import Dashboard4 from '../components/Dashboard4';

export default {
  name: "Dashboard",

  components: {
    TopTitle,
    Dashboard1,
    Dashboard2,
    Dashboard3,
    Dashboard4,
    Screen2
  },
  data(){
    return{
      title:'xxx'
    }
  },
  created() {

  },
  mounted() {
  },

  watch: {},

  methods: {
  },

  destroyed() {

  }

};
</script>
