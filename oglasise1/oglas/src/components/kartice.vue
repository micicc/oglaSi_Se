<template>
  <div>
    <b-row>
      <b-card-group class="col-md-4" v-for="oglas in oglasi" :key="oglas.id" style="padding-bottom: 20px; text-align: left" >
        <b-card :title="oglas.naslov" >
          <p class="card-text">
            <b>kategorija:</b>
            {{ (kategorije.find(element => element.id == oglas.kategorija_id)).naziv}}

          </p>
          <p class="card-text">
            <b>mesto:</b>
            {{oglas.mesto}}
          </p>
          <p class="card-text">
            <b>opis:</b>
            {{oglas.opis}}
          </p>
          <div slot="footer">
            <b-btn variant="primary" @click="detalji(oglas)" block>Details</b-btn>
          </div>
        </b-card>
      </b-card-group>
    </b-row>

  </div>
</template>


<script>

  import router from "@/router";
  import {mapState} from 'vuex';

  export default {
    name: "kartice",
    computed: {
      ...mapState(['oglasi', 'kategorije'])
    },
    data(){
      return {
        detalji: function (item) {
          router.push({path: `/oglas/${item.id}`})
        },
      }
    },
    methods:{

    }



  }
</script>

<style scoped>

</style>