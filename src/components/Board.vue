<template>
    <div>
      <div class="card-header">
        <span>게시판</span>
      </div>
        <el-table :data="ctnt" border style="width: 1001px;">
            <el-table-column prop="no" label="번호" width="200px" />
            <el-table-column prop="title" label="제목" width="200px" />
            <el-table-column prop="writer" label="작성자" width="200px" />
            <el-table-column prop="hit" label="조회수" width="200px" />
            <el-table-column prop="regdate" label="등록날짜" width="200px" />
        </el-table>
        <!-- 밑에 바 -->
        <div class="slider-demo-block">
            <el-slider v-model="slider" @input="handlePage" show-input> </el-slider>
        </div>
        
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        created(){
            this.handleData()
        },

        data(){
            return{
                ctnt : [],
                page : 1,
                slider : 1,
            }
        },
        methods:{
            async handleData(){
                const url 
                    = `http://ihongss.com/json/board.json?page=${this.page}`
                const headers = {"Content-Type":"applicaion/json"};

                const response = await axios.get(url, {headers:headers});
                // response.data => {ret: 'y', data: Array(10)}
                console.log(response);
                if(response.data.ret === 'y'){
                    this.ctnt = response.data.data;
                }
            },
            handlePage(page){
                this.page = page;
                this.handleData();
                console.log(this.ctnt);
                console.log(page);
            },
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