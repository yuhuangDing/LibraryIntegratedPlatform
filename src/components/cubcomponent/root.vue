<template>
    <div class="myroot">
        <div>
            <h3 class="root-h3-title">管理员控制中心</h3>
            <hr style="width: 60%;"/>
            <h5 class="title-en" >Administrators Control Center</h5>
        </div>
        <div class="gg-box">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <router-link to="/member/su/root/uAd" tag="li" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                   <img src="../../images/ugl.png" class="icon-box-9">
                    <div class="mui-media-body">用户管理</div></a></router-link>
                <router-link to="/member/su/root/oAd" tag="li" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/yysh.png" class="icon-box-9">
                    <div class="mui-media-body">预约审核</div></a></router-link>
                <router-link to="/member/su/root/cAd" tag="li" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/plcom.png" class="icon-box-9">
                    <div class="mui-media-body">评论管理</div></a></router-link>
                <router-link to="/member/su/root/lAd" tag="li" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/gccx.png" class="icon-box-9">
                    <div class="mui-media-body">馆藏管理</div></a></router-link>
                <router-link to="/member/su/root/ubAd" tag="li" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/sjts.png" class="icon-box-9">
                    <div class="mui-media-body">上架图书</div></a></router-link>
                <router-link  to="/member/su/root/suggestdeal" tag="li" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                    <img src="../../images/bugfk.png" class="icon-box-9">
                    <div class="mui-media-body">反馈处理</div></a></router-link>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "root"
    }
</script>

<style scoped>
    .myroot{

    }
    .root-h3-title{
        font-size: 28px;
        font-weight: bold;
        text-align: center;
        margin-top: 5px;
        color: #555555;
    }
    .title-en{
        text-align: center;
        margin-top:-5px;
    }
    .gg-box{
        margin-top: 10px;

    }
    .mui-grid-view.mui-grid-9{
        background-color: white;
    }
    .icon-box-9{
        width: 40px;
        height: 40px;
    }
</style>
<body>

