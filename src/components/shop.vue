<template>
    <div class="row mt-2">
        <div class="col-md-12  col-12 col-sm-12">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-12 col-12 col-sm-12 text-center">
                        <div class="form-group">
                            <select
                                class="form-control mt-3 col-md-4 col-12 col-sm-12 mx-auto"
                                name="checkList"
                                v-model="checkList"
                            >
                                <option disabled>请选择</option>
                                <option
                                    v-for="list in selectList"
                                        v-bind:key="list.id"
                                        v-bind:value="list.category"
                                >
                                  {{list.name}}
                                </option>
                            </select>
                        </div>
                        <div class="block mt-5 mx-auto col-md-8 col-12 col-sm-12">
                            <el-carousel height="190px">
                                <el-carousel-item v-for="item in lists" :key="item.id">
                                    <img :src="item.pic" alt="载入错误" width="400px;">
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>
                </div>
                <div class="row text-center" v-for="items in results" :key="items.id">
                    <div class="col-md-4 col-12 mt-5" v-for="item in items" :key="item.id" id="card">
                        <div class="card text-center justify-content-center">
                            <img :src="item.pic" class="card-img-top" alt="圖片載入錯誤 ！ 聯絡客服" style="height: 300px;" @click="getShopDetail(item.id)">
                            <div class="card-body">
                                {{item.name}}
                            </div>
                            <div class="price">
                                <p style="color: #FF0000">${{item.price}}</p>
                            </div>
                            <div>
                                <p v-if="item.count < 1">目前已无库存</p>
                            </div>
                            <div class="buy mb-2">
                                <button type="button" style="font-size: 13px;" class="btn btn-danger" @click="addCar(item)" id="addCar" v-if="item.count > 0">
                                    <i class="fas fa-shopping-cart"></i>加入购物车
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "shop",
        data() {
            return {
                todoes: [],
                checkList: 'cookie',
                lists: [
                    {
                        id:1,
                        pic: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595436464058&di=6221626140276df444294282868905dd&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fitbbs%2F1310%2F20%2Fc28%2F27750754_1382278135261.jpg\n'
                    },
                    {
                        id:2,
                        pic: 'https://blog.kkday.com/wp-content/uploads/Taiwan_Taipei_Taipei-101_AShutterstock_28310509.jpg'
                    },
                    {
                        id:3,
                        pic: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595436594553&di=b23e773709353369dd7d494753165c89&imgtype=0&src=http%3A%2F%2Fimg2.manshijian.com%2Fupload%2Fmember%2Fimage%2F31851%2F2792f31f165ab091a39d584f634aba0f_mobile.jpg'
                    },
                    {
                        id:4,
                        pic: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595436653634&di=0c7ab842a1bc77c6b8de45d4500c6c1c&imgtype=0&src=http%3A%2F%2Fnantou.fun-taiwan.com%2FImages%2FPlayNotes%2F856-G20100914105521.JPG'
                    },
                ],
                selectList: [
                    {
                        id: 1,
                        name: '凤梨酥 . 礼盒',
                        check: false,
                        category: "cookie"
                    },
                    {
                        id: 2,
                        name: '蜜蜂糖脆蛋糕',
                        category: "cake",
                        check: false
                    },
                    {
                        id: 3,
                        name: '原味茶系列',
                        category: "tea",
                        check: false
                    },
                    {
                        id: 4,
                        name: '全球果实计划',
                        category: "global",
                        check: false
                    },
                ]
            }
        },
        created(){
            this.getShop();
        },

        methods: {

          // 取得商品資訊
            getShop() {
              let dataes = [];
              let todos = [];
              let list = [];

                axios.get('http://ec2-54-199-244-110.ap-northeast-1.compute.amazonaws.com/php/data.php').then((res) => {

                    dataes = res.data.split(',');

                    for (let item of dataes) {

                      list = item.split(';');

                      // es6 對象解構
                      let {id,name,category,price,count,pic} = {id: list[0], name: list[1], category: list[2], price: list[3], count: list[4], pic: list[5]};
                      /*let popo = {
                        id: list[0],
                        name: list[1],
                        category: list[2],
                        price: list[3],
                        count: list[4],
                        pic: list[5]
                      }*/
                      todos.push({id,name,category,price,count,pic});
                    }
                    this.todoes = todos;
                })
            },

          // $router.push 跳轉
            getShopDetail(key) {
                this.$router.push({
                    name: 'detail',
                    params:{
                        id: key
                    }
                })
            },

          // 子傳父組件
            addCar(todo) {
                this.$emit('addItem',todo);
            }
        },
        computed:{
            results() {
                let list = this.todoes.filter(poop => poop.category === this.checkList);
                let i = 0 , j = 0, chunkArray = [] , chunk = list.length;
                for ( i , j ; i <= list.length ; i++, j += chunk) {
                    chunkArray[i] = list.slice(j , j += chunk);
                }
                    return chunkArray;
            }
        }
    }
</script>

<style scoped>

    * { box-sizing: border-box; }

    body { font-family: sans-serif; }


    #card{
        text-decoration: none;

    }

    #card a:hover{
        text-decoration: none;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

    /* pc */
    @media screen and (min-width: 1280px){

        .card{
            width: 20rem;
            border-radius: 10px;
            color: grey;
            font-size: 20px;
        }

        .buy{
            position: relative;
            bottom: 5px;
            left: 90px;
            color: grey;
        }

    }

    /* 手機 */

    @media screen  and (max-width: 767px){

      .card{
        width: 20rem;
        border-radius: 10px;
        color: grey;
        font-size: 20px;
      }

      .buy{
        position: relative;
        bottom: 5px;
        left: 90px;
        color: grey;
      }

      #card {
        margin-left: 18px;
      }
    }


    /* 平板 */

    @media screen  and (min-width: 768px) and (max-width: 1279px){

        .card{
            width: 18rem;
            border-radius: 10px;
            color: grey;
            font-size: 20px;
        }

        .buy{
            position: relative;
            bottom: 5px;
            left: 90px;
            color: grey;
        }

    }

</style>
