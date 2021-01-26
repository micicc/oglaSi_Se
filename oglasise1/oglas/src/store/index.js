import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    oglasi: []
  },
  mutations: {
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
    }

  },
  actions: {
    load_moglasi: function ({commit}){
      fetch('http://localhost/api/oglasi',{method: "get"}).then((resp)=>{
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
      fetch(`http://localhost/api/oglas/${id}`, { method: 'delete' }).then((response) => {
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
    new_moglas: function ({commit},meteor){

      fetch('http://localhost/api/oglasi', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: meteor
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
    change_moglas: function ({commit}, payload) {
      fetch(`http://localhost/api/oglas/${payload.id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: payload.meteor
      }).then((response) => {
        if (!response.ok)
          throw response;
        return response.json();
      }).then((jsonData) => {
        commit('update_oglas', {id: payload.id, meteor:jsonData});
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    }


  },
})
