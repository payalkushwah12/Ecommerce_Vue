<template>
  <header id="header">
    <!--header-->
    <div class="header_top">
      <!--header_top-->
      <div class="container">
        <div class="row">
          <div class="col-sm-6">
            <div class="contactinfo">
              <ul class="nav nav-pills">
                <li>
                  <a to="#"><i class="fa fa-phone"></i> +91{{config[0].contact_no}}</a>
                </li>
                <li>
                  <a to="#"><i class="fa fa-envelope"></i> {{config[0].notification_email}}</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-sm-6">
            
          </div>
        </div>
      </div>
    </div>
    <!--/header_top-->

    <div class="header-middle">
      <!--header-middle-->
      <div class="container">
        <div class="row">
          <div class="col-sm-4">
            <div class="logo pull-left">
              <a to="#"><img src="images/home/logo.png" alt="" /></a>
            </div>
            <div class="btn-group pull-right">
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-default dropdown-toggle usa"
                  data-toggle="dropdown"
                >
                  USA
                  <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                  <li><a to="#">Canada</a></li>
                  <li><a to="#">UK</a></li>
                </ul>
              </div>

              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-default dropdown-toggle usa"
                  data-toggle="dropdown"
                >
                  DOLLAR
                  <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                  <li><a to="#">Canadian Dollar</a></li>
                  <li><a to="#">Pound</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-sm-8">
            <div class="shop-menu pull-right">
              <ul class="nav navbar-nav">
                <li>
                  <router-link to="/account" v-if="login"><i class="fa fa-user"></i> Account</router-link>
                </li>
                <li>
                  <router-link to="/wishlist" ><i class="fa fa-star"></i> Wishlist</router-link>
                </li>
                <li>
                  <router-link to="/checkout" v-if="login"
                    ><i class="fa fa-crosshairs" ></i> Checkout</router-link
                  >
                </li>
                <li>
                  <router-link to="/cart"
                    ><i class="fa fa-shopping-cart"></i> Cart {{numInCart}}</router-link
                  >
                </li>
                 <li>
                  <router-link to="/register" v-if="!login"
                    ><i class="fa fa-lock"></i> Register</router-link
                  >
                </li>
                <li>
                  <router-link to="/login" v-if="!login"
                    ><i class="fa fa-lock"></i> Login</router-link
                  >
                </li>
                <li>
                  <router-link to="#" v-if="login"
                    >Welcome : {{ msg }}</router-link
                  >
                </li>
                <li>
                  <router-link to="/login" v-if="login" @click.native="logout()"
                    >Logout</router-link
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--/header-middle-->

    <div class="header-bottom">
      <!--header-bottom-->
      <div class="container">
        <div class="row">
          <div class="col-sm-9">
            <div class="navbar-header">
              <button
                type="button"
                class="navbar-toggle"
                data-toggle="collapse"
                data-target=".navbar-collapse"
              >
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
            </div>
            <div class="mainmenu pull-left">
              <ul class="nav navbar-nav collapse navbar-collapse">
                <li><router-link to="/" class="active">Home</router-link></li>
                <li class="dropdown">
                  <a to="#">Categories<i class="fa fa-angle-down"></i></a>
                  <ul role="menu" class="sub-menu" >
                    <li v-for="cat of catData" :key="cat.id"><router-link :to="`/category/${cat.id}`">{{cat.category_name}}</router-link></li>
                  </ul>
                </li>
                <li class="dropdown">
                  <a href="#">My Orders<i class="fa fa-angle-down"></i></a>
                  <ul role="menu" class="sub-menu">
                    <li><router-link to="/myorders">My Orders</router-link></li>
                    <li><router-link to="/checkout">Checkout</router-link></li>
                    <li><router-link to="/cart">Cart </router-link></li>
                  </ul>
                </li>
                <li><router-link to="/contact">Contact</router-link></li>
                <li class="dropdown">
                  <a to="#">Explore<i class="fa fa-angle-down"></i></a>
                  <ul role="menu" class="sub-menu" >
                    <li v-for="c of cms" :key="c.id"><router-link :to="`/explore/${c.id}`">{{c.title}}</router-link></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-sm-3">
            <div class="search_box pull-right">
              
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--/header-bottom-->
  </header>
</template>

<script>
import axios from 'axios';
import { getToken } from '../common/Jwttoken';
import store from "../store/store";
import * as type from "../store/types";
import { mapState } from "vuex";
import { categories,configure,cms } from '../common/Service'

export default {
  name: "Header",
  computed: mapState({
    msg: (state) => state.uid,
    login: (state) => state.islogin,
    inCart() { return this.$store.getters.inCart},
    numInCart() { return this.inCart.length}
  }),
    /* inCart(){ return this.$store.getters.inCart},
    numInCart(){ return this.inCart.length}, */
  data() {
    return { email: localStorage.getItem("uid"),
              catData:undefined,
              config:undefined,
              cms:undefined,}
  },
  methods: {
    logout(){
      const token = getToken();
      const url = "http://127.0.0.1:8000/api/logout/";
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const data = token;
      axios.post(url, data, config).then((res) => {
        this.$router.push("/login");
        localStorage.clear();
        store.dispatch({
          type: type.Islogin,
          id: null,
          userId: null,
        });
        console.log(res.data.message);
      });
    },
    show() {
      if ("id_token" in localStorage) {
        store.dispatch({
          type: type.Islogin,
          id: getToken(),
          userId: localStorage.getItem("uid"),
        });
      }
    },
  },
  mounted(){
    this.show();
    categories().then(res=>{
      if(res){
        console.log(res.data);
      this.catData = res.data;
      }
  });
  configure().then(res=>{
    if(res){
      this.config = res.data.configure;
    }
  });
  cms().then(res=>{
    if(res){
      this.cms = res.data.cms;
    }
  })
  }, 
  
};
</script>

<style>
</style>