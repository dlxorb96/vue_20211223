<template>
  <div>
    <el-card shadow="always">
      <h4>admin.vue</h4>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="회원관리" name="first">
            
          <menu-1></menu-1>
        </el-tab-pane>
        <el-tab-pane label="게시물관리" name="second">
          
          <menu-2></menu-2>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import menu1 from './Admin/menu-1.vue';
import menu2 from './Admin/menu-2.vue';

export default {
    created(){

    },
    components: {
        menu1 , menu2
    },
    data(){
        return{
            activeName: 'first',
        }
    },
    methods:{
        handleClick(){
            console.log('Admin.vue => handleclick()')
        }
    }
};
</script>

<style scoped>
</style>