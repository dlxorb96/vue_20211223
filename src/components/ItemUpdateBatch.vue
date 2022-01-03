<template>
    <div>
        {{code}}
        <h4>ItemUpdateBatch.vue</h4>
        <el-button type="primary" @click="insertDB" size="small">
              일괄수정
        </el-button>
        <el-button type="primary" @click="toSeller" size="small">
              목록으로
        </el-button>
{{items}}
        <el-table :data="items" style="width: 100%; size: mini;"> 
        <el-table-column prop="_id" label="아이디" width="100">
            <template #default="scope">
                {{scope.$index +1}}
            </template>
        </el-table-column>

        <el-table-column prop="name" label="물품명" width="120">
            <template #default="scope">
                <el-input size="mini" v-model="items[scope.$index].name" />
            </template>
        </el-table-column>

        <el-table-column prop="content" label="글 내용" width="300">
            <template #default="scope">
                <el-input size="mini" v-model="items[scope.$index].content" />
            </template>
        </el-table-column>

        <el-table-column prop="price" label="가격" width="120">
            <template #default="scope">
                <el-input size="mini" v-model="items[scope.$index].price" />
            </template>
        </el-table-column>
        <el-table-column prop="quantity" label="수량" width="120">
            <template #default="scope">
                <el-input size="mini" v-model="items[scope.$index].quantity" />
            </template>
        </el-table-column>
        <el-table-column prop="image" label="이미지" width="250">
            <template #default="scope">
                <img :src="this.items[scope.$index].imgurl" style="width: 50px">
                <input type="file" @change="hadleImage($event, scope.$index )" />
            </template>
        </el-table-column>
        
        </el-table>
    </div>
</template>

<script>
    export default {
        created(){
            
            
        },

        mounted(){
            // F5 새로고침 처리
            console.log(this.code)
            if(typeof this.code === 'undefined'){
                this.$router.back();
            }
            else{
                this.handleData();
            }
        },
        
        data(){
            return{
                // JSON.parse(안에는 데이터가 무조건 있어야함)
                code : this.$route.params.code,
                items : []
            }
        },

        methods:{
            hadleImage(e, i){
                console.log("itemUpdateBatch.vue = > handleImage", e, i)
                this.items[i].image = e.target.files[0]
            },

            async insertDB(){
                const url = 'item/updatebatch';
                const body = new FormData();
                for(let i = 0; this.items.length > i; i++){
                    body.append("code", this.items[i]._id)
                    body.append("name", this.items[i].name)
                    body.append("content", this.items[i].content)
                    body.append("price", this.items[i].price)
                    body.append("quantity", this.items[i].quantity)
                    body.append("file", this.items[i].img)
                }
                
                const headers = {"content-Type": "multipart/form-data"};
                const response = await this.axios.put(
                    url, body, {headers : headers}
                )
                if(response.data.status ===200){
                    alert('수정 완료되었습니다.')
                    this.$router.push({name: 'Seller'})
                }
                console.log(response)
            },

            async handleData(){
                // string -> object로 변환
                this.code = JSON.parse(this.code)
                const url = '/item/selectCheck';
                const headers = { "Content-Type" : "application/json" }
                //[{code:1}, {code:2}] => [1,2]
                let arr = [];
                for(let tmp of this.code){
                    arr.push(tmp.code)
                }
                const body = { chks : arr};
                const response = await this.axios.post(url, body, 
                {headers: headers});

           
                console.log("Seller.vue => editSomeItem()", response)
                if(response.data.status === 200){
                    this.items = response.data.result                
                }
            },
            toSeller(){
                this.$router.push( {name: 'Seller'} )
            }
        }
    }
</script>

<style scoped>

</style>