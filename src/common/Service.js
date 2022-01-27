import axios from 'axios';
import { MAIN_URL } from '@/common/Url';
export function userLogin(data)
{
    return axios.post(`${MAIN_URL}login`,data)
}
export function userRegister(data)
{
    return axios.post(`${MAIN_URL}register`,data)
}
export function userContact(data){
    return axios.post(`${MAIN_URL}contact`,data)
}
export function categories(){
    return axios.get(`${MAIN_URL}category`)
}
 export function categoryproduct(id){
    return axios.get(`${MAIN_URL}categories/${id}`)
} 
export function products(){
    return axios.get(`${MAIN_URL}products`)
}
export function productdetails(id){
    return axios.get(`${MAIN_URL}productdetails/${id}`)
}
export function editProfile(id){
    return axios.get(`${MAIN_URL}editProfile/${id}`)
}
export function updateProfile(data){
    return axios.post(`${MAIN_URL}updateProfile`,data)
}
export function changePassword(data){
    return axios.post(`${MAIN_URL}changePassword`,data)
}
export function wishlist(data){
    return axios.post(`${MAIN_URL}addWishlist`,data)
}
export function showWishlist(email){
    return axios.get(`${MAIN_URL}showWishlist/${email}`)
}
export function deleteItemWishlist(id){
    return axios.get(`${MAIN_URL}deleteItemWishlist/${id}`)
}
export function coupons(){
    return axios.get(`${MAIN_URL}coupons`)
}
export function userOrders(data){
    return axios.post(`${MAIN_URL}userOrders`,data)
}
export function userAddress(data){
    return axios.post(`${MAIN_URL}userAddress`,data)
}
export function banners(){
    return axios.get(`${MAIN_URL}banners`)
}
export function myOrders(email){
    return axios.get(`${MAIN_URL}myOrders/${email}`)
}
export function ordersDetails(data){
    return axios.post(`${MAIN_URL}myOrdersDetails`,data)
}
export function cms(){
    return axios.get(`${MAIN_URL}cms`)
}
export function cmsdetails(id){
    return axios.get(`${MAIN_URL}cmsdetails/${id}`)
}
export function configure(){
    return axios.get(`${MAIN_URL}configure`)
}
export default {userLogin,userRegister,userContact,categories,products,productdetails,
    categoryproduct,editProfile,updateProfile,changePassword,wishlist,showWishlist,deleteItemWishlist,
    coupons,userOrders,userAddress,banners,myOrders,ordersDetails,cms,cmsdetails,configure};