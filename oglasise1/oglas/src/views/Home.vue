<template>
  <div class="home">
    <b-container>
      <h1>Svi oglasi:</h1>
      <b-row>
        <b-col cm="6" >
          <kartice/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

  import kartice from "@/components/kartice";

  export default {
    name: "Home",
    components: {
          kartice,
      }
  }

</script>

<style scoped>

</style>