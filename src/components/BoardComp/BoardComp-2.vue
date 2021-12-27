<template>
    <div>
        <el-table :data="items" border style="width: 1001px;">
            <el-table-column prop="no" label="번호" width="200px" />
            <el-table-column prop="title" label="제목" width="200px" />
            <el-table-column prop="writer" label="작성자" width="200px" />
            <el-table-column prop="hit" label="조회수" width="200px" />
            <el-table-column prop="regdate" label="등록날짜" width="200px" />
        </el-table>
        <!-- 밑에 바 -->
        <div class="slider-demo-block">
            <el-slider v-model="slider" @input="showPage" show-input> </el-slider>
        </div>
        
    </div>
</template>

<script>
    import {useStore} from 'vuex'
    export default {
        created(){
            this.handleData2()
            console.log(this.items)
        },    
        data(){
            return{
                store : useStore(),
                items : [],
                page : 1,
                slider : 1,
                activeName: 'first',
            }
        },
        methods:{
            //여기 handleData는 이 컴포넌트에서 쓰는 메소드
            async handleData2(){
                await this.store.dispatch('handleData', {page: this.page});
                this.items = this.store.getters.getItems;
            },

            showPage(page){
                this.page = page;
                this.handleData2();
            }

            
        }
        
       
    }

    
    

</script>

<style scoped>

</style>