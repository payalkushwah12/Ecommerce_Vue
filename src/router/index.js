import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import Main from '../components/Main.vue'
import Contact from '../components/Contact.vue'
import Login from '../components/Login.vue'
import Products from '../components/Products.vue'
import Cart from '../components/Cart.vue'
import Checkout from '../components/Checkout.vue'
import ProductDetails from '../components/ProductDetails.vue'
import Account from '../components/Account.vue'
import Register from '../components/Register.vue'
import Wishlist from "../components/Wishlist.vue";
import MyOrders from "../components/MyOrders.vue";
import CMS from '../components/CMS.vue';
function myGaurd(to,from,next)
{
    let isAuthenticated = false;
    if(localStorage.getItem('uid')!=undefined){
        isAuthenticated = true;
    }
    else
    {
        isAuthenticated  = false;
    }
    if(isAuthenticated)
    {
        next();
    }
    else{
        alert("Login First");
        next("/login");
    }
}
export default new Router({
    routes:[
        {
            path:'/',
            name:'Main',
            component:Main,
        },
        {
            path:'/category/:id',
            name:'Products',
            component:Products
        },
        {
            path:'/contact',
            name:'Contact',
            component:Contact
        },
        {
            path:'/login',
            name:'Login',
            component:Login
        },
        {
            path:'/register',
            name:'Register',
            component:Register
        },
        {
            path:'/productDetails/:id',
            name:'ProductDetails',
            component:ProductDetails
        },
        {
            path:'/cart',
            name:'Cart',
            component:Cart
        },
        {
            path:'/checkout',
            name:'Checkout',
            beforeEnter:myGaurd,
            component:Checkout
        },
        {
            path:'/account',
            name:'Account',
            beforeEnter:myGaurd,
            component:Account
        },
        {
            path:'/wishlist',
            name:'Wishlist',
            beforeEnter:myGaurd,
            component:Wishlist
        },
        {
            path:'/myorders',
            name:'MyOrders',
            beforeEnter:myGaurd,
            component:MyOrders
        },
        {
            path:'/explore/:id',
            name:'CMS',
            component:CMS,
        },
        
    ]
})