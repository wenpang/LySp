<template>
    <div>
        <div class="row" style="margin-top: 80px;">
            <div class="col-12 col-md-12 text-center">
                <p style="font-family: Pacifico,cursive;font-size: 30px;">
                    <b>點擊下載</b>
                </p>
            </div>
        </div>
        <div id="exe" class="mx-auto">
            <a href="http://www.taoomoney.com/exe/momo.zip">
                momo.zip
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "application"
    }
</script>

<style scoped>

    @media screen and (min-width: 1280px){

        #exe{
            text-align: center;
            background: deepskyblue;
            width: 120px;
            height: 30px;
            border-radius: 30px;
            margin-top: 30px;

        }

        #exe a{
            color: black;
        }


        #exe a:hover{

            text-decoration: none;

        }

    }

    @media screen and (min-width: 768px) and (max-width: 1279px){

        #exe{
            text-align: center;
            background: deepskyblue;
            width: 120px;
            height: 30px;
            border-radius: 30px;
            margin-top: 30px;
        }

        #exe a{
            color: black;
        }


        #exe a:hover{

            text-decoration: none;

        }

    }

    @media screen and (max-width: 767px){

        #exe{
            text-align: center;
            background: deepskyblue;
            width: 120px;
            height: 30px;
            border-radius: 30px;
            margin-top: 30px;
            margin-left: 133px;
        }

        #exe a{
            color: black;
        }


        #exe a:hover{

            text-decoration: none;

        }


    }
</style>
