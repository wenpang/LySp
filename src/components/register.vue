<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-5 mx-auto">
                <div class="card">
                    <div class="card-header">
                        <h5 style="color: #FF7744">
                            <i class="fas fa-sign-in-alt"></i> 加入会员
                        </h5>
                    </div>
                    <div class="card-body list">
                        <form>
                            <div class="input-group">
                                <label for="name">* 姓名 : </label>
                                <span>
                                    <el-input  style="width: 175px;margin-left: 15px;" name="name" v-model.trim="members.name" id="name" placeholder="请输入姓名" required @blur="checkName()"></el-input>
                                </span>
                            </div>
                            <p id="tipName">

                            </p>
                            <div class="input-group">
                                <label for="type">* 性別 : </label>
                                <span>
                                    <select name="type" id="type" v-model.trim="members.type" style="width: 80px;margin-left: 15px;">
                                        <option disabled>请选择</option>
                                        <option value="men">先生</option>
                                        <option value="women">小姐</option>
                                    </select>
                                </span>
                            </div>
                            <p style="color: orangered;font-size: 13px;margin-left: 30px;" class="mt-3">
                                ＊Email 將成為您的會員帳號
                            </p>
                            <div class="input-group">
                                <label for="email">* Email : </label>
                                <span>
                                    <el-input type="email" style="width: 170px;margin-left: 10px;" @blur="checkEmail()" name="email" id="email" v-model.trim="members.email" placeholder="请输入内容"></el-input>
                                </span>
                            </div>
                            <p style="color: #FF0000;margin-left: 40px;margin-top: 10px;" id="tipEmail">

                            </p>
                            <div class="input-group">
                                <label for="cellphone">* 手机号码 : </label>
                                <span>
                                    <el-input type="tel" style="width: 150px;margin-left: 15px;" @blur="checkPhone()" name="cellphone" placeholder="请输入电话号码" v-model.trim="members.phone" id="cellphone"></el-input>
                                </span>
                            </div>
                            <p style="color: #FF0000;margin-left: 40px;margin-top: 10px;" id="tipPhone">

                            </p>
                            <div class="input-group">
                                <label for="password">* 设定密码  : </label>
                                <span>
                                    <el-input  style="width: 150px;margin-left: 15px;" @blur="checkPassword()" name="password" placeholder="输入6~12个英数混合字元" id="password" v-model.trim="members.password" show-password></el-input>
                                </span>
                            </div>
                            <p id="tipPassword">

                            </p>
                            <div class="input-group">
                                <label for="password2">* 确认密码 : </label>
                                <span>
                                <el-input name="password2" style="width: 150px;margin-left: 15px;" placeholder="输入6~20个英数混合字元" id="password2" v-model.trim="members.password2" show-password></el-input>
                                </span>
                            </div>
                            <div class="input-group mt-3">
                                <label for="code" class="col-form-label">* 验证码 : </label>
                                <span>
                                    <el-input name="code" style="width: 150px;margin-left: 15px;" required id="code" v-model.trim="members.code"></el-input>
                                </span>
                            </div>
                            <p id="tipCode">

                            </p>
                            <div class="code mt-3">
                                <button type="button" class="btn btn-primary" @click="createCode()">{{code}}</button>
                                <button type="button" class="btn btn-info ml-3" @click="checkCode()">验证</button>
                            </div>
                            <div class="agree text-center mt-3" style="color: orangered">
                                <input type="checkbox" value="" name="agree" id="agree" v-model.trim="value">
                                <label for="agree" class="ml-2">
                                    同意我們的個資保護聲明。
                                </label>
                            </div>
                            <p id="tipAgree">

                            </p>
                            <div class="submit mt-4">
                                <button type="button"  class="btn btn-warning" style="width: 200px;" @click="setPost($event)">送出</button>
                            </div>
                            <p class="mt-2" id="message"></p>
                            <div class="login mt-4">
                                如果您已经有賬號了 ? 但请直接點選
                                <router-link to="/login">
                                    <span class="login">
                                         登入
                                    </span>
                                </router-link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


    export default {
        name: "register",
        data() {
            return {
                value: false,
                code: '',
                tip: false,
                members:{
                    name: '',
                    type: '请选择',
                    email: '',
                    phone: null,
                    password: '',
                    password2: '',
                    code: ''
                }
            }
        },
        created(){
            this.createCode();
        },
        methods: {

          // 注冊
            setPost(e) {
                let xhr = new XMLHttpRequest();
                let message = document.getElementById('message');
                let name = document.getElementById('name');
                let email = document.getElementById('email');
                let password = document.getElementById('password');
                let password2 = document.getElementById('password2');

                if (this.members.name !== '' && this.members.cellphone !== ''  && this.members.password2 !== '' && this.members.password !== '' && this.members.email !== '' && this.members.type !== '') {

                    xhr.open('POST', 'http://ec2-54-199-244-110.ap-northeast-1.compute.amazonaws.com/php/register.php', true);
                    xhr.addEventListener('load', () => {

                        if (xhr.status === 200) {
                            let data = xhr.responseText;
                            if (data !== 'true') {
                                name.value = '';
                                email.value = '';
                                password.value = '';
                                password2.value = '';
                                message.textContent = data;
                            } else {
                                window.location.href = 'http://ec2-54-199-244-110.ap-northeast-1.compute.amazonaws.com/#/login'
                            }
                        }
                    })
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
                    xhr.send('name=' + this.members.name + '&type=' + this.members.type + '&email=' + this.members.email + '&cellphone=' + this.members.phone + '&password=' + this.members.password + '&password2=' + this.members.password2 + '&agree=' + this.value);
                } else {
                    e.preventDefault();
                    message.textContent = '请检查表单内容' ;
                }
            },

            checkName() {
              const nameTip = document.getElementById('tipName')
              if (this.members.name.trim().length === 0 || this.members.name === '') {
                nameTip.textContent = '* 姓名必填栏位'
              } else {
                nameTip.textContent = '';
              }
            },

            checkEmail() {
                const emailTip = document.getElementById('tipEmail')
                if (this.members.email.trim().length === 0 || this.members.email === '') {
                  emailTip.textContent = '* Email 为必填栏位'
                } else {
                  emailTip.textContent = '';
                }
            },

            checkPhone() {
                const phoneTip = document.getElementById('tipPhone');
                if (this.members.phone === null) {
                  phoneTip.textContent = '* 电话为必填栏位'
                } else {
                  phoneTip.textContent = '';
                }
            },

            checkPassword() {
                const password = document.getElementById('tipPassword');
                if (this.members.password.length < 6) {
                    password.textContent = '密码长度不得小于 6 '
                } else if (this.members.password.length > 12) {
                    password.textContent = '密码长度不得大于 12 '
                } else {
                    password.textContent = ''
                }
            },

            checkAgree($event) {
                const Check = document.getElementById('agree');
                const tipAgree = document.getElementById('tipAgree');
                if (!Check.checked) {
                    $event.preventDefault();
                    tipAgree.textContent = '请同意条款';
                } else {
                    tipAgree.textContent = '';
                }
            },

            checkCode() {
                const node = document.getElementById('tipCode');
                if (this.members.code.trim().length === 0) {
                    node.textContent = '* 请输入验证码';
                    this.members.code = '';
                    this.createCode();
                } else if (this.members.code.trim() !==  this.code){
                    node.textContent = '* 验证码错误 ! 请重新输入';
                    this.members.code = '';
                    this.createCode();
                } else {
                    node.textContent = '';
                }
            },
          // 產生驗證碼
            createCode() {
                this.code = '';
                let codeLength = 5; //验证码的长度
                let random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; //随机数
                for (let i = 0; i < codeLength; i++) { //循环操作
                    let index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）
                    this.code += random[index]; //根据索引取得随机数加到code上
                }
            }
        }
    }
