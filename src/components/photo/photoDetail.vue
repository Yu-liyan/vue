<template>
<!-- 图文分享详细内容
    点击图文列表中的任意一个li，跳转到详情页，有参数（图片的id），获取路由上的参数，通过id发起请求
 -->
    <div>  
        <Nav-bar title="图文详情"></Nav-bar>
        <div class="photo-title">
            <p>{{imgInfo.title}}</p>
            <span>发起日期：{{imgInfo.add_time|convert-time}}</span>
            <span>{{imgInfo.click}}次浏览</span>
            <span>分类：民生经济</span>
        </div>
        <my-ul>
            <my-li v-for="(img,index) in smallImgs" :key="index">
                 <img class="preview-img" :src="img.src" @click="$preview.open(index, smallImgs)">
            </my-li>    
        </my-ul>
        <div class="photo-desc">
            <p v-html="imgInfo.content"></p>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return {
            imgInfo:{},//图片信息
            smallImgs:[],//缩略图

        }
    },
    created(){
        let imgId = this.$route.params.imgId;
        // 获取到参数请求商品缩略图与图文详情
        this.$axios.get('getthumimages/' + imgId)
        .then(res=>{
            // 如果成功将图片显示在九宫格插件内
            this.smallImgs = res.data.message
               //给缩略图宽高,确定x点
            this.smallImgs.forEach(ele=>{
                ele.h = 400;
                ele.w = 600;
            })
        })
        .catch(err=>{
            console.log(err)
        })

        this.$axios.get('getimageInfo/' + imgId)
        .then(res=>{
            this.imgInfo = res.data.message[0]
            console.log(this.imgInfo)
        })
        .catch(err=>{
            console.log(err)
        })
    }
}
</script>
<style scoped>
li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}

.photo-title {
    overflow: hidden;
}

.photo-title,
.photo-desc {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
   
}

.photo-title p {
    color: #13c2f7;
    font-size: 20px;
    font-weight: bold;
   
}

.photo-title span {
    margin-right: 20px;
}

.photo-desc p {
    font-size: 14px;
}
img{
    width:100%;
}

</style>
