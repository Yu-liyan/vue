<template>
    <div>
    <Nav-bar title="新闻列表"></Nav-bar>
    <div class="demo">
      <ul>
            <li v-for="news in newsList" :key="news.id">
                <router-link :to="{name:'news.detail',query:{newId:news.id}}">
                    <img class="" :src="news.img_url">
                    <div style="width:200px">
                        <span>{{news.title|convert-title(13)}}</span>
                        <div class="news-desc">
                            <p>点击数:{{news.click}}</p>
                            <p>发表时间:{{news.add_time|convert-time}}</p>
                        </div>
                    </div>
                </router-link>
            </li>
            <li class="line"></li>
        </ul>
    </div>

    </div>
</template>
<script>
    export default {
        data(){
            return {
                title:''
            }
        },
      created () {
        this.$axios.get('getnewslist') 
        .then(res=>{
            this.newsList = res.data.message;
        }) 
        .catch(err=>{
            console.log('新闻列表异常',err)
        })
      },
        data(){
            return {
                newsList:[],//新闻列表数据
            }
        }
    }
</script>
<style scoped>


.demo a {
    display: block;
    width: 100%;
    height: 44px;
    color: #000;
    padding: 10px 15px;
    /* padding: 10px 0px 10px 5px; */
    box-sizing: border-box;
}
.demo img {
    float: left;
    width: 42px;
    height: 42px;
    margin-right: 20px;
}
.demo a div {
    float: left;
    width: 238px;
    margin-right: 20px;
}
.demo span {
    display: block;
    width: 100%;
    font-size: 15px;
    line-height: 18px;
    white-space: nowrap;
    overflow: hidden;
}
.demo a p {
    float: left;
    color: #0bb0f5;
    font-size: 12px;
    line-height: 18px;
}
.demo p:nth-child(2) {
    float: right;
}


.cms-s-header{
        height: 40px;
        background-color: #f7f7f7;
}
.page-title{
    margin-left: 25%;
}
.line {
    margin-left: 16px;
    transform: scaleY(.5);
    border-bottom: 1px solid #c8c7cc;
}

</style>