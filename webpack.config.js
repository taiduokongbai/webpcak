const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const uglify = require('uglifyjs-webpack-plugin');  // uglifyJs only supports ES5
// const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({minimize: true});   //代码压缩  一般用于生产环境

module.exports = {
    /* "__dirname"是node.js中的一个全局变量，它指向当前执行脚本所在的目录 */
    devtool: 'null',    //'null' 能大大压缩我们的打包代码  source-map  eval-source-map
    entry: __dirname + "/src/index.js",//已多次提及的唯一入口文件
    // 如果不设置output，生产环境和开发环境的时候 index.html 里引入的js脚本的路径不一致, 因为server运行以后生成的文件是在服务器上/根目录下，而run dev生成的文件是在本地的磁盘上
    output: {
        path: __dirname + "/dist",//打包后的文件存放的地方
        filename: "bundle.js"//打包后输出文件的文件名
    },
    /* 驼峰命名法 */
    devServer: {
        contentBase: './dist', //默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录
        historyApiFallback: true,  // 如果设置为true，所有的跳转将指向index.html
        inline: true, // 设置为true，当源文件改变时会自动刷新页面
        // port: 8888,   // 这里可以自己设置启动端口  默认为8080
        hot: true
    },
    /* 由于webpack3.* webpack2.*已经内置可处理JSON文件，这里我们无需再添加webpack1.*需要的json-loader */
    module: {
        rules: [   // webpack1 的时候写 loaders
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",   // webpack1 的时候可以写 loader: "babel"，2.0的版本开始，必须写 "babel-loader"
                    options: {   // webpack1 的时候可以写 query
                        presets: [
                            "env", "react", "es2015",
                        ],
                    },
                },
                exclude: /node_modules/
                // type: "javascript/auto",    
                //module.rules 中的 type 就是新增加的属性，用来支持不同的模块类型。
                /**
                 *  javascript/auto : (webpack3中默认)支持所有的JS模块系统：CommonJS、AMD、ESM。
                    javascript/esm : EcmaScript模块，所有其他模块系统不可用（.mjs文件中默认）。
                    javascript/dynamic : 不支持CommonJS和EcmaScript模块。
                    json : JSON数据，可以通过require和import导入（.json文件默认）。
                    webassembly/experimental : WebAssembly模式（目前处于实验性阶段，.wasm文件默认）。
                 */

            },  {
                test: /\.(less)$/,
                include: [/[\\/]node_modules[\\/].*antd/],
                use: ['style-loader', 'css-loader', {
                    loader: 'less-loader', // compiles Less to CSS
                    options: {
                        javascriptEnabled: true
                    }
    
                }]
            }, {
                test: /\.(scss|css)$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
                /* use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader",
                    options: {
                        modules: true, // 指定启用css modules
                        minimize: true
                        //localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css类名格式 class="Greeter__root--hHjmq"  如果不使用这句话 在F12中class名正常显示
                    }
                }, {
                    loader: "postcss-loader",
                    // plugins: () => [
                    //     require("autoprefixer")({
                    //         browsers: ['last 2 versions', 'ie >= 9']
                    //     })
                    // ]
                }] */
            }, {
                test: /.(jpg|png|gif|svg)$/,
                use: ['url-loader?name=img/[hash:8].[name].[ext]&limit=8192&outputPath=/']    /*解析图片*/
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究!'),
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.template.html',  //new 一个这个插件的实例，并传入相关的参数
            filename: './index.html'
        }),
        new webpack.HotModuleReplacementPlugin(), //热加载插件，
        new ExtractTextPlugin({
            filename: 'css/[name].css?[chunkhash]',
            allChunks: true
        }),
        // new uglify()
        //    new ExtractTextPlugin("index.css")
    ]
}
