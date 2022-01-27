import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        uid:"",
        islogin:"",
        revieworders:JSON.parse(localStorage.getItem('myCart'))?JSON.parse(localStorage.getItem('myCart')):"",
        inCart:JSON.parse(localStorage.getItem('myCart'))?JSON.parse(localStorage.getItem('myCart')):[]
    },
    getters:{
        inCart: state =>state.inCart,
        revieworders:state =>state.revieworders,
    },
    mutations:{
        mylogin(state,payload){
            return state.islogin = payload.id,state.uid = payload.userId
        },
        ADD_TO_CART(state,id){state.inCart.push(id)},
        DEL_ITEM(state,id){state.inCart.splice(id,1)},
        My_Orders(state,payload)
        {
            return state.revieworders = payload.id
        },
    },
    actions:{
        islogin(context,payload){
            context.commit('mylogin',payload)
        },
        addToCart(context,id) { context.commit('ADD_TO_CART',id)},
        remItem(context,id){ context.commit('DEL_ITEM',id)},
        revieworders(context,payload){ context.commit('My_Orders',payload)},
    },
})
