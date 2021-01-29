<template>
  <b-container fluid >
    <h1>Dodaj komentar:</h1>
    <b-row cols="12" >
      <b-col cols="2">
        <b-form-select v-model="nocena" :options="ocene" placeholder="ocena"  />
      </b-col>
      <b-col cols="9">
        <b-form-input  v-model="ntekst" placeholder="tekst komentara" />
      </b-col>
      <b-col cols="1" >
        <b-button  variant="primary" @click="addNew">Save</b-button>
      </b-col>
    </b-row>
    <br> <br>
  </b-container>

</template>

<script>
import {mapActions, mapState} from 'vuex';
import router from "@/router";
const Joi = require('@hapi/joi');

const semaO = Joi.object().keys( {
  ocena: Joi.number().required().min(1).max(5),
  tekst: Joi.string().required().trim().max(120),
  korisnik_id: Joi.number().required(),
  oglas_id: Joi.number().required(),

});

export default {
  name: "unos_komentara",
  computed: {
    ...mapState(['curent_user']),
  },
  props:{
    oglas:{

    },
    komentar:{

    }
  },
  data(){
    return{
      nocena: null,
      ntekst: "",
      ocene: [
        { value: null, text: 'ocena' },
        { value: 5, text: '5' },
        { value: 4, text: '4' },
        { value: 3, text: '3' },
        { value: 2, text: '2' },
        { value: 1, text: '1' },
      ]
    }
  },
  methods:{
    ... mapActions(['new_komentar','change_komentar']),
    addNew:function (){
      const kom = JSON.stringify({ocena: this.nocena, tekst: this.ntekst, korisnik_id: this.curent_user, oglas_id: this.oglas.id});
      console.log(kom)
      Joi.validate(kom, semaO, (err) => {
        if (err) {
          alert("fron validation: " + err.details[0].message);
        } else {
          if(this.komentar==null){
            this.new_komentar(kom);
          }
          else {
            this.change_komentar({id: this.$route.params.id, komentar: kom});
            router.push({path: `/`})
          }
        }
      });

      this.nocena = null;
      this.ntekst = "";

    }
  }
}
</script>

<style scoped>

</style>