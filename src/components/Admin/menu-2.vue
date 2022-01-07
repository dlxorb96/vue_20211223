<template>
    <div>
        게시글관리
        menu2
        <!-- <el-button style="margin-right: 10px;" type="success" @click="handleWrite">글쓰기</el-button> -->
        <input type="text" placeholder="검색" v-model="search" @keyup.enter="handleSearch">
        <input type="button" value="검색" @click="handleSearch">
        <el-table :data="items" border style="width: 1001px; cursor: pointer;" @row-click= "rowClick">
            <el-table-column prop="_id" label="번호" width="200px" />
            <el-table-column prop="title" label="제목" width="200px" />
            <el-table-column prop="writer" label="작성자" width="200px" />
            <el-table-column prop="hit" label="조회수" width="200px" />
            <el-table-column prop="regdate" label="등록날짜" width="200px" />
        </el-table>
        <!-- 밑에 바 -->
        <div class="slider-demo-block">
            <el-slider v-model="slider" @input="currentChange" show-input > </el-slider>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                items : [],
                slider: 1,
                total: '',
                search: '',
                // total : '',


            }
        },
        created(){
            this.handleData();
        },
        methods: {

            async handleSearch(){
                
                console.log("Admin.vue = > menu-2 comp => handleSearch");
                const url = `/board/select`;
                const headers = {"Content-Type": "appplication/json"};
                const response = await this.axios.get(url,
                {params: {page: this.slider, text: this.search}}, 
                {headers:headers});

                console.log(response)
                if (response.data.result ===null){
                    alert('검색결과가 없습니다.')
                }
                else if(response.data.status ===200){
                    this.items = response.data.result
                }
                
            },
            async handleData() {
                const url = `/board/select?page=${this.slider}`;
                const headers = {"Content-Type": "appplication/json"};
                const response = await this.axios.get(url, {headers:headers})
                console.log(response)
                if(response.data.status ===200){
                    this.items = response.data.result
                    this.total = response.data.total
                }
            },
            currentChange(){
                this.handleData();
            },
            rowClick(){
                console.log('Admin.vue = > menu-2 comp => rowclick')
            }

        }
    }
</script>

<style scoped>

</style>