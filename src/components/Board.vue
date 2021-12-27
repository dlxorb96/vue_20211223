<template>
    <div>
        <div class="card-header">
        </div>
        <div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="게시글" name="first">게시글
                    <comp-1></comp-1>


                </el-tab-pane>
                <el-tab-pane label="질문및답변" name="second">질문및답변
                    <comp-2></comp-2>


                </el-tab-pane>
            </el-tabs>
        </div>
    

        <!-- <el-table :data="items" border style="width: 1001px;">
            <el-table-column prop="no" label="번호" width="200px" />
            <el-table-column prop="title" label="제목" width="200px" />
            <el-table-column prop="writer" label="작성자" width="200px" />
            <el-table-column prop="hit" label="조회수" width="200px" />
            <el-table-column prop="regdate" label="등록날짜" width="200px" />
        </el-table>
        밑에 바
        <div class="slider-demo-block">
            <el-slider v-model="slider" @input="handleData2" show-input> </el-slider>
        </div> -->
         
    </div>
</template>

<script>
    import Comp1 from './BoardComp/BoardComp-1.vue';
    import Comp2 from './BoardComp/BoardComp-2.vue';
    // import comp-1 from './BoardComp-2.vue'
    import {useStore} from 'vuex';
    // import axios from 'axios'
    export default {
        components:{
            'comp-1' : Comp1,
            'comp-2' : Comp2,
        },
       
        created(){
            this.handleData2()
        },
        //state 변수(현재 컴포넌트에 필요한 변수)
        //컴포넌트 내부에 있는 데이터는 이 컴포넌트 내부에서만 써야하는 것들
        // 공통의 것들이 아닌 데이터들

        data(){
            return{
                items : [],
                page : 1,
                slider : 1,
                store : useStore(),
                activeName: 'first',
            }
        },
        
        mounted(){
            // //모든 컴포넌트에서 값을 변경한 것을 통보 받기
            // this.store.subscribe((mutation, state) => {
            //     console.log(mutation, state);
            //     // items의 변수에 값을 넣어야 됨

            //     if(mutation.type === 'setItems'){
            //         this.items = mutation.payload;
            //     }
            // });
        },

        methods:{
            async handleData2(){
                // action에 정의되어 있는 handleData 호출
                await this.store.dispatch('handleData' , {page:1})

                // store의 mutation 호출(공통의 값 변경하는 역할- 동기)
                // this.store.commit('setCounter' , 30)
                // store의 getters 호출(공통의 값 가져오는 역할)
                //const cnt = this.store.getters.getCounter;
                this.items = this.store.getters.getItems;
                // 위에서 바꾸는 동안 밑에 꺼가 실행될 수 있다.
            },
            handleClick(tab, event) {
                console.log(tab, event)
            },



        //     ,
        //     async handleData(){
        //         const url 
        //             = `http://ihongss.com/json/board.json?page=${this.page}`
        //         const headers = {"Content-Type":"applicaion/json"};

        //         const response = await axios.get(url, {headers:headers});
        //         // response.data => {ret: 'y', data: Array(10)}
        //         console.log(response);
        //         if(response.data.ret === 'y'){
        //             this.ctnt = response.data.data;
        //         }
        //     },
            // handlePage(page){
            //     this.page = page;
            //     // this.handleData();
            //     // console.log(this.ctnt);
            //     // console.log(page);
            // },
        }
        
        // ,
        // changePage(){
        //     console.log(this.value1)
        // }
    }
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>