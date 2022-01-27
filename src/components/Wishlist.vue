<template>
  <section>
    <section id="cart_items">
      <div class="container">
        <div class="breadcrumbs">
          <ol class="breadcrumb">
            <li><router-link to="/">Home</router-link></li> 
            <li class="active">Wishlisted Items</li>
          </ol>
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
              <tr v-for="item of details" :key="item.id">
                <td class="cart_product">
                    <router-link to="#" ><img :src="server + item.product_image" alt="" width="120" height="100"/></router-link>
                </td>
                <td class="cart_description">
                  <h4><router-link to="#">{{item.product_name}}</router-link></h4>
                  <p>P_ID : {{item.product_code}}</p>
                </td>
                <td class="cart_price">
                  <p>Rs. {{item.product_price}}</p>
                </td>
                <td>
                    <router-link :to="`/productDetails/${item.product_id}`" class="btn btn-default add-to-cart" 
                      ><i class="fa fa-shopping-cart"></i>Add to cart</router-link>
                </td>
                <td class="cart_delete">
                  <button class="cart_quantity_delete" @click="delItem(item.id)"
                    ><i class="fa fa-times"></i
                  ></button>
                </td>
              </tr>
              
            </tbody>
          </table>
          
        </div>
      </div>
    </section>
    
  </section>
</template>

<script>
import {showWishlist,deleteItemWishlist} from '../common/Service';

export default {
  name: "Wishlist",
  data(){
      return {
          details:undefined,
          email:localStorage.getItem('uid'),
          server: "http://127.0.0.1:8000/uploads/",
      }
  },
  methods:{
      delItem(item){
          deleteItemWishlist(item).then(res=>{
              if(res){
                  if(res.data.message == 1)
                  {
                      this.$swal("Item removed from wishlist","","success");
                      window.location.reload();
                  }
                  else{
                      this.$swal("Item not removed from wishlist","","error");
                  }
              }
          })
          .catch((err) => {
            alert("Something Wrong" + err);
          });
      }
   },
  mounted(){
      showWishlist(this.email).then(res=>{
          if(res)
          {
              console.log(res.data);
              this.details = res.data.items;
          }
      })
      .catch((err) => {
            alert("Something Wrong" + err);
          });
  },

};
</script>

<style>
</style>