<template>
    <div>
        <Nav-bar title="新闻详情"></Nav-bar>
        <div class="news-title">
            <p>{{detail.title}}</p>
            <div>
                <span>{{detail.click}}次点击</span>
                <span>分类:民生经济</span>
                <span>添加时间:{{detail.add_time|convert-time('YYYY-MM-DD')}}</span>
            </div>
        </div>
        <div class="news-content" v-html="detail.content"></div>
    </div>

    <!-- 步骤：点击某一条新闻的时候，锚点值改变去匹配对应的路由，如果匹配上创建组件并且渲染页面
                 向后台发请求需要携带参数（即每条数据的id），然后请求道具体某个id的某一条信息
     -->
</template>
<script>
export default{
    data(){
        return {
            title:'',
            detail:{},
        }
    },
    created(){
        let newId = this.$route.query.newId;
        this.$axios.get('getnew/'+newId)
        .then(res=>{
            this.detail = res.data.message[0];
            console.log(this.detail)
        })
        .catch(err=>{
            console.log(err)
        })
    }

}
</script>
<style scoped>
.news-title p {
    color: #0a87f8;
    font-size: 18px;
    font-weight: bold;
}

.news-title span {
    margin-right: 30px;
    font-size: 14px;
}

.news-title {
    margin-top: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}


/*主体文章的左右距离*/

.news-content {
    padding: 10 5;
    font-size: 12px;
    color:#666;
}
</style>


