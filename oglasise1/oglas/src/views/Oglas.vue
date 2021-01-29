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
          <p class="card-text">
            <b>datum postavljanja:</b>
            {{oglas.datumDodavanja.substring(0,10)}}
          </p>
          <p class="card-text">
            <b>korisnik:</b>
            {{users.find(element => element.id == oglas.korisnik_id).first_name }}
            {{users.find(element => element.id == oglas.korisnik_id).last_name}}
          </p>
          <p class="card-text">
            <b>kontakt:</b>
            {{users.find(element => element.id == oglas.korisnik_id).email }}
          </p>
        </b-card>
      </b-col>
    </b-row>
    <h1>Komentari:</h1>
    <b-row>

      <b-card-group class="col-md-12" v-for="komentar in komentari.filter(element => element.oglas_id == oglas.id)" :key="komentar.id" style="padding-bottom: 5px; text-align: left" >
        <b-card >
          <p class="card-text">
            <b-row>
            <b-col cols="11" style="alignment: center">
              <b>Ocena:</b>
              {{komentar.ocena}}
              <b>Komentar:</b>
              {{komentar.tekst}}
            </b-col>
            <b-col cols="1" >
              <b-button v-if="curent_user == komentar.korisnik_id" style="width: 75px;"  variant="dark" @click="del(komentar)" block>Delete</b-button>
            </b-col>
            </b-row>

          </p>


        </b-card>
      </b-card-group>

    </b-row>
    <b-row v-if="curent_user != oglas.korisnik_id">
      <unos_komentara :oglas="oglas"/>
    </b-row>



  </b-container>

</template>

<script>

  import {mapState, mapActions} from 'vuex';
  import unos_komentara from "@/components/unos_komentara";
  //import router from "@/router";
  export default {
    name: "Oglas",
    components: {
      unos_komentara,
    },
    data() {
      return {
        edit: false
      }
    },
    computed:{
      ...mapState(['oglasi', 'kategorije', 'komentari', 'curent_user', 'users' ]),

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
      ...mapActions(['delete_komentar']),
      del: function (item) {
        this.delete_komentar(item.id)
      }

    }

  }

</script>

<style scoped>

</style>