<template>
<!-- 图文分享步骤：
    在home页点击图文分享进入列表页，锚点值改变，如果能匹配成功，创建组件，显示页面
    顶部导航与详细内容分为两个部分，但是两个是缺一不可的，所以必须都成功，用合并请求
    当created之后可以操作数据就开始请求
    点击每一个导航栏出现对应的类别的图片
 -->
    <div>
        <Nav-bar title="图文分享"></Nav-bar>
            <!-- 引入返回导航 -->
            <div class="photo-header">
                <ul>
                    <li v-for="category in categories" :key="category.id">
                        <a href="javascript:;" @click="getimages(category.id)">{{category.title}}</a>
                    </li>
                </ul>
            </div>
            <div class="photo-list">
                <ul>
                    <li v-for="img in imgs" :key="img.id">
                        <router-link :to="{name:'photo.detail',params:{imgId:img.id}}">
                            <img v-lazy="img.img_url">
                            <p>
                                <span>{{img.title}}</span>
                                <br>
                                <span>{{img.zhaiyao}}</span>
                            </p>
                        </router-link>
                    </li>
                </ul>
            </div>
      
    </div>
</template>
<script>
export default{
    data(){
        return{
            categories:[],
            imgs:[],
        }
    },
    methods:{
        getimages(id){
            this.$axios.get('getimages/' + id)
            .then(res=>{
                this.imgs = res.data.message
                // 如果没有数据，弹出提示框
                if(this.imgs.length == 0){
                    this.$toast({
                      message: '提示:没有图片了',
                      duration: 5000
                    });
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    created(){
        let categoryId = this.$route.params.categoryId;
        console.log(categoryId);
        this.$axios.all([
            this.$axios.get('getimgcategory'),
            this.$axios.get('getimages/' + categoryId )
        ])
        .then(this.$axios.spread((categoriesRes,imgsRes)=>{
            this.categories = categoriesRes.data.message,
             this.categories.unshift({
                id:0,
                title:'全部'
            })
            console.log(this.categories)
            this.imgs = imgsRes.data.message
        }))
        .catch(err=>{
            console.log(err)
        })
    },
    // 锚点值改变的时候才会触发组件created，单独改变categoryId是不会生效，因为组件的复用，此时并没有触发created
    // 使用beforeRouterUpdate 去改变这种情况
   beforeRouteUpdate(to,from,next){
    //    this.$axios.get('getimages/' + to.params.categoryId)
    //    .then(res=>{
    //        this.imgs = res.data.message;
    //        next();
    //    })
    this.getimages(to.params.categoryId);
    next();
       
   }
    
}
</script>
<style>
.photo-header li {
    list-style: none;
    display: inline-block;
    margin-left: 10px;
    height: 30px;
}

.photo-header ul {
    /*强制不换行*/
    white-space: nowrap;
    overflow-x: auto;
    padding-left: 0px;
    margin: 5;
}


/*下面的图片*/

.photo-list li {
    list-style: none;
    position: relative;
}

.photo-list li img {
    width: 100%;
    height: 230px;
    vertical-align: top;
}

.photo-list ul {
    padding-left: 0px;
    margin: 0;
}

.photo-list p {
    position: absolute;
    bottom: 0px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    margin-bottom: 0px;
    font-size: 14px;
}

.photo-list p span:nth-child(1) {
    font-weight: bold;
    font-size: 16px;
}
</style>
