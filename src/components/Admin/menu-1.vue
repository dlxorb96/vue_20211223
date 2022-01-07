<template>
    <div>
        회원관리
        menu1
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
        created(){
            this.handleData()
        },
        data(){
            return{
                items: [],
                slider: 1,
                total: '',
                search: '',
            }
        },
        methods: {
            async handleData(){
                const url = `/board/select?page=${this.slider}`;
                const headers = {"Content-Type": "application/json"};
                const response = await this.axios.get(
                    url,{headers:headers});
                console.log('menu-1.vue -> handleData',response)
                if(response.data.status ===200){
                    this.items = response.data.result
                }
            },
            currentChange(){
                this.handleSearch()
                console.log('menu-1.vue -> currentChange')
            },
            async handleSearch(){
                const url = '/board/select';
                const headers = {"Content-Type": "application/json"};
                const response = await this.axios.get(
                    url,
                    {params: {page: this.slider, writer: this.search}}
                    ,{headers:headers});
                console.log(response)
                if(response.data.status ===200){
                    this.items = response.data.result
                }
            },
            rowClick(){
                console.log('Admin.vue = > menu-2 comp => rowclick')
            }
        }
    }
</script>

<style scoped>

</style>