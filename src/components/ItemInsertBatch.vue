<template>
    <div>
        <h4>ItemInsertBatch.vue</h4>
        <el-button type="info" @click="handlePlus" size="small">
              항목추가
        </el-button>
        <el-button type="info" @click="handleMinus" size="small">
              항목삭제
        </el-button>
        <el-button type="primary" @click="insertDB" size="small">
              일괄추가
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
        <el-table-column prop="imame" label="이미지" width="250">
            <template #default="scope">
                <img :src="this.items[scope.$index].imgurl" style="width: 50px">
                <!-- <img src="#" style="width: 100px;"> -->
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
        data(){
            return{

                items : [
                    {name: 'a', content : '1', price: 1, quantity: 1, img:'', imgurl: require('../assets/logo.png')},
                    {name: 'a', content : '1', price: 1, quantity: 1, img:'', imgurl: require('../assets/logo.png')},
                    {name: 'a', content : '1', price: 1, quantity: 1, img:'', imgurl: require('../assets/logo.png')},
                    ]
            }
        },
        methods:{
            handlePlus(){
                this.items.push({name: 'a', content : '1', price: 1, quantity: 1, img:''});
            },
            handleMinus(){
                this.items.pop();
            },
            hadleImage(e, idx){
                console.log("ItemInsertBatch.vue => handleImage" ,e, idx)
                
                if(e.target.files.length > 0){
                    this.items[idx].img = e.target.files[0];
                    this.items[idx].imgurl = URL.createObjectURL(e.target.files[0]);
                }
                else{
                    this.items[idx].img = null
                    this.items[idx].imgurl = require('../assets/logo.png');
                }
            },

            async insertDB(){
                const url = '/item/insertbatch';
                const headers = { "Content-Type": "multipart/form-data" };
                const body = new FormData();
                for(let i = 0; i < this.items.length; i++){
                    body.append("name", this.items[i].name)
                    body.append("content", this.items[i].content)
                    body.append("price", this.items[i].price)
                    body.append("quantity", this.items[i].quantity)
                    body.append("file", this.items[i].img)
                   
                }
                const response = await this.axios.post(
                    url, body, {headers:headers})
                if(response.data.status ===200){
                    alert('일괄추가 되었습니다.')
                    this.$router.push({name: 'Seller'})
                console.log(response)
                }
                

            },
            toSeller(){

            }
        },

    }
</script>

<style scoped>

</style>