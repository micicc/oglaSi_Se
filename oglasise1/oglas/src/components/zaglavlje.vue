<template>
  <div>
    <div style="background-image: url('https://i.imgur.com/rZQhgGS.png');">
      <h1 style="text-align:left; color: #e8ce0c; font-size: 450%; padding-left: 20px; padding-top: 100px" > OglaSi_Se </h1>
      <h1 style="text-align:left; color: #e5e1dc; font-size: 180%; padding-left: 20px; padding-bottom: 10px" > Najveća online platforma za oglašavanje zanatskih delatnosti. </h1>
    </div>

    <div>
      <b-navbar toggleable="lg" type="light"  style="background: #e8ce0c">
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item style="font-size: 120%;" href="/">
                <img src="@/assets/repairman.png" width="22" height="22" class="d-inline-block align-top" alt="logo" style="margin-right: 5px"/>
                <b>Svi oglasi</b>
            </b-nav-item>
            <b-nav-item v-if="curent_user!=null" style="font-size: 120%" href="/postavi_oglas" ><b>Postavi oglas</b></b-nav-item>
            <b-nav-item v-if="curent_user!=null" style="font-size: 120%" href="/moji_oglasi" ><b>Moji oglasi</b></b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item v-if="curent_user!=null" style="font-size: 120%"  ><b>logout</b></b-nav-item>
            <b-nav-item v-if="curent_user==null" style="font-size: 120%"  ><b>login</b></b-nav-item>
            <b-nav-item v-if="curent_user==null" style="font-size: 120%"  ><b>singin</b></b-nav-item>
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
        ...mapState(['oglasi','curent_user'])

      },
  }
</script>

<style scoped>

</style>