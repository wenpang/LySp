<template>
    <div class="cardForm mt-5 mx-auto">
        <el-steps :active="active" finish-status="success">
            <el-step title="確認訂單明細"></el-step>
            <el-step title="收件方式"></el-step>
            <el-step title="完成訂購"></el-step>
        </el-steps>
        <div id="success" class="text-center">
            <img alt="载入错误" src="https://previews.123rf.com/images/vectorknight/vectorknight1802/vectorknight180200101/95581062-check-mark-logo-vector-or-icon-tick-symbol-in-green-color-illustration-accept-okey-symbol-for-approv.jpg" width="200">
            <h3 class="mt-5">已完成訂單</h3>
        </div>
    </div>
</template>

<script>
    export default {
        name: "successfully",
        data(){
            return{
                active: 3,
            }
        }
    }
</script>

<style scoped>

    @media screen and (min-width: 1280px){

        .cardForm{
            width: 500px;
            margin-left: 490px;
            margin-top: 100px;
        }

        #success{
            margin-top: 100px;
        }

    }

    @media screen and (max-width: 1279px) and  (min-width: 768px){

        .cardForm{
            width: 500px;
            margin-left: 240px;
            margin-top: 130px;
        }

        #success{
            margin-top: 100px;
        }

    }

    @media screen and (max-width: 767px){

        .cardForm{
            width: 100%;
        }

        #success{
            margin-top: 100px;
        }

    }


</style>
