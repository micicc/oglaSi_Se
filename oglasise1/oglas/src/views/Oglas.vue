<template>

  <b-container >
    <h1>Detalji oglasa:</h1>
    <b-row align-h="center" style="max-height: fit-content" >
      <b-col lg="12">
        <b-card  img-src="https://i.imgur.com/R8Cjc1B.png" img-alt="Card image" img-right style="padding-bottom: 20px; text-align: left">
          <p class="card-text">
            <b><h1>{{oglas.naslov}}</h1></b>

          </p>
          <p class="card-text">
            <b>kategorija:</b>
            {{kategorije.find(element => element.id == oglas.kategorija_id).naziv}}
          </p>
          <p class="card-text">
            <b>mesto:</b>
            {{oglas.mesto}}
          </p>
          <p class="card-text">
            <b>opis:</b>
            {{oglas.opis}}
          </p>
        </b-card>
      </b-col>
    </b-row>
    <h1>Komentari:</h1>
    <b-row>

      <b-card-group class="col-md-12" v-for="komentar in komentari.filter(element => element.oglas_id == oglas.id)" :key="komentar.id" style="padding-bottom: 5px; text-align: left" >
        <b-card >
          <p class="card-text">
            <b>Ocena:</b>
            {{komentar.ocena}}
            <b>Komentar:</b>
            {{komentar.tekst}}
          </p>

        </b-card>
      </b-card-group>
    </b-row>



  </b-container>

</template>

<script>

  import {mapState} from 'vuex';

  //import router from "@/router";
  export default {
    name: "Oglas",
    components: {

    },
    data() {
      return {
        edit: false
      }
    },
    computed:{
      ...mapState(['oglasi', 'kategorije', 'komentari']),

      oglas: function (){
        for (let i = 0; i < this.oglasi.length; i++){
          if (this.oglasi[i].id === parseInt(this.$route.params.id)){
            return  this.oglasi[i];
          }
        }
        return null;
      }
    },
    methods: {

    }

  }

</script>

<style scoped>

</style>