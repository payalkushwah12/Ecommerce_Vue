<template>
  <div class="container jumbotron">
    <h2 class="text-center mb-3">{{cms.title}}</h2><br/>
    <p class="mt-3">{{cms.content}}</p>
  </div>
</template>

<script>
import {cmsdetails} from '../common/Service'
export default {
name:"CMS",
data(){
  return{
    cms:undefined,
    param: undefined,
  }
},
 mounted() {
    cmsdetails(this.param)
      .then((res) => {
        console.log(res.data.cms);
        this.cms = res.data.cms;
      })
      .catch((err) => {
        console.log("Something Wrong " + err);
      });
  },
  
  created() {
    this.param = this.$route.params.id;
}
}
</script>

<style>
p{
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

</style>