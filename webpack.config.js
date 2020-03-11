var path=require('path')
var htmlWebpackPlugin=require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports={
    //输入和输出文件
    entry:path.join(__dirname,'./src/main.js'),
    output: {
        path:path.join(__dirname,'./dist'),
        filename: "bundle.js"
    },
    plugins: [//插件
        new htmlWebpackPlugin({template: path.join(__dirname,'./src/index.html'),//模板文件
            filename:'index.html'},//生成文件
        ),
        new VueLoaderPlugin(),
    ],
    module: {//loader匹配规则
        rules: [
            {test:/\.vue$/,use:'vue-loader'},//处理vue文件
            {test:/\.css$/,use:['style-loader' ,'css-loader']},//处理css文件的loader
            {test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},//处理字体的loader
            {test:/.\.js$/,use:'babel-loader',exclude:/node_modules/},//配置babel的规则
            {test: /\.(jpg|png|jpeg|bmp)$/, use:[ {loader: 'url-loader',options: {esModule:false}}] },//处理图片url,
        ]
    }
}