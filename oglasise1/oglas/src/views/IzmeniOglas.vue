<template>
  <div>
    <h1>Izmena oglasa</h1>
    <unos_oglasa :oglas="oglasX"/>
  </div>
</template>

<script>
import unos_oglasa from "@/components/unos_oglasa";
import {mapState} from 'vuex';
import router from "@/router";

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
      ...mapState(['oglasi','curent_user']),

      oglasX: function (){

        for (let i = 0; i < this.oglasi.length; i++)
          if (this.oglasi[i].id === parseInt(this.$route.params.id))
            if(this.oglasi[i].korisnik_id == this.curent_user){
              return this.oglasi[i];
            }else{
              alert("Nemate dozvolu za edit ovog oglasa!");
              router.push({path: `/moji_oglasi`})
            }

        return null;
      }
    }



  }

</script>

<style scoped>

</style>