<template>
    <div>
        <el-tabs :tab-position="tabPosition" style="height: 500px">
            <el-tab-pane label="정보수정" ><!-- @click="changeComp(1)" -->
                <Menu-1></Menu-1>
            </el-tab-pane>
           


            <el-tab-pane label="비밀번호 변경"> <!--  @click="changeComp(2)" -->
                <Menu-2></Menu-2>
            </el-tab-pane>





            <el-tab-pane label="회원탈퇴"> <!--  @click="changeComp(3)" -->
                <!-- <component :is="currentComp" /> -->
                <Menu-3></Menu-3>
            </el-tab-pane>
        </el-tabs>
         

    </div>
</template>

<script>
    import Menu1 from './MypageComp/MypageComp-1.vue'
    import Menu2 from './MypageComp/MypageComp-2.vue'
    import Menu3 from './MypageComp/MypageComp-3.vue'
    export default {
        components:{
            'Menu-1':Menu1,
            'Menu-2':Menu2,
            'Menu-3':Menu3,
        },

        created(){
            // this.changeLogged1()
        },
        data(){
            return{
                tabPosition: 'top',
                member:{
                    
                        name : '',
                        email : '',
                        pw : '',
                        pwchk : '',
                        pw2 : '',
                        pwchk2 : ''
                    },
                    
                token: sessionStorage.getItem("TOKEN")
                
                // compList : [null, 'com-1', 'comp-2', 'comp-3'],
                // currentComp : 'comp-1'
            }
        },
        methods:{
            
          
            
            handleLeave(){
                console.log('MypageComp-3.vue => handleLeave')
                alert('회원 탈퇴되었습니다')
                sessionStorage.removeItem("TOKEN")
                this.$emit('changeLogged1')
                this.$router.push({name:'Home'})
            }
        }
    }
</script>

<style scoped>

</style>