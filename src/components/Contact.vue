<template>
  <div id="contact-page" class="container">
    <div class="bg">
      <div class="row">
        <div class="col-sm-12">
          <h2 class="title text-center">Contact <strong>Us</strong></h2>
          <!-- <div id="gmap" class="contact-map"></div> -->
        </div>
      </div>
      <div class="row">
        <div class="col-sm-8">
          <div class="contact-form">
            <h2 class="title text-center">Get In Touch</h2>
            <div class="status alert alert-success" style="display: none"></div>
            <form @submit.prevent="postContact()"
              id="main-contact-form"
              class="contact-form row"
              name="contact-form"
              method="post"
            >
              <div class="form-group col-md-6">
                <input
                  type="text"
                  name="name"
                  class="form-control"
                  required="required"
                  placeholder="Name"
                  v-model="nameContact"
                />
              </div>
              <div class="form-group col-md-6">
                <input
                  type="email"
                  name="email"
                  class="form-control"
                  required="required"
                  placeholder="Email"
                  v-model="emailContact"
                />
              </div>
              <div class="form-group col-md-12">
                <input
                  type="number"
                  name="contact"
                  class="form-control"
                  required="required"
                  placeholder="Contact No."
                  v-model="phoneContact"
                />
              </div>
              <div class="form-group col-md-12">
                <textarea
                  name="message"
                  id="message"
                  required="required"
                  class="form-control"
                  rows="8"
                  placeholder="Your Message Here"
                  v-model="messageContact"
                ></textarea>
              </div>
              <div class="form-group col-md-12">
                <input
                  type="submit"
                  name="submit"
                  class="btn btn-primary pull-right"
                  value="Submit"
                />
              </div>
            </form>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="contact-info">
            <h2 class="title text-center">Contact Info</h2>
            <address>
              <p>E-Shopper Inc.</p>
              <p>935 W. Webster Ave New Streets Chicago, IL 60614, NY</p>
              <p>Newyork USA</p>
              <p>Mobile: +91{{config[0].contact_no}}</p>
              <p>Fax: 1-714-252-0026</p>
              <p>Email: {{config[0].notification_email}}</p>
            </address>
            <div class="social-networks">
              <h2 class="title text-center">Social Networking</h2>
              <ul>
                <li>
                  <a href="#"><i class="fa fa-facebook"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-twitter"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-google-plus"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-youtube"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {userContact,configure} from '../common/Service'
export default {
  name: "Contact",
  data(){
    return{
          nameContact:null,
          emailContact:null,
          phoneContact:null,
          messageContact:null,
          config:undefined,
          }
  },
  methods:{
    postContact(){
      let formData = {name : this.nameContact, email:this.emailContact, contact:this.phoneContact, message:this.messageContact}
      userContact(formData)
      .then(res => {
        if(res){
          alert(res.data.message);
          location.reload();
          console.log(res.data);
        }
        else
        {
          console.log(res.data.err);
        }
      })
      .catch((err) => {
          console.log("Something Wrong " + err);
        });
    }
  },
  mounted(){
    configure().then(res=>{
    if(res){
      this.config = res.data.configure;
    }
  });
  },
}
</script>

<style>
</style>