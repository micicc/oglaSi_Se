import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    oglasi: [],
    kategorije: [],
    komentari: [],
    users: [],
    curent_user: 3,
  },
  mutations: {
    /////oglasi///////
    set_oglasi: function (state,oglasi){
      state.oglasi = oglasi;
    },
    add_oglas: function (state,oglas){
      state.oglasi.push(oglas);
    },
    remove_oglas: function (state,id){
      for(let m = 0; m < state.oglasi.length; m++){
        if(state.oglasi[m].id === id){
          state.oglasi.splice(m,1);
          break;
        }
      }
    },
    update_oglas: function (state,payload){
      for(let m = 0; m < state.oglasi.length; m++){
        if(state.oglasi[m].id === parseInt(payload.id)){
          state.oglasi[m].naslov = payload.oglas.naslov;
          state.oglasi[m].opis = payload.oglas.opis;
          state.oglasi[m].mesto = payload.oglas.mesto;
          state.oglasi[m].kategorija_id = payload.oglas.kategorija_id;
          state.oglasi[m].korisnik_id = payload.oglas.korisnik_id;
          break;
        }
      }
    },
    /////////kategorije///////
    set_kategorije: function (state,kategorije){
      state.kategorije = kategorije;
    },

    ////komentari////
    set_komentari: function (state,komentari){
      state.komentari = komentari;
    },
    add_komentar: function (state,komentar){
      state.komentari.push(komentar);
    },
    remove_komentar: function (state,id){
      for(let m = 0; m < state.komentari.length; m++){
        if(state.komentari[m].id === id){
          state.komentari.splice(m,1);
          break;
        }
      }
    },
    update_komentar: function (state,payload){
      for(let m = 0; m < state.komentari.length; m++){
        if(state.komentari[m].id === parseInt(payload.id)){
          state.komentari[m].ocena = payload.komentar.ocena;
          state.komentari[m].tekst = payload.komentar.tekst;
          state.komentari[m].korisnik_id = payload.komentar.korisnik_id;
          state.komentari[m].oglas_id = payload.komentar.oglas_id;
          break;
        }
      }
    },
    /////useri///
    set_users: function (state,users){
      state.users = users;
    },

    set_curent_user: function (state,curent_user){
      state.curent_user = curent_user;
    },
  },



  actions: {
    load_oglasi: function ({commit}){
      fetch('http://localhost/apiO/oglasi',{method: "get"}).then((resp)=>{
        if(!resp.ok)
          throw resp;
        return resp.json();
      }).then((jsonData) =>{
        commit('set_oglasi',jsonData);
      }).catch((err)=>{
        if (typeof err.text === 'function')
          err.text().then((errorMessage) =>{
            alert(errorMessage);
          })
        else
          alert(err);
      });
    },
    delete_oglas: function({commit},id){

      fetch(`http://localhost/apiO/oglas/${id}`, { method: 'delete' }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('remove_oglas', jsonData.id)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    new_oglas: function ({commit},oglas){
      fetch('http://localhost/apiO/oglasi', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: oglas
      }).then((response) => {
        if (!response.ok)
          throw response;
        return response.json();
      }).then((jsonData) => {
        commit('add_oglas', jsonData);
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });


    },
    change_oglas: function ({commit}, payload) {
      fetch(`http://localhost/apiO/oglas/${payload.id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: payload.oglas
      }).then((response) => {
        if (!response.ok)
          throw response;
        return response.json();
      }).then((jsonData) => {
        commit('update_oglas', {id: payload.id, oglas:jsonData});
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    //////kategorije///////

    load_kategorije: function ({commit}){
      fetch('http://localhost/apiK/kategorije',{method: "get"}).then((resp)=>{
        if(!resp.ok)
          throw resp;
        return resp.json();
      }).then((jsonData) =>{
        commit('set_kategorije',jsonData);
      }).catch((err)=>{
        if (typeof err.text === 'function')
          err.text().then((errorMessage) =>{
            alert(errorMessage);
          })
        else
          alert(err);
      });
    },

    /////komentari///
    load_komentari: function ({commit}){
      fetch('http://localhost/apiKom/komentari',{method: "get"}).then((resp)=>{
        if(!resp.ok)
          throw resp;
        return resp.json();
      }).then((jsonData) =>{
        commit('set_komentari',jsonData);
      }).catch((err)=>{
        if (typeof err.text === 'function')
          err.text().then((errorMessage) =>{
            alert(errorMessage);
          })
        else
          alert(err);
      });
    },
    delete_komentar: function({commit},id){
      fetch(`http://localhost/apikom/komentar/${id}`, { method: 'delete' }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('remove_komentar', jsonData.id)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    new_komentar: function ({commit},komentar){

      fetch('http://localhost/apiKom/komentari', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: komentar
      }).then((response) => {
        if (!response.ok)
          throw response;
        return response.json();
      }).then((jsonData) => {
        commit('add_komentar', jsonData);
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });


    },
    change_komentar: function ({commit}, payload) {
      fetch(`http://localhost/apikom/komentar/${payload.id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: payload.komentar
      }).then((response) => {
        if (!response.ok)
          throw response;
        return response.json();
      }).then((jsonData) => {
        commit('update_komentar', {id: payload.id, komentar:jsonData});
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },

    ///users///
    load_users: function ({commit}){
      fetch('http://localhost/apiUsr/users',{method: "get"}).then((resp)=>{
        if(!resp.ok)
          throw resp;
        return resp.json();
      }).then((jsonData) =>{
        commit('set_users',jsonData);
      }).catch((err)=>{
        if (typeof err.text === 'function')
          err.text().then((errorMessage) =>{
            alert(errorMessage);
          })
        else
          alert(err);
      });
    },







  },
})
