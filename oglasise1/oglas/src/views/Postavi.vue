<template>
  <div class="prijavi">
    <b-container>
      <h1>Postavi oglas:</h1>
      <b-row>
        <b-col cm="6" >
          <unos_oglasa/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import unos_oglasa from "@/components/unos_oglasa";
export default {
  name: "Postavi",
  components: {unos_oglasa}
}
</script>

<style scoped>

</style>