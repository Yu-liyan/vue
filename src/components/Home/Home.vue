<template>
    <div>
        <!-- 轮播图 -->
        <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(pic,index) in imgs" :key = "index">
            <a :href="pic.url">
                <img v-bind:src="pic.img" alt="">
            </a>
        </mt-swipe-item>
        </mt-swipe>
        <!-- 九宫格 -->
        <my-ul>
            <my-li v-for="(r,index) in homeRouters" :key="index">
                 <router-link :to="r.router">
                   <div :class="'back-img ' + r.className">
                       {{r.title}}
                   </div>
                  
                 </router-link>
            </my-li>
        </my-ul>
       
    </div> 
</template>  
<script>
export default {
     //   created 适合操作数据，此时数据已经完成了初始化
     created(){
         this.$axios.get('getlunbo')
        .then(res=>{
            this.imgs = res.data.message;
           
        })
    },
  methods: {
  },

  data() {
    return {
      imgs: [],
      homeRouters:[{
          className:'news',
          title:'新闻列表',
          router:{name:'news.list'}
      },{
          className:'pic',
          title:'图文分享',
           router:{name:'photo.list',params:{categoryId:0}}
      },{
          className:'goods',
          title:'商品列表',
           router:{name:'goods.list',params:{goodsId:1}}
          
      },{
          className:'feedback',
          title:'留言反馈',
           router:{name:'news.list'}
      },{
          className:'search',
          title:'搜索资讯',
           router:{name:'news.list'}
      },{
          className:'callme',
          title:'练习我们',
           router:{name:'news.list'}
      }]
    };
  }
};
</script>  
<style scoped>
/* 轮播图样式 */
    .mint-swipe-item img{
        width: 100%;
    }
    .mint-swipe{
        height: 30%;
    }
    /*九宫格样式*/
.back-img{
        background-size: 50px;
        background-repeat: no-repeat;
        background-position: 34px 34px;
        font-size: 18px;
        font-family: 'Microsoft YaHei';
}
.news{
    background-image: url(../../static/img/feedback.png)
}
.pic {
    background-image: url(../../static/img/picShare.png)
}
.goods{
    background-image: url(../../static/img/goodShow.png)
}
.feedback{
    background-image: url(../../static/img/feedback.png)
}
.search{
    background-image: url(../../static/img/search.png)
}
.callme{
    background-image: url(../../static/img/callme.png)
}

li a{
    color:black;
}
</style>