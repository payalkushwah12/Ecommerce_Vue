<template>
  <section id="form">
    <!--form-->
    <div class="container">
      <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4">
          <div class="signup-form">
            <!--sign up form-->
            <h2>New Signup!</h2>
            <form @submit.prevent="postRegister()">
              <input
                type="text"
                placeholder="First Name"
                name="f_nameRegister"
                v-model="user.f_nameRegister"
              />
              <div
                v-if="submitted && !$v.user.f_nameRegister.required"
                class="invalid-feedback"
              >
                <span>First Name is required</span>
              </div>

              <input
                type="text"
                placeholder="Last Name"
                v-model="user.l_nameRegister"
              />
              <div
                v-if="submitted && !$v.user.l_nameRegister.required"
                class="invalid-feedback"
              >
                <span>Last Name is required</span>
              </div>

              <input
                type="email"
                placeholder="Email Address"
                v-model="user.emailRegister"
              />
              <div
                v-if="submitted && $v.user.emailRegister.$error"
                class="invalid-feedback"
              >
                <span v-if="!$v.user.emailRegister.required"
                  >Email is required</span
                >
                <span v-if="!$v.user.emailRegister.email"
                  >Email is invalid</span
                >
              </div>
              <input
                type="password"
                placeholder="Enter Password"
                v-model="user.passwordRegister"
              />
              <div
                v-if="submitted && $v.user.passwordRegister.$error"
                class="invalid-feedback"
              >
                <span v-if="!$v.user.passwordRegister.required"
                  >Password is required</span
                >
                <span v-if="!$v.user.passwordRegister.minLength"
                  >Password must be at least 6 characters</span
                >
              </div>
              <input
                type="password"
                placeholder="Confirm Password"
                v-model="user.c_passwordRegister"
              />
              <div
                v-if="submitted && $v.user.c_passwordRegister.$error"
                class="invalid-feedback"
              >
                <span v-if="!$v.user.c_passwordRegister.required"
                  >Confirm Password is required</span
                >
                <span v-else-if="!$v.user.c_passwordRegister.sameAsPassword"
                  >Passwords must match</span
                >
              </div>
              <button type="submit" class="btn btn-default">Signup</button>
            </form>
          </div>
          <!--/sign up form-->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import { userRegister } from "../common/Service";
import { mapState } from "vuex";

export default {
  name: "Register",
  data() {
    return {
      user: {
        f_nameRegister: null,
        l_nameRegister: null,
        emailRegister: null,
        passwordRegister: null,
        c_passwordRegister: null,
      },
      submitted: false,
    };
  },
  validations: {
    user: {
      f_nameRegister: { required },
      l_nameRegister: { required },
      emailRegister: { required, email },
      passwordRegister: { required, minLength: minLength(6) },
      c_passwordRegister: {
        required,
        sameAsPassword: sameAs("passwordRegister"),
      },
    },
  },

  computed: mapState({
    msg: (state) => state.uid,
    login: (state) => state.islogin,
  }),
  methods: {
    postRegister() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      if (this.user.passwordRegister == this.user.c_passwordRegister) {
        let formData = {
          f_name: this.user.f_nameRegister,
          l_name: this.user.l_nameRegister,
          email: this.user.emailRegister,
          password: this.user.passwordRegister,
        };
        console.log(formData);
        userRegister(formData)
          .then((res) => {
            if (res) {
              console.log(res.data);
              alert(res.data.message);
              this.$router.push("/login");
            } else {
              alert(res.data.err);
            }
          })
          .catch((err) => {
            alert("Something Wrong" + err);
          });
      } else {
        alert("password not match.. confirm password!");
      }
    },
  },
};
</script>

<style>
.invalid-feedback {
  color: red;
}
</style>