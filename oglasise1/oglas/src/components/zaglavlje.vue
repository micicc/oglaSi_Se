<template>
  <div>
    <div style="background-image: url('https://i.imgur.com/rZQhgGS.png');">
      <h1 style="text-align:left; color: #e8ce0c; font-size: 450%; padding-left: 20px; padding-top: 100px" > OGLASI SE !!! </h1>
      <h1 style="text-align:left; color: #e5e1dc; font-size: 180%; padding-left: 20px; padding-bottom: 10px" > Najveća online platforma za oglašavanje uslužnih delatnosti. </h1>
    </div>

    <div>
      <b-navbar toggleable="lg" type="dark"  style="background: #215987">
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item style="font-size: 120%" href="/">Svi oglasi</b-nav-item>
            <b-nav-item style="font-size: 120%" href="/" disabled>Disabled</b-nav-item>
          </b-navbar-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">



          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <p id="demo"></p>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "zaglavlje",
      computed:{
        ...mapState(['oglasi'])

      },
  }
</script>

<style scoped>

</style>