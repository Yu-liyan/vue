<template>
<!-- 商品列表的步骤：需要url携带参数，如果有指定跳转到的页数那么就跳到那一页，如果没有默认跳到第一页 -->
    <div>
        <Nav-bar title="商品列表"></Nav-bar>
        <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :autoFill="isAutoFill">
        <ul>
            <li v-for="(goods) in goodsInfo" :key="goods.id">
                <a>
                    <img :src="goods.img_url">
                    <div class="title">{{goods.title|convert-title(10)}}</div>
                    <div class="desc">
                        <div class="sell">
                            <span>￥{{goods.sell_price}}</span>
                            <s>￥{{goods.market_price}}</s>
                        </div>
                        <div class="detail">
                            <div class="hot">
                                热卖中
                            </div>
                            <div class="count">
                                剩{{goods.stock_quantity}}件
                            </div>
                        </div>
                    </div>
                </a>
            </li>
        </ul>
        </mt-loadmore>
    </div>
</template>
<script>
    export default {
        props:['title'],
        data(){
            return {
                page:this.$route.query.pageindex || 1,
                goodsInfo:[],
                isAutoFill:false,//是否自动检测，并调用loadBottom
            }
        },
        created(){
            this.$axios.get('getgoods?pageindex='+this.page)
            .then(res=>{
                this.goodsInfo = res.data.message;
                console.log(this.goodsInfo);
            })
            .catch(err=>{
                console.log(err);
            })
        },
        methods:{
            loadBottom(){
                console.log(1)
            }
        }
    }
</script>
<style scoped>

ul {
    overflow: hidden;
}
li {
    width: 50%;
    float: left;
    padding: 6px;
    box-sizing: border-box;
}


li > a:not(.mui-btn) {
    margin: 0px;
    padding: 0px;
    border: 1px solid #5c5c5c;
    box-shadow: 0 0 4px #666;
    width: 100%;
    display: block;


}

li > a:not(.mui-btn) img {
     width: 100%;
}

.sell > span {
    float: left;
    color: red;
    text-align: left;
}

.detail >.hot {
    float: left;
    text-align: left;
    font-size: 15px;
}

.detail >.count {
    float: right;
    text-align: right;
    font-size: 15px;
}


/*撑开，去除浮动没有的高度*/

.detail {
    overflow: hidden;
}

.desc {
    color: rgba(92, 92, 92, 0.8);
    background-color: rgba(0, 0, 0, 0.2);
}

img {
    height: 200px;
}
.title{
    font-size: 12px;
}
</style>
