<template>
    <div>
        <transition enter-active-class="animated slideInDown"
                    leave-active-class="animated slideOutUp" appear>
            <div>
                <div class="imgDiv">
                    <img src="../../images/error.png"  class="logo"  >
                </div>
                <div>
                    <h3 class="error-h2">亲爱的用户请登陆后再访问操作</h3>
                    <p class="error-p">我们将引导你回到正确的步骤！</p>
                </div>
            </div>
    </transition>
        <transition enter-active-class="animated slideInUp"
                    leave-active-class="animated slideOutUp" appear>
            <mt-button size="large" class="mybutton" @click="tologin" >登&nbsp;&nbsp;&nbsp;&nbsp;录</mt-button>
        </transition>

    </div>
</template>

<script>

    export default {
        name: "error",
        methods:{
            tologin(){
                this.$router.push('/member/loginuser')
            }
        }
    }
</script>

<style scoped>
    .imgDiv{
        margin-top: 20px;
        display: flex;
        justify-content: center;

    }
    .error-h2{
        margin-top: 20px;
        font-size: 25px;
        color: #555555;
        text-align: center;
    }
    .error-p{
        margin-top: 30px;
        margin-bottom: 20px;
        font-size: 18px;
        color: #555555;
        text-align: center;

    }
    /* 修改默认 butoon 的样式  */
    .mint-button--default {
        background: -webkit-linear-gradient(left, #ffcac5, #ff6671) no-repeat;
        border-radius: 25px;
        color: #fff;
        height: 48px;
    }
    /* 同上 */
    .mint-button--primary {
        border-radius: 25px;
        height: 48px;
        background-color: transparent;
        border: 1px solid #ff95b7;
        color: #ff51b9
    }


</style>