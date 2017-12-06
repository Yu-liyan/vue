// 引入资源
import Vue from 'vue';

// 引入路由相关组件
import App from './components/App.vue';
import Home from './components/Home/Home.vue';
import Member from './components/Member/Member.vue';
import Shopcart from './components/Shopcart/Shopcart.vue';
import Search from './components/Search/Search.vue';
import NewsList from './components/News/NewsList.vue';
import NewsDetail from './components/News/NewsDetail.vue';
import PhotoList from './components/photo/PhotoList.vue';
import PhotoDetail from './components/photo/PhotoDetail.vue';
// 引入测试路由---评论
import Comment from './components/Commons/Comments.vue';


// 注册全局组件
import MyUl from './components/Commons/MyUl.vue';
import MyLi from './components/Commons/MyLi.vue';
import NavBar from './components/Commons/NavBar.vue';//引入标题栏公共组件
Vue.component(NavBar.name,NavBar);
Vue.component(MyUl.name,MyUl);
Vue.component(MyLi.name,MyLi);

// 注册全局过滤器
// 引入时间处理工具
import Moment from 'moment';
Vue.filter('convert-time',(value)=>{
    return Moment(value).format('YYYY-MM-DD');
});
// 处理title太长的问题
Vue.filter('convert-title',(value,limit)=>{
    if(value.length > limit){
        return value.substr(0,13) + '...'
    }
    // 返回原数据
    return value
})
// 引入图片预览
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// vue-router开始
import VueRouter from 'vue-router';
// 安装插件
Vue.use(VueRouter);
// 创建路由对象
let router = new VueRouter();
// 创建路由规则
router.addRoutes([
    {path:'/',redirect:{
        name:'home'
    }},
    {name:'home',path:'/home',component:Home},//首页组件
    {name:'member',path:'/member',component:Member},//会员中心
    {name:'shopcart',path:'./shopcart',component:Shopcart},//购物车
    {name:'search',path:'/search',component:Search},//搜索
    {name:'news.list',path:'/home/newsList',component:NewsList},//新闻列表
    {name:'news.detail',path:'/home/newsDetail',component:NewsDetail},//新闻详情页
    {name:'photo.list',path:'/home/photoList/:categoryId',component:PhotoList},//图文分享列表
    {name:'photo.detail',path:'/home/photoDetail/:imgId',component:PhotoDetail},//商品缩略图详情
    { name:'test',path:'/test',component:Comment},//测试评论的路由

])
// vue-router 结束

// mint-ui开始
import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUi);
// mint-ui结束

// 引入自己写的样式，把它引在这个位置是因为，可能有些样式需要覆盖原本的样式
import './static/css/global.css';

// axios开始
import Axios from 'axios';
// 将它挂载给vue的原型上以便于vue的实例对象使用
Vue.prototype.$axios = Axios;
Axios.defaults.baseURL = 'http://vue.studyit.io/api/';
// axios结束

new Vue({
    el:'#app',
    render:c=>c(App),
    router
})