<template>
  <section id="cart_items">
    <div class="container">
      <div class="breadcrumbs">
        <ol class="breadcrumb">
          <li><router-link to="/">Home</router-link></li>
          <li class="active">Check out</li>
        </ol>
      </div>
      <!--/breadcrums-->

      <div class="review-payment">
        <h2>Review & Payment</h2>
      </div>

      <div class="table-responsive cart_info">
        <table class="table table-condensed">
          <thead>
            <tr class="cart_menu">
              <td class="image">Item</td>
              <td class="description"></td>
              <td class="price">Price</td>
              <td class="quantity">Quantity</td>
              <td class="total">Total</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item of revieworders" :key="item.p_id">
              <td class="cart_product">
                <router-link to="#"
                  ><img :src="item.image" alt="" width="120" height="100"
                /></router-link>
              </td>
              <td class="cart_description">
                <h4>
                  <router-link to="#">{{ item.p_name }}</router-link>
                </h4>
                <p>{{ item.p_code }}</p>
              </td>
              <td class="cart_price">
                <p>Rs. {{ item.price }}</p>
              </td>
              <td class="cart_quantity">
                <div>
                  <input
                    class="text-center"
                    type="text"
                    name="quantity"
                    :value="item.quantity"
                    autocomplete="off"
                    size="2"
                    readonly
                  />
                </div>
              </td>
              <td class="cart_total">
                <p class="cart_total_price">
                  Rs. {{ item.price * item.quantity }}
                </p>
              </td>
            </tr>
            <tr>
              <td colspan="3"></td>
              <td colspan="2">
                <table class="table table-condensed total-result">
                  <tr>
                    <td>
                      <input type="text" v-model="couponCode" /><button
                        class="btn btn-warning"
                        @click="applyCoupon()"
                      >
                        Apply Coupon
                      </button>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Discount</td>
                    <td>
                      <span>Rs. {{ this.discount }} </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Shipping Charges</td>
                    <td>
                      <span>{{ shipping() }} </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td>
                      <span>Rs. {{ total() }} </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <div></div>
      </div>
      <div class="shopper-informations">
        <div class="row">
          <div class="col-sm-3"></div>
          <div class="col-sm-5 clearfix">
            <div class="bill-to">
              <p>Bill To</p>
              <div class="form-one">
                <form @submit.prevent="postOrders()">
                  <input
                    type="text"
                    placeholder="Email *"
                    v-model="user.userEmail"
                  />
                  <div
                    v-if="submitted && $v.user.userEmail.$error"
                    class="invalid-feedback"
                  >
                    <span v-if="!$v.user.userEmail.required"
                      >Email is required</span
                    >
                    <span v-if="!$v.user.userEmail.email"
                      >Email is invalid</span
                    >
                  </div>
                  <input
                    type="text"
                    placeholder="First Name *"
                    v-model="user.userfName"
                  />
                  <div
                    v-if="submitted && !$v.user.userfName.required"
                    class="invalid-feedback"
                  >
                    <span>First Name is required</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Last Name *"
                    v-model="user.userlName"
                  />
                  <div
                    v-if="submitted && !$v.user.userlName.required"
                    class="invalid-feedback"
                  >
                    <span>Last Name is required</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Address *"
                    v-model="user.userAddress"
                  />
                  <div
                    v-if="submitted && !$v.user.userAddress.required"
                    class="invalid-feedback"
                  >
                    <span>Address is required</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Postal Code *"
                    v-model="user.userPostal"
                  />
                  <div
                    v-if="submitted && $v.user.userPostal.$error"
                    class="invalid-feedback"
                  >
                    <span v-if="!$v.user.userPostal.required"
                      >PostalCode is required</span
                    >
                    <span v-if="!$v.user.userPostal.minLength"
                      >PostalCode must be at least 6 characters</span
                    >
                  </div>
                  <input
                    type="text"
                    placeholder="Mobile Phone"
                    v-model="user.userMobile"
                  />
                  <div
                    v-if="submitted && $v.user.userMobile.$error"
                    class="invalid-feedback"
                  >
                    <span v-if="!$v.user.userMobile.required"
                      >Contact no. is required</span
                    >
                    <span v-if="!$v.user.userMobile.minLength"
                      >Contact must be at least 10 characters</span
                    >
                  </div>
                  <div class="form-check">
                    <span>
                      <label
                        ><input
                          type="radio"
                          value="CashOnDelivery"
                          v-model="paymentMethod"
                          
                        />
                        Cash on Delivery</label
                      > </span
                    >&nbsp;&nbsp;
                    <span>
                      <label
                        ><input
                          type="radio"
                          value="Paypal"
                          v-model="paymentMethod"
                        />
                        Paypal</label
                      >
                    </span>
                    <Paypal />
                  </div>
                  

                  <button type="submit" class="btn btn-success">
                    Make Payment
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div class="col-sm-4"></div>
        </div>
      </div>
    </div><br>
  </section>
  <!--/#cart_items-->
