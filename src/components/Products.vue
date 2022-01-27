<template>
  <section>
    <div class="container">
      <div class="row">
        <Sidebar />
        <div class="col-sm-9 padding-right">
          <div class="features_items">
            <!--features_items-->
            <h2 class="title text-center">Features Items</h2>
            <div class="col-sm-4" v-for="pro of proData" :key="pro.id">
              <div class="product-image-wrapper">
                <div class="single-products">
                  <div class="productinfo text-center">
                    <router-link :to="`/productDetails/${pro.id}`" ><img
                      class="card-img-top"
                      :src="pro.product_image[0].image"
                      width="250"
                      height="250"
                      alt="Card image cap"
                    /></router-link>
                    <h2>Rs. {{ pro.product_price }}</h2>
                    <p>{{ pro.product_name }}</p>
                    <router-link :to="`/productDetails/${pro.id}`" class="btn btn-default add-to-cart" 
                      ><i class="fa fa-shopping-cart"></i>Add to cart</router-link>
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
</template>

<script>
import Sidebar from '../components/includes/Sidebar.vue'
import {categoryproduct,wishlist} from '../common/Service'
export default{
  name: "Products",
  components:{
    Sidebar
  },
  data(){
    return {
      proData: undefined,
      param: undefined,
      list: undefined,
      email:localStorage.getItem('uid'),
    };
  },
  mounted(){
      categoryproduct(this.param).then((res) => {
      console.log(res.data.products);
      this.proData = res.data.products;
    })
    .catch((err) => {
          console.log("Something Wrong " + err);
        });
  },
  watch:{
    $route(to){
      this.param = to.params.id;
      categoryproduct(this.param).then((res)=>{
        this.proData = res.data.products;
        console.log(res.data.products);
      })
      .catch((err) => {
          console.log("Something Wrong " + err);
        });
    }
  },
  created(){
    this.param = this.$route.params.id;
  },
  methods:{
    addWishlist(item) {
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
  }
   
  /* beforeRouteUpdate(to, from, next) {
    this.param = to.params.id;
    next();
  }, */
};
</script>
<style>
</style>