<template>
    <div class="cardForm mt-5 mx-auto">
        <div class="col-12 col-md-12 col-sm-12 mt-3 mx-auto">
            <el-steps :active="active" finish-status="success">
                <el-step title="確認訂單明細"></el-step>
                <el-step title="收件方式"></el-step>
                <el-step title="完成訂購"></el-step>
            </el-steps>
        </div>
        <div class="card mt-5">
            <div class="card-body mt-4">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" method="post" action="http://54.199.244.110/php/success.php">
                    <p style="color: #FF0000" id="message" class="text-center mb-3"></p>
                    <el-form-item label="姓名" prop="name" class="mr-5">
                        <el-input v-model.trim="ruleForm.name" name="name"></el-input>
                    </el-form-item>
                    <el-form-item label="手機號碼" prop="cellphone" class="mr-5">
                        <el-input v-model.trim="ruleForm.cellphone" name="cellphone"></el-input>
                    </el-form-item>
                    <el-form-item label="预寄送達日" required>
                        <el-col :span="11">
                            <el-form-item prop="date1">
                                <el-date-picker type="date" placeholder="選擇日期" v-model.trim="ruleForm.date" name="date" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="即时配送" prop="delivery">
                        <el-switch v-model.trim="ruleForm.delivery" name="delivery"></el-switch>
                    </el-form-item>
                    <el-form-item label="留言给賣家" prop="opinion">
                        <el-input type="textarea" v-model.trim="ruleForm.opinion" name="opinion"></el-input>
                    </el-form-item>
                    <div class="node">
                        <button type="button" v-on:click="previous" class="btn btn-warning previos">上一步</button>
                        <button type="submit" class="btn btn-warning success ml-2">完成訂單</button>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

    export default {
        name: "getCheck",
        data(){
            return{
                active: 2,
                message: '',
                ruleForm: {
                    name: '',
                    cellphone: null,
                    date: '',
                    delivery: '',
                    type: [],
                    resource: '',
                    opinion: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入您的姓名', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    cellphone: [
                        { required: true, message: '请输入您的手机', trigger: 'blur' }
                    ],
                    date: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
                    ],
                    resource: [
                        { required: false, message: '请选择优惠卷', trigger: 'change' }
                    ],
                    opinion: [
                        { required: false, message: '请填写留言', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {

            previous() {
                axios.get('http://54.199.244.110/php/previous.php').then(
                    (res) => {
                        if (res.data || res.data === 'true') {
                            console.log(res.data)
                        }
                    }
                )
                this.$router.replace('/car');
            }
        }
    }
</script>

<style scoped>

  /* pc 端 */
    @media screen and (min-width: 1280px){

        .cardForm{
            width: 500px;
        }

        .node {
            margin-top: 50px;
            margin-left: 150px;
        }
    }

  /* 平板 */
    @media screen and (max-width: 1279px) and  (min-width: 768px){

        .cardForm{
            width: 500px;
        }

        .node {
            margin-top: 50px;
            margin-left: 150px;
        }
    }

  /* 手機 */
    @media screen and (max-width: 767px){

        .cardForm{
            width: 100%;
        }

        .node {
            margin-top: 50px;
            margin-left: 90px;
        }
    }

</style>