</script>

<style scoped>

    .login{
        text-decoration: none;
    }

    .login a{
        text-decoration: none;
    }

    #tipName #tipPassword #tipAgree{
      color: #FF0000;
      margin-left: 40px;
      margin-top: 10px;
    }

    #tipCode{
      color: #FF0000;
      margin-left: 60px;
      margin-top: 10px;
    }

    /* pc端 */

    @media (min-width: 1280px) {

        .card {

            margin-top: 70px;
        }

        .list{
            margin-left: 80px;
        }

        .code {
            margin-left: 50px;
        }


        #message {
            margin-left: 80px;
            margin-top: 30px;
            color: #FF0000;
        }


        .agree {
            margin-right: 50px;
        }

        .submit {

            margin-left: 35px;
        }

    }

    /* 平板 */

    @media (min-width: 768px) and (max-width: 1279px){



        .list{
            margin-left: 40px;
        }

        .code {
            margin-left: 60px;
        }

        #message {
            margin-left: 70px;
            margin-top: 30px;
            color: #FF0000;
        }

        .agree {
            margin-right: 45px;
        }

        .card {

            margin-top: 70px;
        }

        .submit {

            margin-left: 20px;
        }


    }

    /* 手机移动端 */

    @media (max-width: 767px) {


        .code {
            margin-left: 50px;
        }

        #message {
            margin-left: 80px;
            margin-top: 30px;
            color: #FF0000;
        }

        .list{
            margin-left: 25px;
        }

        .submit {

            margin-left: 35px;
        }

    }

</style>
