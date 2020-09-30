<template>
    <div class="footer">
        <div class="row text-center">
            <div class="col-12 col-sm-12 col-md-12">
                <div class="alert alert-light" role="alert">
                    &copy; 2019 HotsHills. 微風山丘
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-sm-12 col-md-12">
                <div class="alert alert-dark" role="alert">
                    <a href="#top">
                        <i class="fas fa-chevron-up text-center"></i>
                    </a>
                    <span id="people">{{people}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "popo",
        data(){
            return{
                people: null
            }
        },
        created(){
            this.getPeople();
        },
        methods:{
            getPeople(){
                this.people = '浏览人数 : ' + window.history.length;
            }
        }
    }
</script>

<style scoped>

    @media screen and (min-width: 1280px){

        div a{
            position: relative;
            left: 700px;
        }

        #people{
            color: grey;
            position: relative;
            left: 1300px;
        }

        .footer {
          position: fixed;
          bottom: 0;
        }

    }

    @media screen and (min-width: 768px) and (max-width: 1279px){

        div a{
            position: relative;
            left: 480px;
        }

        #people{
            color: grey;
            position: relative;
            left: 880px;
        }

    }

    @media screen and (max-width: 767px){

        div a{
            position: relative;
            left: 160px;
        }

        #people{
            color: grey;
            position: relative;
            left: 240px;
        }

    }
</style>
