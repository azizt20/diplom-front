<template>
    <NavBar/>
    <router-view/>
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
  name: "NavLayout",
  components: {NavBar}
}
</script>

<style scoped>

</style>