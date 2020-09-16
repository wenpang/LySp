<template>
    <div class="connection">
        <div class="container">
            <div class="row mt-4 text-center justify-content-center">
                <div class="col-md-4 col-sm-4 col-12 mt-3" v-for="connect in connects" :key="connect.main">
                <span v-html="connect.pic">
                    {{connect.pic}}
                </span>&nbsp;
                    <span>{{connect.main}}</span>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-md-12 col-sm-12 col-12">
                    <p class="openTime text-center">服務時間 週一至六 09:00-18:00</p>
                </div>
            </div>
            <hr>
            <div class="row mt-3 text-center justify-content-center">
                <div class="col-md-5 col-12 col-sm-12">
                    <div class="opinion">
                        <form method="post">
                            <div class="card">
                                <h5 class="card-header"><strong>聯絡我們</strong></h5>
                                <div class="card-body">
                                    <label for="name"><b class="set">姓名 : </b></label>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="name" name="name" v-model.trim="opinion.name">
                                    </div>
                                    <label for="tel"><b class="set">電話 : </b></label>
                                    <div class="form-group">
                                        <input type="tel" class="form-control" id=tel name="tel" v-model.trim="opinion.telephone">
                                    </div>
                                    <label for="email"><b class="set">Email : </b></label>
                                    <div class="form-group">
                                        <input type="email" class="form-control" id="email" name="email" v-model.trim="opinion.email">
                                    </div>
                                    <label for="email"><b class="set">驗證碼 : </b></label>
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="code" v-model.trim="opinion.code">
                                    </div>
                                    <div class="form-group">
                                        <button type="button" class="btn btn-primary" @click="createCode()">{{code}}</button>
                                        <button type="button" class="btn btn-info ml-3" @click="validate">驗證</button>
                                    </div>
                                    <label for="content"><b class="set">聯絡内容 : </b></label>
                                    <div class="input-group">
                                        <textarea class="form-control" aria-label="With textarea" v-model.trim="opinion.content" maxlength="300" name="content" id="content"></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-primary justify-content-center mt-4">提交</button>
                                </div>
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
        name: "connection",
        data() {
            return {
                code: '',
                opinion: {
                    name: '',
                    telephone: '',
                    email: '',
                    code: '',
                    content: ''
                },
                connects: [
                    {
                        pic: '<i class="fas fa-phone-alt"></i>',
                        main: '(+886) 0972438188'
                    },
                    {
                        pic: '<i class="fas fa-fax"></i>',
                        main: '02-27600509'
                    },
                    {
                        pic: '<i class="fas fa-envelope-open"></i>',
                        main: 'fgh0226291@gmail.com'
                    },
                ]
            }
        },
        created(){
            this.createCode();
        },
        methods: {
            createCode() {
                this.code = '';
                let codeLength = 5; //验证码的长度
                let random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; //随机数
                for(let i = 0; i < codeLength; i++) { //循环操作
                    let index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）
                    this.code += random[index]; //根据索引取得随机数加到code上
                    }
                },

            validate() {
                let inputCode = this.code; //获取输入框内验证码并转化为大写
                if(this.opinion.code.length <= 0) { //若输入的验证码长度为0
                    alert("请输入验证码！"); //则弹出请输入验证码
                    this.opinion.code = '';
                    this.createCode();
                }
                else if(this.opinion.code !== inputCode) { //若输入的验证码与产生的验证码不一致时
                    alert("验证码输入错误!"); //则弹出验证码输入错误
                    this.createCode(); //刷新验证码
                    this.opinion.code  = '';//清空文本框
                } else { //输入正确时
                    alert("验证码正确"); //弹出
                }
            }
        }
    }

</script>

<style scoped>

    .set{
      font-family: Pacifico,cursive;
    }

    .openTime{
        font-size: 25px;
    }
</style>
