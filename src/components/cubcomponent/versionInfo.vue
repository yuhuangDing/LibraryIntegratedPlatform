<template>
    <div>
        <div class="mui-card" v-for="item in version" :key="item.id">
            <div class="mui-card-header">当前版本：{{item.version}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>版本信息：</p>
                    <p class="version-h3">{{item.info}}</p>
                </div>
            </div>
            <div class="mui-card-footer">已知Bug：{{item.bug}}</div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "versionInfo",
        data(){return{
            version:[
                {id:1,version:"Build-0.1",info:"构建初始版本，基础页面逻辑以及我的页面",bug:"暂无"},
                {id:2,version:"Build-0.2",info:"新增版本信息，添加登陆、注册页面，评论组件，轮播图组件",bug:"暂无"},
                {id:3,version:"Build-0.3",info:"新增登陆、注册请求逻辑，完善首页设计，新闻接口采用第三方接口",bug:"模拟请求测试暂无bug"},
                {id:4,version:"Build-0.3.1",info:"新增个人信息页面，待完善",bug:"暂无"},
                {id:5,version:"Build-0.3.2",info:"修复主页上方导航条显示返回按钮的错误",bug:"暂无"},
                {id:6,version:"Build-0.4",info:"node服务端基础服务已可用，登陆测试与管理员登陆正常",bug:"处于管理员页面下点击 我的 按钮出现跳转回普通个人信息的页面"}
            ]
        }}
    }
</script>

<style scoped>
    .version-h3{
        font-size: 13px;
        color: #8f8f94;
    }
</style>