</template>

<script>
import Paypal from '../components/Paypal.vue';
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
import { coupons, userOrders, userAddress } from "../common/Service";
import { mapState } from "vuex";
export default {
  name: "Checkout",
  components:{
    Paypal,
  },
  data() {
    return {
      couponCode: undefined,
      coupons: null,
      discountvalue: 0,
      amount: 0,
      afterdiscount: 0,
      discount: 0,
      data: undefined,
      c_code:undefined,
      user: {
        userEmail: null,
        userfName: null,
        userlName: null,
        userPostal: null,
        userMobile: null,
        userAddress: null,
      },
          paymentMethod:"CashOnDelivery",
      submitted: false,
    };
  },
  validations: {
    user: {
      userfName: { required },
      userlName: { required },
      userAddress: { required },
      userEmail: { required, email },
      userPostal: { required, minLength: minLength(6) },
      userMobile: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(10),
      },
      
    },
  },
  computed: mapState({
    revieworders: (state) => state.revieworders,
  }),
  methods: {
    total() {
      const items = JSON.parse(localStorage.getItem("myCart"));
      var sum = 0;
      items.forEach((item) => {
        sum = sum + item.price * item.quantity;
      });
      this.amount = sum - this.discount;
      if (this.amount < 500) {
        this.amount = this.amount + 50;
      }
      localStorage.setItem("amount",this.amount);
      return this.amount;
    },
    applyCoupon() {
      if (this.couponCode != undefined) {
        let flag = 0;
        let arr = this.coupons;
        for (let i in arr) {
          if (arr[i].coupon_code == this.couponCode) {
            flag = 1;
            this.discountvalue = arr[i].coupon_discount;
            this.c_code = arr[i].coupon_code;
            break;
          } else {
            alert("enter valid coupon");
          }
        }
        if (flag != 0 && this.amount >= 250) {
          this.value = this.discountvalue / 100;
          this.discount = this.amount * this.value.toFixed(2);
          this.afterdiscount = 1;
        } else {
          this.discountvalue = 0;
          alert("Invalid coupon or amount should be greater than 250");
        }
      } else {
        alert("Enter Coupon Code");
      }
    },
    shipping() {
      if (this.amount > 500) {
        return "Free";
      } else {
        this.amount = this.amount + 50;
        return 50;
      }
    },
    postOrders() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        let array = this.data;
         localStorage.setItem("pay",this.paymentMethod);
        array.forEach((item) => {
          let objdata = {
            p_name: item.p_name,
            p_id: item.p_id,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
            uid: localStorage.getItem("uid"),
            paymentmethod: localStorage.getItem("pay"),
            coupon_c:this.c_code,
            coupon_d:this.discount,
            total:localStorage.getItem("amount"),
          };
          userOrders(objdata)
            .then((res) => {
              if (res) {
                console.log(res.data);
              } else {
                alert(res.data.err);
              }
            })
            .catch((err) => {
              alert("Something Wrong" + err);
            });
            
        });

        let formData = {
          f_name: this.user.userfName,
          l_name: this.user.userlName,
          email: this.user.userEmail,
          postal: this.user.userPostal,
          contact: this.user.userMobile,
          address: this.user.userAddress,
          uid: localStorage.getItem("uid"),
          
        };
        userAddress(formData)
          .then((res) => {
            if (res) {
              console.log(res.data);
              this.$swal("Ordered Successfully", "", "success");
            } else {
              alert(res.data.err);
            }
          })
          .catch((err) => {
            alert("Something Wrong" + err);
          });
        localStorage.removeItem("myCart");
        this.$router.push("/myorders");
      }
    },
  },
  mounted() {
    coupons().then((res) => {
      if (res) {
        this.coupons = res.data.coupons;
        console.log(res.data.coupons);
      }
    });
    this.data = JSON.parse(localStorage.getItem("myCart"));
  },
};
</script>

<style>
.form-check{
    color:rgb(145, 141, 141);
}
</style>