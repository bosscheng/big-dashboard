<template>
    <div id="app">
        <dashboard></dashboard>
    </div>
</template>
<script>
    import Dashboard from './views/Dashboard';

    export default {
        name: 'App',
        components: {Dashboard}
    }
</script>

<style lang="scss">
    #app {
        height: 100%;
        width: 100%;
        position: relative;
    }
</style>
