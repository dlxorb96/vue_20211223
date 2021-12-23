<template>
    <div>
        <el-tabs :tab-position="tabPosition" style="height: 500px">
            <el-tab-pane label="정보수정" ><!-- @click="changeComp(1)" -->
                <comp-1></comp-1>
            </el-tab-pane>
           
            <el-tab-pane label="비밀번호 변경"> <!--  @click="changeComp(2)" -->
                <comp-2 ></comp-2>
            </el-tab-pane>

            <el-tab-pane label="회원탈퇴"> <!--  @click="changeComp(3)" -->
                <!-- <component :is="currentComp" /> -->
                <comp-3 @changeLogged1 ='changeLogged1'></comp-3>
            </el-tab-pane>
        </el-tabs>
         

    </div>
</template>

<script>
    import Comp1 from './MypageComp/MypageComp-1.vue';
    import Comp2 from './MypageComp/MypageComp-2.vue';
    import Comp3 from './MypageComp/MypageComp-3.vue';
    export default {
        components:{
            'comp-1' : Comp1,
            'comp-2' : Comp2,
            'comp-3' : Comp3
        },
        created(){
            this.changeLogged1()
        },
        data(){
            return{
                tabPosition: 'top',
                member:{
                    name : '',
                    email : ''
                    },
                // compList : [null, 'com-1', 'comp-2', 'comp-3'],
                // currentComp : 'comp-1'
            }
        },
        methods:{
            changeLogged1(){
                console.log('Mypage.vue => changeLogged1')
                this.$emit('changeLogged')
            }
            // changeComp(no){
            //     this.currentComp = no
            // }
        }
    }
</script>

<style scoped>

</style>