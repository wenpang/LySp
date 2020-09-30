<template>
    <div class="container-fluid">
        <hr/>
        <div class="row mt-5 justify-content-center">
            <div class="col-10 col-md-10 col-sm-10 text-center">
                <div>
                    <h1 class="display-5"><strong>購買方式</strong></h1>
                </div>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-12 col-md-4 col-sm-12 text-center mt-4">
                <h4><b>電話訂購</b></h4>
                <ul type="none">
                    <li class="mt-3" v-for="item in connects" v-bind:key="item">
                        {{item}}
                    </li>
                </ul>
            </div>
            <div class="col-12 col-md-4 col-sm-12 text-center mt-2">
                <h4><b>門市現場購買</b></h4>
                <ul type="none">
                    <li class="mt-3" v-for="item in location" :key="item">
                      {{ item }}
                    </li>
                </ul>
            </div>
            <div class="col-12 col-md-4 col-sm-12 text-center  mt-2">
                <h4><b>線上訂購</b></h4>
                <ul type="none">
                    <li class="mt-3" v-for="item in pay" :key="item">
                      {{ item }}
                    </li>
                    <li class="mt-5 getShop">
                        <router-link to="/shop">
                            <div style="width: 180px;height: 80px;background: lightsalmon;padding-top: 25px;border-radius: 5px" class="mt-3">
                                <p class=" text-center" style="color: #888888"><b>直接購買</b></p>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "purchase",
        data() {
          return {
            connects: ['客服電話：0972438188','服務時間：週一至六 09:00-18:00','貨到付款(不另加手續費)','轉帳或匯款：當您的訂單資料成立後，我們會寄發手機簡訊通知您此筆訂單專屬的帳號資訊，請您依據此組帳號進行轉帳即可；提醒您需於到貨日2天前完成匯款，以利如期出貨。'],
            location: ['台北 • 民生公園','南投 • 三合院','高雄 • 駁二特區','SunnyHills To Go • 台北101購物中心','SunnyHills To Go • 新光三越信義A9','SunnyHills To Go • 桃園機場第二航廈','. 接受新台幣及信用卡付款'],
            pay: ['貨到付款 ( 不另加手續費 )','線上刷卡：可接受 VISA, Master, JCB','常溫商品單筆訂購金額滿NT$3,000免收運費，未滿加收NT$100。','冷藏及冷凍商品，因運費計算方式不同，訂購規則請詳 [ 宅配運費方案 ]。']
          }
        }
    }
</script>

<style scoped>

    .container-fluid{
        text-decoration: none;
    }

    .container-fluid a:hover{
        text-decoration: none;
    }

    @media screen and (min-width: 1280px){

        .getShop {

            margin-left: 140px;
        }
    }

    @media screen and (max-width: 1279px) and  (min-width: 768px){

        .getShop {

            margin-left: 40px;
        }
    }

    @media screen and (max-width: 767px){

        .getShop {

            margin-left: 75px;
        }
    }

</style>
