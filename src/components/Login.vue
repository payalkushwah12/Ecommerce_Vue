<template>
  <section id="form">
    <!--form-->
    <div class="container">
      <div class="row">
        <div class="col-sm-4">
        </div>
        <div class="col-sm-4 col-sm-offset-1">
          <div class="login-form">
            <!--login form-->
            <h2>Login to your account</h2>
            <form @submit.prevent="postLogin()">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                v-model="user.emailLogin"
              />
              <div
                v-if="loggedin && $v.user.emailLogin.$error"
                class="invalid-feedback"
              >
                <span v-if="!$v.user.emailLogin.required"
                  >Email is required</span
                >
              </div>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                v-model="user.passwordLogin"
              />
              <div
                v-if="loggedin && $v.user.passwordLogin.$error"
                class="invalid-feedback"
              >
                <span v-if="!$v.user.passwordLogin.required"
                  >Password is required</span
                >
              </div>
              <span>
                <input type="checkbox" class="checkbox" />
                Keep me signed in
              </span>
              <button type="submit" class="btn btn-default">Login</button>
            </form>
          </div>
          <!--/login form-->
        </div>
        
      </div>
    </div>
  </section>
</template>

<script>
import { required} from "vuelidate/lib/validators";
import store from "../store/store";
import * as type from "../store/types";
import {userLogin } from "../common/Service";
import { saveToken } from "@/common/Jwttoken";
import { mapState } from "vuex";

export default {
  name: "Login",
  data() {
    return {
     user:{
        emailLogin: null,
        passwordLogin: null,
     },
      loggedin : false,
    };
  },
  validations: {
    user:{
      emailLogin: { required },
      passwordLogin: { required },
      },
  },
  computed: mapState({
    msg: (state) => state.uid,
    login: (state) => state.islogin,
  }),
  methods:{
    postLogin(){
      this.loggedin = true;
      this.$v.$touch();
      if(this.$v.$invalid){
        return;
      }
      let formData = { email: this.user.emailLogin, password: this.user.passwordLogin };
      userLogin(formData).then((res) => {
          if(res){
            saveToken(res.data.access_token);
            localStorage.setItem("uid", res.data.email);
            store.dispatch({
              type: type.Islogin,
              id: res.data.access_token,
            userId: res.data.email,
            });
            console.log(res.data);
            alert(res.data.message);
            this.$router.push("/");
          }
          else{
            alert(res.data.msg);
          }
        })
        .catch((err) => {
          console.log("Something Wrong " + err);
        });
    },
    
  },
};
</script>

<style>
    .invalid-feedback {
        color : red;
    }
</style>