<template>
    <div>
        <div class="mui-card" v-for="item in version1" :key="item.id">
            <div class="mui-card-header">版本：{{item.version}}</div>
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
        data(){
            return{
            version:[
                {id:1,version:"Build - 0.1",info:"构建初始版本，基础页面逻辑以及我的页面",bug:"暂无"},
                {id:2,version:"Build - 0.2",info:"新增版本信息，添加登陆、注册页面，评论组件，轮播图组件",bug:"暂无"},
                {id:3,version:"Build - 0.3",info:"新增登陆、注册请求逻辑，完善首页设计，新闻接口采用第三方接口",bug:"模拟请求测试暂无bug"},
                {id:4,version:"Build - 0.3.1",info:"新增个人信息页面，待完善",bug:"暂无"},
                {id:5,version:"Build - 0.3.2",info:"修复主页上方导航条显示返回按钮的错误",bug:"暂无"},
                {id:6,version:"Build - 0.4",info:"node服务端基础服务已可用，登陆测试与管理员登陆正常",bug:"处于管理员页面下点击 我的 按钮出现跳转回普通个人信息的页面"},
                {id:7,version:"Build - 0.4.1",info:"完成图书页面node服务端数据传递与展示，修复全局页面多余非空白部分，优化个人信息展示页面，新增信息修改和密码修改按钮",bug:"0.4版本bug暂未处理，图书页面图片暂时无法展示"},
                {id:8,version:"Build - 0.4.2",info:"调整0.4版本进入管理员面板与退出出现的逻辑错误bug，修改页面Toast统一底部展示",bug:"0.4.1版本图书页面图片暂时无法展示"},
                {id:9,version:"Build - 0.5",info:"新增图书信息详情页面；新增评论功能模板，评论功能已正常使用；新增评论验证功能，确认登陆状态，非登陆模式不允许评论；" +
                        "新增退出登陆清除所有缓存；优化部分页面逻辑，优化评论页面布局",bug:"0.4版本问题正常重新选择图书从服务端取回的模式"},
                {id:10,version:"Build - 0.5.1",info:"新增我的评论页面，优化登陆Toast的显示时间，优化登陆跳转速度",bug:"图片问题正在加紧处理中"},
                {id:11,version:"Build - 0.5.2",info:"新增图书预约页面，目前可以正常预约，相关逻辑待进一步完善",bug:"图片问题正在选择新方案"},
                {id:12,version:"Build → Release - 0.6 ",info:"新增我的预约页面，新增预约图书页面，完善图书预约逻辑，目前图书预约与评论系统普通用户权限功能已全部开通",bug:"图片问题正在预处理新方案"},
                {id:13,version:"Release - 0.6.1  ",info:"新增取消预约功能，新增删除评论功能",bug:"图片问题正在准备编码新方案"},
                {id:14,version:"Release - 0.6.2",info:"图片问题已经解决，完成管理员模块-评论管理",bug:"暂无"},
                {id:15,version:"Release - 0.6.3",info:"完成管理员模块-预约管理",bug:"暂无"},
                {id:15,version:"Release - 0.7 NEW！ ",info:"完成管理员模块-图书上架、反馈处理，图书馆基础功能基本完成",bug:"暂无"},

            ],
                version1:'',
        }},
        methods:{
            czversioninfo(){
                this.version1=this.version.reverse()
            }
        },
        created() {
            this.czversioninfo()
        }
    }
</script>

<style scoped>
    .version-h3{
        font-size: 13px;
        color: #8f8f94;
    }
</style>