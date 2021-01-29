<template>
<div>
  <b-container>
    <h1>Moji oglasi</h1>
    <b-row align-h="center" style="max-height: fit-content" >
      <b-col lg="12" style="padding-bottom: 20px">
        <b-card v-for="oglas in oglasi.filter(el => el.korisnik_id == curent_user )" :key="oglas.id" style="padding-bottom: 40px; text-align: left">
          <b-row>
            <b-col lg="10">
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
            </b-col>
            <b-col style="padding-right: 20px">
              <b-row style="margin-bottom: 10px">
                <b-btn variant="primary" @click="detalji(oglas)" block>Details</b-btn>
              </b-row>
              <b-row style="margin-bottom: 10px">
                <b-btn  variant="warning" @click="edit(oglas)" block>Edit</b-btn>
              </b-row>
              <b-row>
                <b-button  variant="dark" @click="del(oglas)" block>Delete</b-button>
              </b-row>

            </b-col>
          </b-row>

        </b-card>
      </b-col>
    </b-row>

  </b-container>

</div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import router from "@/router";

  export default {
    name: "MojiOglasi",
    computed:{
      ...mapState(['oglasi', 'kategorije', 'curent_user', 'komentari' ])
    },
    data(){
      return{

      }
    },
    methods:{
      ...mapActions(['delete_oglas', 'delete_komentar','load_komentari']),
      detalji: function (item) {
        router.push({path: `/oglas/${item.id}`})
      },
      edit: function (item) {
        router.push({path: `/edit_oglas/${item.id}`})
      },
      del: function (item) {
        var a = this.komentari.filter(el => el.oglas_id == item.id );
        for ( const i in a){
          console.log(a[i].id)
          this.delete_komentar(a[i].id)
        }
        this.load_komentari();
        this.delete_oglas(item.id)
      }
    }



  }

</script>


<style scoped>

</style>