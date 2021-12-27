<template>
    <div>
        <el-button type="success" @click="handleWrite">글쓰기</el-button>
        <el-table :data="items" border style="width: 1001px; cursor: pointer;" @row-click= "rowClick">
            <el-table-column prop="no" label="번호" width="200px" />
            <el-table-column prop="title" label="제목" width="200px" />
            <el-table-column prop="writer" label="작성자" width="200px" />
            <el-table-column prop="hit" label="조회수" width="200px" />
            <el-table-column prop="regdate" label="등록날짜" width="200px" />
        </el-table>
        <!-- 밑에 바 -->
        <div class="slider-demo-block">
            <el-slider v-model="slider" @input="currentChange" show-input> </el-slider>
        </div>
        
    </div>
</template>

<script>
import {useStore} from 'vuex';
    export default {
        created(){
            this.handleData2()
        },    
        data(){
            return{
                items : [],
                page : 1,
                slider : 1,
                store : useStore(),
                activeName: 'first',
            }
        },
        methods:{
            async handleData2(){
                // action에 정의되어 있는 handleData 호출
                await this.store.dispatch('handleData' , {page:this.page})

                // store의 mutation 호출(공통의 값 변경하는 역할- 동기)
                // this.store.commit('setCounter' , 30)
                // store의 getters 호출(공통의 값 가져오는 역할)
                //const cnt = this.store.getters.getCounter;
                this.items = this.store.getters.getItems;
                // 위에서 바꾸는 동안 밑에 꺼가 실행될 수 있다.
            },
            currentChange(page){
                this.page = page
                this.handleData2();

            },
            rowClick(row){
                console.log("Board1.vue => rowClick,", row)
                this.$router.push({
                    name: "BoardOne",
                    query : {no: row.no,
                    bno : 1}
                })
            },
            handleWrite(){
                this.$router.push({name: "BoardWrite"})
            }
        }
        
       
    }

    
    

</script>

<style scoped>

</style>