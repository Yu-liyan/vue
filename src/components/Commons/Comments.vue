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
                    <textarea v-model="commentContent"></textarea>
                </li>
                <li>
                    <mt-button size="large" type="primary" @click="subComment">发表评论</mt-button>
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
            id:this.$route.query.id || 88,
            commentContent:'',//发表的评论内容
            content:''
        }
    },
    methods:{
        // 当点击提交评论，(将评论的内容提交到服务器。。。。。做的时候将这个忘记了)，之后自动跳转到第一页，并且新提交的评论默认在第一条
        subComment(){
            this.$axios.post(`postcomment/${this.id}` ,
                `content = ${this.commentContent}` )
            .then(res=>{
                console.log(this.commentContent)
                this.$axios.get('getcomments/'+this.id+'?pageindex='+this.page)
                .then(res=>{
                   
                    this.comments = res.data.message;
                    // this.page++;
                    console.log(this.comments[0])
                })
                .catch(err=>console.log(err))
            })
            .catch(err=>{
                console.log(err)
            })
            
        },
        loadMore(){
            // 当点击加载更多，也是根据页码值获取数据，当页面创建数据初始化结束，让页码自增，在点击加载更多的时候
            // 就可以直接使用，然后将数据追加到comments数组中，而不是替换，然后也要让页码自增 
             this.$axios.get('getcomments/'+this.id+'?pageindex='+ (++this.page))
             .then(res=>{
                 this.comments = this.comments.concat(res.data.message);
                 console.log(this.comments);
             })
             .catch(err=>{
                 console.log(err)
             })
            //  this.page++;
        }
    },
    created(){
        this.id = 88;
        // 当组件被创建完成才能继续接下来的操作
        // 先将id与页面写死，测试能否返回数据，然后在继续下一步
        
       this.page = this.$route.query.pageindex || 1;
    //    这里可以用字符串拼接也可以用模版字符串
    // this.$axios.get(`getcomments/${id}?pageindex=${this.page}`)
        this.$axios.get('getcomments/'+this.id+'?pageindex='+ this.page)
        .then(res=>{
            this.comments = res.data.message;
            // this.page++;
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
    width:99%;

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
