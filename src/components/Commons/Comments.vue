<template>
<!-- 测试评论路由，要根据不同的id获取不同商品或者图片的评论，还要获取页码通过路由参数， -->
    <div class="tmpl">
        <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        <span>提交评论</span>
                        <span><a >返回</a></span>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea></textarea>
                </li>
                <li>
                    <mt-button size="large" type="primary">发表评论</mt-button>
                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>44条评论</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list">
                <li v-for="(comment,index) in comments" :key="index">
                    {{comment.user_name}}：{{comment.content}} {{comment.add_time|convert-time}}
                </li>
              
            </ul>
           <mt-button size="large" type="danger" plain @click="loadMore"> 加载更多</mt-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            comments:[],//用于存放通过具体id获取到的具体的页码中的评论信息
            page:1,
            
        }
    },
    methods:{
        loadMore(){

        }
    },
    created(){
        // 当组件被创建完成才能继续接下来的操作
        // 先将id与页面写死，测试能否返回数据，然后在继续下一步
        let id = 88;
       this.page = this.$route.auery.pageIndex || 1;
        this.$axios.get('getcomments/'+id+'?pageindex='+ this.page)
        .then(res=>{
            this.comments = res.data.message;
            console.log(this.comments)
        })
        .catch(err=>console.log(err))
    }
}
</script>
<style scoped>
.photo-comment > div span:nth-child(1) {
    float: left;
    font-weight: bold;
    margin-left: 5px;
}

.photo-comment > div span:nth-child(2) {
    float: right;
}

.photo-comment {
    height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    line-height: 30px;
    margin-bottom: 5px;
}

.txt-comment {
    padding: 5 5;
}

.txt-comment textarea {
    margin-bottom: 5px;
}

.comment-list li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
    font-size: 14px;
}

li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}
</style>
