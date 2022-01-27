<template>
  <section>
    <section id="cart_items">
      <div class="container">
        <div class="breadcrumbs">
          <ol class="breadcrumb">
            <li><router-link to="/">Home</router-link></li>
            <li class="active">My Orders</li>
          </ol>
        </div>
        <div class="table-responsive cart_info">
          <table class="table table-condensed">
            <thead>
              <tr class="cart_menu">
                <td class="image">Product Image</td>
                <td class="description">Product name</td>
                <td class="description">Email</td>
                <td class="quantity">Product Quantity</td>
                <td class="price">Product price</td>
                <td class="price">Coupon Used</td>
                <td class="price">Coupon Discount</td>
                <td class="quantity">Status</td>
                <td class="total">Total Amount</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item of details" :key="item.id" >
                <td class="cart_product">
                  <router-link to="#"
                    ><img :src="item.product_image" alt="" width="120" height="100"
                  /></router-link>
                </td>
                <td>
                    {{ item.product_name }}
                </td>
                <td>
                  <p>{{ email }}</p>
                </td>
                <td  class="d">
                  <p>
                    {{item.product_quantity }}
                  </p>
                </td>
                <td>
                  <p>Rs. {{ item.product_price }}</p>
                </td>
                <td>
                  <p>
                    {{item.coupon_used }}
                  </p>
                </td>
                <td >
                  <p>
                    {{item.coupon_discount }}
                  </p>
                </td>
                <td>
                  <p>{{ item.order_status }}</p>
                </td>
                <td  class="d">
                  <p>
                    Rs. {{ item.total_amount }}
                  </p>
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
import {myOrders} from '../common/Service'
export default {
  name: "MyOrders",
  data() {
    return {
      details: undefined,
      email:localStorage.getItem("uid")
    };
  },
  mounted() {
    myOrders(this.email).then(res=>{
        if(res){
            console.log(res.data.myorders);
            this.details = res.data.myorders;
        }
    })
  },
};
</script>

<style>
.d{
    text-align: center;
}
</style>