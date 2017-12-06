<template>
    <div>
        <!-- 头部与底部是不变的，公共部分 -->
         <mt-header title="传智34期"></mt-header>
         <!-- 留坑，填不同的页面 -->
        <router-view class="teml"></router-view>
        <!-- 底部 -->
        <mt-tabbar v-model="selected">
        <mt-tab-item id="home">
        <img slot="icon" src="../static/img/index.png">
        首页
         </mt-tab-item>
        <mt-tab-item id="member">
        <img slot="icon" src="../static/img/vip.png">
        会员
        </mt-tab-item>
        <mt-tab-item id="shopcart">
        <img slot="icon" src="../static/img/shopcart.png">
        购物车
        </mt-tab-item>
        <mt-tab-item id="search">
        <img slot="icon" src="../static/img/find.png">
        查找
        </mt-tab-item>
        </mt-tabbar>
    </div> 
</template>  
<script>
export default {
  data(){
    return {
      selected:''
    }
  },
 watch:{
    selected(newV){
      this.$router.push({
        name:newV
      });
    }
  }
};
</script>  
<style scoped>
.teml{
 margin-bottom: 55px;
}
  .mint-tabbar{
    bottom:0;
    position: fixed;
  }
 </style>