<template>
    <div>
      <!-- header -->

        <el-menu
                id="top"
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
            <el-submenu index="1">
                <template slot="title">
                    <i class="fas fa-stream"></i>
                </template>
                <el-menu-item v-for="list in lists" :key="list.title" :index="list.id">
                    <router-link :to="list.url">
                        <p style="color: #f5f5f5">&nbsp;{{list.title}}</p>
                    </router-link>
                </el-menu-item>
                <el-submenu index="1-6">
                    <template slot="title">會員管理</template>
                    <el-menu-item index="1-6-1">
                        <router-link to="/login">
                            <p class="login">登入</p>
                        </router-link>
                    </el-menu-item>
                    <el-menu-item index="1-6-2">
                        <router-link to="/register">
                            <p class="register">加入會員</p>
                        </router-link>
                    </el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="2" v-if="user !== ''">
                <router-link to="/member">
                    <span id="user">
                        <i class="fas fa-user" style="color: #f5f5f5;font-size: 20px"></i>&nbsp;{{user}}
                    </span>
                </router-link>
            </el-menu-item>
            <el-menu-item index="3">
                <router-link to="/shop">
                    <i class="fas fa-shopping-bag" style="color: #f5f5f5;font-size: 20px"></i>
                </router-link>
            </el-menu-item>
            <el-menu-item index="4">
                <router-link to="/car">
                    <i class="fas fa-shopping-cart" style="color: #f5f5f5;font-size: 20px"></i>
                    <span class="badge badge-danger" style="vertical-align: super;border-radius: 18px;" v-show="totalCar.length !== 0">
                            {{totalCar.length}}
                    </span>
                </router-link>
            </el-menu-item>
            <el-menu-item index="5" v-show="user.trim().length === 0">
                <router-link to="/login">
                    <i class="fas fa-sign-in-alt" style="color: #f5f5f5;font-size: 20px"></i>
                </router-link>
            </el-menu-item>
            <el-menu-item index="6">
                 <span @click="signout()">
                        <i class="fas fa-sign-out-alt" style="font-size: 20px;color: #f5f5f5"></i>
                 </span>
            </el-menu-item>
            <div class="announcement">
              <router-link to="/">
                <i class="fas fa-bell" style="font-size: 25px;color: #FF8888" id="bell"></i>
              </router-link>
            </div>
        </el-menu>
        <div class="carousel slide" data-ride="carousel"  id="carouselExampleIndicators" >
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <router-link to="/shop">
                        <img src="./picture/header.jpg" class="d-block w-100" :alt="errorimg">
                    </router-link>
                </div>
                <div class="carousel-item">
                    <router-link to="/shop">
                        <img src="./picture/header2.jpg" class="d-block w-100" :alt="errorimg">
                    </router-link>
                </div>
                <div class="carousel-item">
                    <router-link to="/shop">
                        <img src="./picture/header3.jpg" class="d-block w-100" :alt="errorimg">
                    </router-link>
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
        <marquee direction="right" width="100%" height="25px" scrollamount="7" bgcolor="red" style="color:whitesmoke;margin: 0;font-family: Pacifico,cursive;font-size: 17px;">
            <i class="fas fa-bullhorn"></i> 由於疫情關係 ， 實體店面暫停營業 ， 若需要訂購商品歡迎至本網路商場訂購
        </marquee>

        <!-- router-view content 部分 -->

        <div class="container-fluid element">
            <router-view  @addItem="addList" :checkCar="totalCar" @addlist="addList"></router-view>
        </div>

      <!-- footer -->


        <div class="alert alert-dark text-center footer" role="alert">
          <a href="#top">
            <i class="fas fa-chevron-up text-center"></i>
          </a>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "todo",
        data(){
            return {
                user : '',
                activeIndex2: '1',
                totalCar: [],
                searchString: '',
                errorimg: '圖片載入錯誤',
                lists: [
                    {
                        id: '1-1',
                        url: '/',
                        title:'首页'
                    },
                    {
                        id: '1-2',
                        url: '/shop',
                        title:'網路購物'
                    },
                    {
                        id: '1-3',
                        url: '/purchase',
                        title:'購買方式'
                    },
                    {
                        id: '1-4',
                        url: '/connection',
                        title:'聯絡我們'
                    },
                    {
                        id: '1-5',
                        url: '/application',
                        title:'微风山丘小程序'
                    }
                ]
            }
        },
        created(){
          this.getUser();
        },
        methods:{

          // 登出
            signout(){
                axios.get('http://54.199.244.110/php/signout.php').then(
                    (res) => {
                        console.log(res);
                        this.$message({
                            message: '已成功登出 ！ ',
                            type: 'success',
                            showClose: true,
                            center: true,
                            offset: 60 ,
                            duration: 3000
                        });
                        window.setTimeout(() => window.location.reload(),10);
                    }, (err) => {
                        console.log(err);
                        this.$message({
                            message: '登出失败 ！ ',
                            type: 'error',
                            showClose: true,
                            center: true,
                            offset: 60 ,
                            duration: 3000
                        });
                        window.setTimeout(() => window.location.reload(),10);
                    });
            },



            getUser() {

                let user = [];

                axios.get('http://54.199.244.110/php/SESSION.php').then(
                    (res) => {

                        user = res.data.split(';');

                        this.user = user[0].substring(1, user[0].length);
                    }
                )
            },


          // 加入購物車 and 判斷商品是否已經存在購物車
            addList(value) {
                const distinct = this.totalCar.find(res => res.name === value.name); //返回 true or false
                if (distinct) {
                    value.count++;    // 如果已存在,增加商品數量
                } else {
                    this.totalCar.push(value);
                }
            }
        }
    }
