<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-12 col-sm-12 mt-4 justify-content-center mx-auto">
                <el-steps :active="active" finish-status="success">
                    <el-step title="確認訂單明細"></el-step>
                    <el-step title="收件方式"></el-step>
                    <el-step title="完成訂購"></el-step>
                </el-steps>
            </div>
        </div>
        <div class="row mt-5 justify-content-center">
            <div class="col-12 col-md-9 col-sm-12 mr-3">
                <table class="table">
                    <thead style="border: 2px solid #666666">
                    <tr>
                        <th scope="col" colspan="5" style="color: orange;border: 2px solid #666666">
                            <h3 class="ml-2">优惠訊息</h3>
                            <ul class="mt-3">
                                <li>
                                    商品金額差 NT$ 9,580 即可享9折最高優惠
                                </li>
                                <li class="mt-2">
                                    為適當反應營運成本，配送至離島地區將依訂購金額級距計算運費。
                                </li>
                                <li class="mt-2">
                                    春日甜點好食光！凡指定 6/30 前到貨，消費滿500元即享免運(限本島配送)
                                </li>
                            </ul>
                        </th>
                    </tr>
                    </thead>
                    <thead>
                    <tr>
                        <th scope="col">商品</th>
                        <th scope="col">數量</th>
                        <th scope="col">小計</th>
                        <th scope="col">取消</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="todo in checkCar" :key="todo.id">
                        <td>
                            <img :src="todo.pic" width="100" height="100" style="float: left">
                            <p style="float: left;" id="shopname">{{todo.name}}</p>
                        </td>
                        <td>
                            <input type="number" id="count" min="0" v-model.trim="todo.count" max="20">
                        </td>
                        <td>
                            <div id="total">
                                ${{todo.price * todo.count}}
                            </div>
                        </td>
                        <td>
                            <div id="delete">
                                <el-button type="text" @click="deleteItem(todo.name)">
                                    <i class="fas fa-trash" style="color: #FF0000"></i>
                                </el-button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="5" style="padding-top: 30px;">
                            <p style="position: absolute; right: 40px;bottom: 4px;color: #FF0000;" >合计 : $ {{total}}  元</p>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="row mt-4 justify-content-center">
            <div class="col-12 col-md-12 col-sm-12 text-center">
                <el-button class="next btn btn-warning">
                    <router-link to="/shop" style="color: black;padding: 10px;width: 40px;">
                        繼續購物
                    </router-link>
                </el-button>
                <el-button @click="next()" class="ml-3 next btn btn-warning">
                    <router-link to="/car" style="color: #000000;padding: 10px;width: 40px;">
                        下一步
                    </router-link>
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
   import axios from 'axios';

    export default {
        name: "car",
        props: ['checkCar'],
        data() {
            return {
                number: 1,
                todos: [],
                active: 1,
                money: 0
            }
        },
        created() {
            this.getPrevios();
            this.clearCheckList();
        },
        computed: {

            total() {

                let money = 0;

                for (let item of this.checkCar) {
                  if (item.count > 0 && item.price > 0 && item.count <= 20){
                    money += (item.price * item.count);
                  }
                }
              return money

                /*for (let i = 0; i < this.checkCar.length; i++) {

                    if (this.checkCar[i].count > 0 && this.checkCar[i].price > 0 && this.checkCar[i].count <= 20) {

                    }
                }*/

            }
        },
        methods: {

            clearCheckList() {
                if (this.checkCar.length !== 0){

                    for (let i = 0; i < this.checkCar.length; i++) {

                        if (this.checkCar[i].id === "" || this.checkCar[i].id === null || this.checkCar[i].id.length === 0 ) {

                            this.checkCar.splice(i, 1);

                            return;
                        }
                    }
                }
            },

            getPrevios() {

                let lists;
                axios.get("http://54.199.244.110/#/php/create.php").then(
                    (res) => {
                        let popo = res.data.split(';');
                      for (let i = 0; i < popo.length; i++) {
                        let list = popo[i].split(',')
                        if (list[0].length !== 0 && list[1].length !== 0 && list[2].length !== 0 && list[3].length !== 0 && list[4].length !== 0) {
                          lists = {
                            id: list[0],
                            name: list[1],
                            price: list[2],
                            count: list[3],
                            pic: list[4]
                          }
                          let repeat = this.checkCar.find(res => res.id === lists.id);
                          if (repeat){
                            return;
                          } else {
                            this.checkCar.push(lists);
                          }
                        }
                      }
                    })
            },

            next() {

                if (this.checkCar.length > 0) {
                    if (this.active++ > 2){ this.active = 2}
                    let lists = '';

                    for (let item of this.checkCar) {
                      lists += item.id + ',' + item.name + ',' + item.price + ',' + item.count + ',' + item.pic + ';';
                    }

                    /*for (let i = 0; i < this.checkCar.length; i++) {
                        lists += this.checkCar[i].id + ',' + this.checkCar[i].name + ',' + this.checkCar[i].price + ',' + this.checkCar[i].count + ',' + this.checkCar[i].pic + ';';
                    }*/

                    let xhr = new XMLHttpRequest();
                    xhr.open('POST', 'http://54.199.244.110/#/php/checkList.php', true);
                    xhr.addEventListener('load', () => {
                        if (xhr.status === 200) {
                            console.log('success')
                        }
                    }, false);
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
                    xhr.send('data=' + lists);
                    this.$router.push('/checkList');
                }
            },

            deleteItem(popo) {
                this.$confirm('确定删除此项商品 ? ' , {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    for (let i = 0; i < this.checkCar.length; i++) {
                        if (this.checkCar[i].name === popo) {
                            this.checkCar.splice(i, 1)
                            break;
                        }
                    }
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'error',
                        message: '已取消删除'
                    });
                });
            }}}
</script>

<style scoped>

    .back a:hover{
        text-decoration: none;
    }

    .next a:hover{
        text-decoration: none;
    }

    .next {
      margin-top: 12px;
      background: darkorange
    }

    /* pc 端 */
    @media screen and (min-width: 1280px){

        li{
            list-style: square inside;
        }

        ul{
            margin-left: 60px;
        }

        #count {

            width: 50px;
            margin-top: 35px;
        }

        #shopname{

            margin-top:40px;
            margin-left:20px;
            color: grey;
        }

        #total {

            margin-top:35px;
            color: red;
        }

        #delete {
            margin-top:30px;
        }

    }

    /* 平板 */
    @media screen and (max-width: 1279px) and  (min-width: 768px){

        li{
            list-style: square inside;
        }

        ul{
            margin-left: 60px;
        }

        #shopname{

            margin-top:40px;
            margin-left:20px;
            color: grey;
        }

        el-input-number{
            width: 80%;
        }

        #total {
            margin-top:30px;
            margin-left:15px;
            color: red;
        }

    }

    /* 手機 */
    @media screen and (max-width: 767px) {

        li{
            list-style: square inside;
        }

        ul{
            margin-left: 10px;
        }

        #shopname {

            margin-top: 5px;
            color: grey;

        }

        #total {

            margin-top: 45px;
            color: red;
        }

        #count {

            width: 50px;
            margin-top: 45px;
        }

        #delete {
            margin-top: 40px;
        }
    }
</style>
