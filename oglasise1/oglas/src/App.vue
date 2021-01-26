<template>
  <div id="app">
    <b-container>
      <b-row>
        <b-col cm="6" >
          <zaglavlje/>
        </b-col>
      </b-row>
    </b-container>
    <router-view> </router-view>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
  import zaglavlje from "@/components/zaglavlje";

  export  default {
    name: 'App',
    components:{
      zaglavlje
    },
    methods:{
      ...mapActions(['ucitaj_oglase'])
    },
    mounted: function (){
      this.ucitaj_oglase();
    }
  }
</script>


<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
