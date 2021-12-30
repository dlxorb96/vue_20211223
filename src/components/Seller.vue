<template>
    <div>
        <el-card shadow="always">
            <h4>판매자</h4>

            <p>물품목록</p>
            <el-button
            type="success"
            size="small"
            @click="insertItem">
            물품등록
            </el-button>
            <el-table :data="items" style="width: 100%; cursor: pointer" @row-click="rowClick">
                <el-table-column prop="_id" label="코드" width="180" />
                <el-table-column prop="name" label="물품명" width="180" />
                <el-table-column prop="price" label="가격" />
                <el-table-column prop="quantity" label="수량" />
                <el-table-column prop="regdate" label="등록일" />
                    <el-table-column fixed="right" label="Operations" width="120">
                    <template #default="scope">
                        <el-popconfirm @confirm="deleteRow(scope.row)" title="Are you sure to delete this?">
                            <template #reference>

                            <el-button
                            type="warning"
                            size="small"
                            @click.prevent="deleteRow(/*scope.$index,*/ scope.row)">
                            삭제
                            </el-button>
                            </template>
                            </el-popconfirm>
                            <el-button
                            style="z-index:1000;"
                            type="info"
                            size="small"
                            @click.prevent="editRow(/*scope.$index,*/ scope.row)">
                            수정
                            </el-button>
                        
                    </template>
                    </el-table-column>
            </el-table>
            <div class="block">
            <el-pagination @current-change="changePage" layout="prev, pager, next" 
            :total="this.total" :current-page= this.page></el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        created(){
            this.handleData()
        },

        data(){
            return{
                items:[],
                page: 1,
                total : 0,
                code : '',
                abc: '',
            }
        },
        methods:{
            rowClick(row){
                // console.log(row)
                this.$router.push({
                    name: "ItemContent", 
                    query : {code:row._id}
                    })
                
            },

            async handleData(){
                const url = `/item/select?page=${this.page}`;
                const headers = {"Content-Type" : "application/json"};
                const response = await this.axios.get(url,{headers: headers})
                console.log(response)
                if(response.data.status ===200){
                    this.items = response.data.result
                    this.total = response.data.total
                }
                // console.log(response)

            },

            changePage(page){
                this.page = page
                this.handleData()
            },

            deleteRow(row){
                console.log("seller.vue => deleteRow")
                console.log(row._id)
                this.code = row._id
                this.deleteItem()
            },

            async deleteItem(){
                const url = `item/delete?code=${this.code}`
                const headers = {"Content-Type" : "application/json"};
                const response = await this.axios.delete(
                    url, {headers:headers, data:{'code': this.code}})
                if(response.data.status ===200){
                    alert('삭제되었습니다');
                    this.changePage(1);
                    console.log(response);
                }
            },

            insertItem(){
                this.$router.push({
                    name: "ItemInsert"
                })
            },

            // async editRow(row){
            //     console.log("Seller.vue => editRow", row)
            //     const url = `/item/update?code=${row._id}`
            //     console.log("Seller.vue => editRow", url)
            //     const headers = {"Content-Type" : "application/json"};
            //     const body = {}
            //     const response = await this.axios.put(url, body, {headers: headers})
            //     console.log(response)

            // }
        },
    }
</script>

<style scoped>

</style>