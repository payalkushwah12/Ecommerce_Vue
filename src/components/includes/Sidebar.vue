<template>
  <div class="col-sm-3">
    <div class="left-sidebar">
      <h2>Category</h2>
      <div class="panel-group category-products" id="accordian">
        <!--category-productsr-->
        <div class="panel panel-default" v-for="cat of catData" :key="cat.id">
          <div class="panel-heading">
            <h4 class="panel-title"><router-link :to="`/category/${cat.id}`">{{cat.category_name}}</router-link></h4>
          </div>
        </div>
      </div>

      <div class="shipping text-center">
        <!--shipping-->
        <img src="images/home/shipping.jpg" alt="" />
      </div>
      <!--/shipping-->
    </div>
  </div>
</template>

<script>
import { categories} from "../../common/Service"
export default {
  name: "Sidebar",
  data(){
      return {catData:undefined}
  },
  mounted(){
    categories()
    .then(res=>{
        console.log(res.data)
        this.catData=res.data;
    })
    .catch((err) => {
          console.log("Something Wrong " + err);
        });
  },
};
</script>

<style>
</style>
