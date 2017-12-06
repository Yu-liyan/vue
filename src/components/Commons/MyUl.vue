<template>
  <ul>
      <!-- 任意的li -->
      <slot></slot>
  </ul>
</template>
<script>
export default {
  name:'my-ul',
}
</script>
<style scoped>
    ul{
    overflow: hidden;
} 
</style>


