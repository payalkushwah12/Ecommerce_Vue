<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-sm-1"></div>

        <div
          class="col-sm-10 padding-right"
          v-for="pro of proData"
          :key="pro.id"
        >
          <div class="product-details">
            <div class="col-sm-5">
              <div class="view-product">
                <img :src="pro.product_image[0].image" alt="" />
              </div>
              <div
                id="similar-product"
                class="carousel slide"
                data-ride="carousel"
              >
               <div class="carousel-inner">
                  <div
                    v-for="(img, index) in pro.product_image"
                    v-bind:key="index"
                    v-bind:class="index == 0 ? 'item active' : 'item'"
                  >
                    <router-link
                      to="#"
                      v-for="im of pro.product_image"
                      :key="im.image"
                      ><img :src="im.image" alt="" width="100" height="100"
                    /></router-link>
                  </div>
                </div>

                <a
                  class="left item-control"
                  href="#similar-product"
                  data-slide="prev"
                >
                  <i class="fa fa-angle-left"></i>
                </a>
                <a
                  class="right item-control"
                  href="#similar-product"
                  data-slide="next"
                >
                  <i class="fa fa-angle-right"></i>
                </a>
              </div>
            </div>
            <div class="col-sm-7">
              <div class="product-information">
                <!--/product-information-->
                <img
                  src="images/product-details/new.jpg"
                  class="newarrival"
                  alt=""
                />
                <h2>{{ pro.product_name }}</h2>
                <p>Product ID: {{ pro.product_code }}</p>
                <img src="images/product-details/rating.png" alt="" />
                <br />
                <span>
                  <span>Rs. {{ pro.product_price }}</span>
                  <label>Quantity:</label>
                  <input type="text" :value="pro.product_quantity" />

                  <button
                    type="button"
                    class="btn btn-fefault cart"
                    @click="addToCart(pro)"
                  >
                    <i class="fa fa-shopping-cart"></i>
                    Add to cart
                  </button>
                </span>
                <p><b>Availability:</b> In Stock</p>
                <p><b>Condition:</b> New</p>
                <p><b>Brand:</b> E-SHOPPER</p>
                <a href=""
                  ><img
                    src="images/product-details/share.png"
                    class="share img-responsive"
                    alt=""
                /></a>
              </div>
              <!--/product-information-->
            </div>
          </div>
          <!--/product-details-->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import store from "../store/store";
import * as type from "../store/types";
import { productdetails } from "../common/Service";
export default {
  name: "ProductDetails",
  data() {
    return {
      proData: undefined,
      param: undefined,
      server: "http://127.0.0.1:8000/uploads/",
    };
  },
  mounted() {
    productdetails(this.param)
      .then((res) => {
        console.log(res.data.products);
        this.proData = res.data.products;
      })
      .catch((err) => {
        console.log("Something Wrong " + err);
      });
  },
  
  created() {
    this.param = this.$route.params.id;
  },
  methods: {
    addToCart(pro) {
      if (localStorage.getItem("myCart") != undefined) {
        let arr = JSON.parse(localStorage.getItem("myCart"));
        let obj = {
          p_id: pro.id,
          p_code: pro.product_code,
          p_name: pro.product_name,
          quantity: 1,
          price: pro.product_price,
          image: pro.product_image[0].image,
        };
        const found = arr.some((item) => item.p_id == pro.id);
        if (found) {
          this.$swal("already added to cart", "", "error");
          this.$router.push("/cart");
        } else {
          arr.push(obj);
          localStorage.setItem("myCart", JSON.stringify(arr));
          this.$swal("Added to Cart", "", "success");
          this.$store.dispatch("addToCart", arr);
          let ro = JSON.parse(localStorage.getItem("myCart"));
          store.dispatch({
            type: type.Rorders,
            id: ro,
          });
          this.$router.push("/cart");
        }
      } else {
        let arr = [];
        let obj = {
          p_id: pro.id,
          p_name: pro.product_name,
          p_code: pro.product_code,
          quantity: 1,
          price: pro.product_price,
          image: pro.product_image[0].image,
        };
        arr.push(obj);
        localStorage.setItem("myCart", JSON.stringify(arr));
        this.$store.dispatch("addToCart", arr);
        let ro = JSON.parse(localStorage.getItem("myCart"));
        store.dispatch({
          type: type.Rorders,
          id: ro,
        });
        this.$swal("Added to Cart", "", "success");
        this.$router.push("/cart");
      }
    },
  },
};
</script>

<style>
</style>