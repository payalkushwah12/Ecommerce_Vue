<template>
  <section id="form">
    <!--form-->
    <div class="container">
      <div class="row">
        <div class="col-sm-4 col-sm-offset-1">
          <div class="login-form">
            <!--login form-->
            <h2>Profile</h2>
            <form @submit.prevent="updatePro()">
              <input
                type="email"
                name="email"
                v-model="this.email"
                readonly
              />
              <input
                type="text"
                name="f_name"
                v-model="user1.first_name"
              />
              <input
                type="text"
                name="l_name"
                v-model="user1.last_name"
              />
              <button type="submit" class="btn btn-default">Edit Profile</button>
            </form>
          </div>
          <!--/login form-->
        </div>
        <div class="col-sm-1">
          <h2 class="or">OR</h2>
        </div>
        <div class="col-sm-4">
          <div class="signup-form">
            <!--sign up form-->
            <h2>Change Password</h2>
            <form @submit.prevent="changePass()">
              <input
                type="password"
                placeholder="Enter Old Password"
                v-model="user.oldPassword"
              />
              <div
                v-if="submitted && $v.user.oldPassword.$error"
                class="invalid-feedback"
              >
                <span v-if="!$v.user.oldPassword.required"
                  >Old Password is required</span
                >
                <span v-if="!$v.user.oldPassword.minLength"
                  >Password must be at least 6 characters</span
                >
              </div>
              <input
                type="password"
                placeholder="Enter New Password"
                v-model="user.newPassword"
              />
              <div
                v-if="submitted && $v.user.newPassword.$error"
                class="invalid-feedback"
              >
                <span v-if="!$v.user.newPassword.required"
                  >New Password is required</span
                >
                <span v-if="!$v.user.newPassword.minLength"
                  >Password must be at least 6 characters</span
                >
              </div>
              <input
                type="password"
                placeholder="Confirm Password"
                v-model="user.c_Password"
              />
              <div
                v-if="submitted && $v.user.c_Password.$error"
                class="invalid-feedback"
              >
                <span v-if="!$v.user.c_Password.required"
                  >Confirm Password is required</span
                >
                <span v-else-if="!$v.user.c_Password.sameAsPassword"
                  >Passwords must match</span
                >
              </div>
              <button type="submit" class="btn btn-default">Change Password</button>
            </form>
          </div>
          <!--/sign up form-->
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import {required, minLength,sameAs} from "vuelidate/lib/validators";
import {editProfile} from '../common/Service';
import {updateProfile} from '../common/Service'
import {changePassword} from '../common/Service'
export default {
  name: "Account",
  data(){
      return{
          details:undefined,
          email:localStorage.getItem('uid'),
          user1:{},
          user:{
              oldPassword:null,
              newPassword:null,
              c_Password:null,
          },
          submitted:false,
          submitted1:false,
      }
  },
  validations: {
    user: {
      oldPassword: { required, minLength: minLength(6) },
      newPassword: { required, minLength: minLength(6) },
      c_Password: {
        required,
        sameAsPassword: sameAs("newPassword"),
      },
    },
  },
  created(){
      this.editp();
  },
  methods:{
    editp(){
      editProfile(this.email).then((res)=>{
          if(res){
              console.log(res.data);
              this.user1 = res.data.users;
              console.log(this.user1);
          }
      })
      .catch((err) => {
          console.log("Something Wrong " + err);
        });
    },
      updatePro(){
        let formdata = {f_name:this.user1.first_name ,l_name:this.user1.last_name, id:this.email}
          updateProfile(formdata).then((res)=>{
              if(res){
                  console.log(res.data);
                  alert(res.data.message)
                  this.details = res.data.users;
              }
          })
          .catch((err) => {
          console.log("Something Wrong " + err);
        });
      },
      changePass(){
          this.submitted = true;
          this.$v.$touch();
          if(this.$v.$invalid){
              return;
          }
          let formData = { old_pass:this.user.oldPassword, new_pass:this.user.newPassword, c_pass:this.user.c_Password, useremail:this.email}
          changePassword(formData).then(res =>{
              if(res){
                  console.log(res.data);
                  alert(res.data.message);
                  this.$router.push("/");
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
    
</style>