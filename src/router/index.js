/* jshint esversion: 6 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import index from "@/components/index";
import register from "@/components/register";
import connection from '@/components/connection';
import introduction from "@/components/introduction";
import purchase from "@/components/purchase";
import  shop  from  "@/components/shop";
import INPUT from "@/components/INPUT";
import car from "@/components/car";
import shopDetails from "@/components/shopDetails";
import getCheck from "@/components/getCheck";
import successfully from "@/components/successfully";
import application from "@/components/application";

//使用 vue-router
Vue.use(VueRouter)

//匯出vue-router 設置
export default new VueRouter({
    routes: [
        {
          path: '/application' , component: application
        },
        {
            path: '' , alias: ['/home'] , component: index
        },
        {
            path: '/register' , component: register
        },
        {
            path: '/connection' , component: connection
        },
        {
            path: '/about' , component: introduction
        },
        {
            path: '/shop' , component: shop
        },
        {
            path: '/purchase' , component: purchase
        },
        {
            path: '/login' , component: INPUT
        },
        {
            path: '/car' , component: car , meta : {
                requiresAuth: true
            }
        },
        {
            path: '/shopDetails/:id' , component: shopDetails , name: 'detail'
        },
        {
            path: '/checkList' , component: getCheck , meta: {
                requiresAuth: true
            }
        },
        {
            path: '/successfully' , component: successfully , meta: {
                requiresAuth: true
            }
        }
    ]
})