</script>

<style scoped>

    template{
        font-family: "Microsoft JhengHei UI",serif;
    }

    h5 {
        text-decoration: none;
    }

    .listBar h5 {
        text-decoration: none;
    }

    .listBar a:hover{
        text-decoration: none;
    }

    .fa-shopping-cart {
        color: #f5f5f5;
    }

    .signout a:hover{
        text-decoration: none;
    }

    .login{
        color: whitesmoke;
        text-decoration: none;
    }

    .title a:hover{
        text-decoration: none;
    }

    el-menu-item a:hover{
        text-decoration: none;
    }

    .announcement {
      position: absolute;
      right: 40px;
      top: 20px;
    }

    .register {
      color: #f5f5f5;
    }

    .register:hover {
      text-decoration: none;
    }


    /* pc */

    @media screen and (min-width: 1280px) {

        .carousel-inner , .carousel-item{
            height: 280px;
        }

        .element {
            margin-top: 20px;
        }

        .announcement {
          position: absolute;
          right: 40px;
          top: 20px;
        }

        #bell{
          animation-name: bell ;
          animation-iteration-count: infinite;
          animation-duration: 1s;
          animation-direction: alternate;
          animation-timimg-function: linear;
        }

      @keyframes bell {
        from {
          transform: rotate(20deg);
        }
        to {
          transform: rotate(-20deg);
        }
      }

      .footer {
        margin-top: 120px;
      }
    }

    /* 手機 */

    @media screen and (max-width: 767px) {

        .carousel-inner {
            height: 200px;
        }

        .element {
            margin-top: 70px;
        }

      .footer {
        margin-top: 70px;
      }

      .announcement {
        position: absolute;
        right: 25px;
        top: 22px;
      }

      #bell{
        animation-name: bell ;
        animation-iteration-count: infinite;
        animation-duration: 1s;
        animation-direction: alternate;
        animation-timimg-function: linear;
      }

      @keyframes bell {
        from {
          transform: rotate(20deg);
        }
        to {
          transform: rotate(-20deg);
        }
      }

    }

    /* 平板 */
    @media screen and (min-width: 768px) and (max-width: 1279px){

        .carousel-inner {
            height: 280px;
        }

        .footer {
          margin-top: 120px;
        }

      .announcement {
        position: absolute;
        right: 30px;
        top: 22px;
      }

      #bell{
        animation-name: bell ;
        animation-iteration-count: infinite;
        animation-duration: 1s;
        animation-direction: alternate;
        animation-timimg-function: linear;
      }

      @keyframes bell {
        from {
          transform: rotate(20deg);
        }
        to {
          transform: rotate(-20deg);
        }
      }
    }
</style>
