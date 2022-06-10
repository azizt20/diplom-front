<template>
  <NavBar/>
<router-view/>
</template>

<script>
import NavBar from "@/components/NavBar";
export default {
  name: "DefaultLayout",
  components:{
    NavBar
  }
}
</script>

<style scoped>

</style>