<template>
    <div class="container-fluid">
        <div class="row mt-5">
            <div class="col-12 col-md-5 col-sm-12 mx-auto" v-for="todo in results" :key="todo.id">
                <div class="card">
                    <img :src="todo.url" class="card-img-top" alt="载入错误" height="450">
                    <div class="detail text-center mt-3">
                        <el-carousel :interval="4000" type="card" height="100px">
                            <el-carousel-item v-for="item in data" :key="item.id">
                                <img :src="item.pic" alt="载入错误" width="100px;" @click="todo.url = item.pic">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <div class="text-center mt-5">
                        <p style="color: #666666">
                            <b>{{todo.name}}</b>
                        </p>
                        <p style="color: #FF8800">
                            ${{todo.price}}
                        </p>
                        <p style="color: 	#FF0000" v-if="todo.count !== '0'" class="mt-2">庫存還有 {{todo.count}}</p>
                        <p style="color: #888888" v-if="todo.count === '0'" class="mt-2">目前已無庫存</p>
                    </div>
                    <div class="add mt-3 text-center mb-3">
                        <button type="button" class="btn btn-danger" v-if="todo.count !== '0'" @click="addCar(todo)">加入购物车</button>
                    </div>
                    <hr>
                    <div class="feature ml-4">
                        <p style="color: #888888">
                            <strong>商品特色</strong>
                        </p>
                        <p class="mr-2" style="text-align: left">
                            烈日下熟成的鳳梨經過削切、熬煮<br>
                            將燦爛的陽光封存成最天然而且美味的餡<br>

                            酥皮是用健康飼養的鮮力蛋®（每一顆都找得到生產履歷）<br>
                            天然奶油和日本麵粉揉成；沒有任何人工合成的添加<br>

                            樸實美點<br>
                            是一個做了將近五十年糕餅的老師傅反璞歸真之作<br>
                            我們稱它 - 陽光烘熟的美點<br>
                        </p>
                    </div>
                    <hr>
                    <div class="feature ml-4">
                        <p style="color: #888888;font-size: 15px;">
                            <strong>詳細説明</strong>
                        </p>
                        <ul type="square">
                            <li style="font-size: 15px;">
                                內容物：鳳梨、奶油、麵粉、蛋、砂糖、麥芽糖、奶粉、芝士粉、煉乳、鹽
                            </li>
                        </ul>
                    </div>
                    <hr>
                    <div class="feature ml-4">
                        <p style="color: #888888;font-size: 15px;">
                            <strong>保存方式</strong>
                        </p>
                        <ul type="square" style="font-size: 15px;">
                            <li>
                                鳳梨酥：保存期限25天
                            </li>
                            <li>
                                蜜豐糖脆蛋糕：保存期限90天
                            </li>
                            <li>
                                保存期限內含生產及配送天數，有效期限依外盒標示為主。
                            </li>
                            <li>
                                避免放置潮濕高溫或曝曬之場所。
                            </li>
                        </ul>
                    </div>
                    <hr>
                    <div class="feature ml-4">
                        <p style="color: #888888;font-size: 15px;">
                            <strong>運送說明</strong>
                        </p>
                        <ul type="square" style="font-size: 15px;">
                            <li style="color: #FF0000" type="none">
                                <b>台灣運送说明</b>
                            </li>
                            <li>
                                鳳梨酥：保存期限25天
                            </li>
                            <li>
                                蜜豐糖脆蛋糕：保存期限90天
                            </li>
                            <li>
                                保存期限內含生產及配送天數，有效期限依外盒標示為主。
                            </li>
                            <li>
                                避免放置潮濕高溫或曝曬之場所。
                            </li>
                            <li style="color: #FF0000" type="none">
                                <b>離島地區運送說明</b>
                            </li>
                            <li>
                                冷凍冷藏商品不提供離島配送服務
                            </li>
                            <li>
                                常溫商品宅配運費規則請參閱宅配運費方案。
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

        name: "shopDetails",
        data() {
            return {
                results: [],
                data:[
                    {
                        id:1,
                        pic: 'https://shop.sunnyhills.com.tw/images/product/402881a149f5d9ff0149f5db0ac40000_2.jpg'
                    },
                    {
                        id:2,
                        pic: 'https://shop.sunnyhills.com.tw/images/product/402881a149f5d9ff0149f5db0ac40000_3.jpg'
                    },
                    {
                        id:3,
                        pic: 'https://shop.sunnyhills.com.tw/images/product/402881a149f5d9ff0149f5db0ac40000_4.jpg'
                    }
                ]
            }
        },
        methods: {

            addCar(wowo) {
                this.$emit('addlist',wowo)
            },

            getShopDetail() {
                let xhr = new XMLHttpRequest();
                let dataes = [];
                xhr.open("POST",'http://54.199.244.110/php/shopDetail.php',true);
                xhr.addEventListener('load',() => {
                    if (xhr.status === 200){
                        let data = xhr.responseText;
                        let item = data.split(';');
                        let res = {
                          id: item[0],
                          name: item[1],
                          category: item[2],
                          price: item[3],
                          count: item[4],
                          url: item[5]
                        };
                        dataes.push(res);
                    }
                },false);
                xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");
                xhr.send('id=' + this.$route.params.id);
                this.results = dataes;
            }
        },
        created() {
            this.getShopDetail();
        }
    }
</script>

<style scoped>

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .feature{
        float: left;
    }

</style>
