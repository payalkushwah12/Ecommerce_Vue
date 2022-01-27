<template>
  <section>
    <Slider />
    <section>
      <div class="container">
        <div class="row">
          <Sidebar />
          <div class="col-sm-9 padding-right">
            <div class="features_items">
              <!--features_items-->
              <h2 class="title text-center">Features Items</h2>
              <div class="col-sm-4" v-for="pro of allproData" :key="pro.id">
                <div class="product-image-wrapper">
                  <div class="single-products">
                    <div class="productinfo text-center">
                      <router-link :to="`productDetails/${pro.id}`"
                        ><img
                          class="card-img-top"
                          :src="pro.product_image[0].image"
                          width="200"
                          height="250"
                          alt="Card image cap"
                      /></router-link>
                      <h2>Rs. {{ pro.product_price }}</h2>
                      <p>{{ pro.product_name }}</p>
                      <router-link
                        :to="`productDetails/${pro.id}`"
                        class="btn btn-default add-to-cart"
                        ><i class="fa fa-shopping-cart"></i>Add to
                        cart</router-link
                      >
                    </div>
                  </div>
                  <div class="choose">
                    <button class="btn btn-secondary" @click="addWishlist(pro)">
                      <i class="fa fa-plus-square"></i> Add to wishlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!--features_items-->
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import Slider from "./includes/Slider.vue";
import Sidebar from "./includes/Sidebar.vue";
//import axios from "axios";
//import { MAIN_URL } from "../common/Url";
import { products, wishlist } from "../common/Service";
export default {
  name: "Main",
  components: {
    Slider,
    Sidebar,
  },
  data() {
    return {
      allproData: undefined,
      wishpro: undefined,
      list:undefined,
      email:localStorage.getItem('uid'),
      server: "http://127.0.0.1:8000/uploads/",
    };
  },
  mounted() {
    products()
      .then((res) => {
        console.log(res.data);
        this.allproData = res.data.products;
      })
      .catch((err) => {
        console.log("Something Wrong " + err);
      });
  },
  methods: {
    addWishlist(item){
      console.log(item);
      this.list =  {email :this.email, items:item};
    console.log(this.list);
      wishlist(this.list).then((res) => {
        if (res) {
            console.log(res.data);
          if (res.data.d == 1) {
            this.$swal("Added to Wishlist", "", "success");
          } else {
            this.$swal("Already Added to Wishlist", "", "error");
          }
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
.choose {
  display: flex;
  justify-content: center;
  color: rgb(163, 157, 157);
}
.btn-secondary {
  color: rgb(155, 148, 148);
  background-color: white;
}
.btn-secondary:hover {
  color: #fabd02;
}
</style>