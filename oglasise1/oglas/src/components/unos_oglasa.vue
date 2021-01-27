<template >
  <b-container fluid >
    <b-row cols="2" align-h="center" >
      <b-form-input v-model="nnaslov" placeholder="naslov"  />
    </b-row>
    <b-row cols="2" align-h="center" >
      <b-form-select  v-model="nkategorija" placeholder="kategorija">
        <b-form-select-option :value=null>kategorija</b-form-select-option>
        <b-form-select-option v-for="k in kategorije" :key="k.id" :value=k.id>{{ k.naziv }}</b-form-select-option>

      </b-form-select>
    </b-row>
    <b-row cols="2" align-h="center"  >
      <b-form-textarea v-model="ntekst" placeholder="tekst oglasa" />
    </b-row>
    <b-row cols="2" align-h="center" >
      <b-form-input v-model="nmesto" placeholder="mesto"  />
    </b-row>
    <b-row cols="2" align-h="center" >
      <b-button variant="primary" @click="addNew">Save</b-button>
    </b-row>

  </b-container>


</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import router from "@/router";

  export default {
    computed: {
      ...mapState(['kategorije', 'users', 'curent_user']),
    },
    name: "unos_oglasa",
    props:{
      oglas:{

      }
    },
    data(){
      return{
        nnaslov: "",
        ntekst: "",
        nmesto: "",
        nkategorija: null,
      }
    },
    mounted(){
      if(this.$route.params.id){
        this.nnaslov = this.oglas.naslov;
        this.nkategorija=this.oglas.kategorija_id;
        this.ntekst=this.oglas.opis;
        this.nmesto=this.oglas.mesto;

      }
    },
    methods:{
      ...mapActions(['new_oglas', 'change_oglas', ]),

      addNew:function (){
        const ogl = JSON.stringify({naslov: this.nnaslov, opis: this.ntekst, mesto: this.nmesto, kategorija_id: this.nkategorija, korisnik_id: this.curent_user});


          if(!this.$route.params.id){
            this.new_oglas(ogl);
          }
          else {
            this.change_oglas({id: this.$route.params.id, oglas: ogl});
            router.push({path: `/moji_oglasi`})
          }


        this.nnaslov = "";
        this.ntekst = "";
        this.nmesto = "";
        this.nkategorija = null;

      }

    }

  }


</script>

<style scoped>
.row{
  margin-bottom: 20px;
  margin-top: 10px;
}
</style>