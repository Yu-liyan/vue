<template>
    <div class="cms-s-header">
        <h1 @click="goback">&nbsp<</h1>
        <h3 class="page-title">{{title}}</h3>
    </div> 
</template>
<script>
export default {
    name:'Nav-bar',
  props: ['title'],
  methods:{
      goback(){
          this.$router.go(-1);
      }
  }
}
</script>
<style>
   h1,h3{
   display: inline-block;
   height: 40px;
   line-height: 40px;
   margin-top:0px;
   margin-bottom:0px;

}
h3{
    text-align: center;
    margin-left: 30%;
}
</style>

