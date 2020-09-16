<template>
    <div class="row todo-group text-center" id="index">
        <div class="col-12 col-sm-12 col-md-4" >
            <h4>
                {{video.text}}
            </h4>
            <div class="card mt-4">
                <!-- iframe 首頁載入時會造成阻塞 -->
                <iframe height="280" src="https://www.youtube.com/embed/UWuSei83nMQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
        <div class="col-12 col-sm-12 col-md-4"  v-for="item in pices" :key="item.url" id="index2">
            <router-link :to="item.url">
                <h4>{{item.text}}</h4>
                <div class="card mt-4">
                    <img :src="item.pic" class="card-img-top" :alt="errorimg" height="280">
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                errorimg: '圖片載入錯誤',
                video: {
                    text: '旅行．微风山丘上的人情温度'
                },
                pices: [
                    {
                        pic: `https://www.sunnyhills.com.tw/Upload/zh-tw/images/index170502184836889.jpg`,
                        text: '陽光燦爛的山丘',
                        url: '/about'
                    },
                    {
                        pic: `https://www.sunnyhills.com.tw/Upload/zh-tw/images/index190524103852514.jpg`,
                        text: '網路購物',
                        url: '/shop'
                    }
                ]
            }
        }
    }
</script>

<style scoped>

    .todo-group a:hover{
        text-decoration: none;
    }

    .todo-group a{
        text-decoration: none;
        color: black;
    }

    .todo-group{
        font-family: Pacifico,cursive;
    }

    /* pc 端 */
    @media screen and (min-width: 1280px){

        #index {

            margin-top: 100px;

        }
    }

    /* 平板 */
    @media screen and (min-width: 768px) and (max-width: 1279px){

        #index {

            margin-top: 100px;
        }
    }

    /* 手機 */
    @media screen and (max-width: 767px){

        #index {

            margin-top: 120px;
        }

        #index2{
            margin-top: 50px;
        }
    }
</style>
