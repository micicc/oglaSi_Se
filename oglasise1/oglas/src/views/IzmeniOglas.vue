<template>
  <div>
    <h1>Izmena oglasa</h1>
    <unos_oglasa :oglas="oglasX"/>
  </div>
</template>

<script>
import unos_oglasa from "@/components/unos_oglasa";
import {mapState} from 'vuex';

  export default {
    name: "IzmeniOglas",
    components:{
      unos_oglasa
    },
    data() {
      return {
        edit: false
      }
    },
    computed:{
      ...mapState(['oglasi']),
      oglasX: function (){
        for (let i = 0; i < this.oglasi.length; i++)
          if (this.oglasi[i].id === parseInt(this.$route.params.id))
            return this.oglasi[i];
        return null;
      }
    }



  }

</script>

<style scoped>

</style>