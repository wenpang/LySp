<template>
    <div class="row">
        <div class="col-12 col-sm-12 col-md-4 mx-auto">
            <div class="card">
                <div class="card-header" style="color: #FF8800">
                    <i class="fas fa-sign-in-alt"></i>會員登入
                </div>
                <div class="card-body mx-auto">
                    <form>
                        <div>
                        <div class="form-group col-12 col-md-12 ml-1">
                            <label for="username" class="col-form-label text-center"><strong>帳號 / email ： </strong></label>
                            <el-input @blur="checkUsername()" id="username" name="username" v-model.trim="user.username" placeholder="请输入账号" required minlength="6"></el-input>
                        </div>
                        <div class="ml-5">
                            <p id="usernameTip">{{Tip.usernameTip}}</p>
                        </div>
                        <div class="form-group col-12 col-md-12 ml-1">
                            <label for="password" class="col-form-label"><strong>密碼 : </strong></label>
                            <el-input placeholder="请输入密码" @blur="checkPassword()" v-model.trim="user.password" show-password id="password" required minlength="6" name="password"></el-input>
                        </div>
                        <div class="ml-5">
                            <p id="passwordTip">{{Tip.passwordTip}}</p>
                        </div>
                        <div class="form-group col-12 col-md-12 ml-1">
                            <label for="code" class="col-form-label"><strong>驗證碼 : </strong></label>
                            <el-input v-model.trim="user.code" name="code" required id="usercode"></el-input>
                            <div class="mt-4 text-center">
                                <button type="button" class="btn btn-primary" @click="createCode()" id="code">{{code}}</button>
                                <button type="button" class="btn btn-info ml-3" @click="createCode()">換一個</button>
                            </div>
                        </div>
                        <div class="login">
                            <button type="button" class="btn btn-warning" style="width: 150px;" @click="login()">登入</button>
                            <p id="message" class="mt-2">{{message}}</p>
                        </div>
                        <div class="mt-3 text-center">
                            您還沒有帳號嗎 ? 您可以點選
                            <router-link to="/register">
                                        <span class="register">
                                             註冊新帳號
                                        </span>
                            </router-link>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "INPUT",
        data() {
            return {
                Tip:{
                    usernameTip: '',
                    passwordTip: ''
                },
                message: '',
                code: '',
                user: {
                    username: '',
                    password: '',
                    code: ''
                }
            }
        },
        created() {
            this.createCode();
        },
        methods: {

            login() {

                if (this.user.username !== '' && this.user.password !== '' && this.user.code === this.code) {
                    let xhr = new XMLHttpRequest();
                    const username = document.getElementById('username');
                    const password = document.getElementById('password');
                    const message = document.getElementById('message');
                    const usercode = document.getElementById('usercode');
                    let code = document.getElementById('code');

                    xhr.open("POST", 'http://54.199.244.110/php/login.php', true);
                    xhr.addEventListener('load', () => {
                        if (xhr.status === 200) {
                            let data = xhr.responseText;
                            if (data === 'true') {
                                window.location.href = 'http://54.199.244.110/';
                                window.location.reload();
                            } else {
                                username.value = '';
                                password.value = '';
                                usercode.value = '';
                                message.textContent = '帳號密碼有誤';
                                code.textContent = '';
                                let codeLength = 5; //验证码的长度
                                let random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                                    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; //随机数
                                for (let i = 0; i < codeLength; i++) { //循环操作
                                    let index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）
                                    code.textContent += random[index]; //根据索引取得随机数加到code上
                                }
                            }
                        }
                    }, false)

                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
                    xhr.send('username=' + this.user.username + '&password=' + this.user.password);

                } else if (this.user.username !== '' && this.user.password !== '' && this.user.code !== this.code) {

                    this.message = '驗證碼錯誤 ! ';
                    this.user.username = '';
                    this.user.password = '';
                    this.user.code = '';
                    this.createCode();

                } else if (this.user.username === '' || this.user.password === '' && this.user.code === this.code) {

                    this.message = '帳號密碼有誤 ! ';
                    this.user.username = '';
                    this.user.password = '';
                    this.user.code = '';
                    this.createCode();

                } else if (this.user.username.trim().length < 6 || this.user.password.trim().length < 6 && this.user.code === this.code) {

                    this.message = '帳號密碼有誤 ! ';
                    this.user.username = '';
                    this.user.password = '';
                    this.user.code = '';
                    this.createCode();
                }
            },

            createCode() {

                this.code = '';
                let codeLength = 5; //验证码的长度
                let random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; //随机数
                for (let i = 0; i < codeLength; i++) { //循环操作
                    let index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）
                    this.code += random[index]; //根据索引取得随机数加到code上
                }
            },

            checkUsername() {
                if (this.user.username.length < 6) {
                    this.Tip.usernameTip = ' * 帳號長度不得 6 個字';
                } else {
                    this.Tip.usernameTip = '';
                }
            },

            checkPassword() {
                if (this.user.password.length < 6) {
                    this.Tip.passwordTip = ' * 密碼長度不得低於 6 个字';
                } else {
                    this.Tip.passwordTip = '';
                }
            }
        }
    }
</script>

<style scoped>

    .register{
        text-decoration: none;
    }

    .login a:hover{
        text-decoration: none;
    }

    #usernameTip, #passwordTip {
      color: #FF0000
    }


    @media screen and (min-width: 1280px){

        .card {
            margin-top: 100px;
        }

        .login {
            margin-left: 95px;
        }

        #message {
            color: #FF0000;
            margin-left: 23px;
        }

    }


    @media screen and (min-width: 768px) and (max-width: 1279px){

        .card {
            width: 350px;
            margin-top: 110px;
        }

        .login {
            margin-left: 80px;
        }

        #message {
            color:red;
            margin-left:26px;
        }
    }

    @media screen and (max-width: 767px){

        .login {
            margin-left: 100px;
        }

        #message {
            color:red;
            margin-left: 23px;
        }
    }

</style>
