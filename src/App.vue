<template>
  <div id="app">
    <todo></todo>
  </div>
</template>

<script>
import todo from "@/components/todo";

export default {
  name: 'app',
  components: {
    todo
  }
}
</script>
<style>

  #app{
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: hidden;
  }


</style>
