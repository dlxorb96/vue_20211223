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
        <el-table-column  label="아이디" width="100">
            <template #default="scope">
                {{scope.$index +1}}
            </template>
        </el-table-column>

        <el-table-column label="물품명" width="120">
            <template #default="scope">
                <el-input size="mini" v-model="items[scope.$index].name" />
            </template>
        </el-table-column>

        <el-table-column label="글 내용" width="300">
            <template #default="scope">
                <el-input size="mini" v-model="items[scope.$index].content" />
            </template>
        </el-table-column>

        <el-table-column label="가격" width="120">
            <template #default="scope">
                <el-input size="mini" v-model="items[scope.$index].price" />
            </template>
        </el-table-column>
        <el-table-column  label="수량" width="120">
            <template #default="scope">
                <el-input size="mini" v-model="items[scope.$index].quantity" />
            </template>
        </el-table-column>
        <el-table-column  label="이미지" width="250">
            <template #default="scope">
                <img :src="this.items[scope.$index].image1" style="width: 50px">
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
            hadleImage(e, idx){
                // e 실제 파일 정보
                // idx 위치 정보
                console.log("itemUpdateBatch.vue = > handleImage", e, idx)
                // image > 수정 전의 이미지
                // imageData > 수정하는 이미지 파일(데이터)
                // image1 > 수정하는 이미지 미리보기 URL
                if(e.target.files.length > 0){ //첨부함
                    this.items[idx].imageData = e.target.files[0];
                    this.items[idx].image1 = URL.createObjectURL(e.target.files[0]);
                }
                else{ //첨부하지 않음
                    this.items[idx].imageData = null;
                    this.items[idx].image1 = this.items[idx].image
                }
            },

            async insertDB(){
                const url = 'item/updatebatch';
                const headers = {"Content-Type": "multipart/form-data"};
                const body = new FormData();
                for(let tmp of this.items){
                    body.append( "code", tmp._id );
                    body.append( "name", tmp.name );
                    body.append( "content", tmp.content );
                    body.append( "price", tmp.price );
                    body.append( "quantity", tmp.quantity );
                    body.append( "file", tmp.imageData );
                }
                
                const response = await this.axios.put(
                    url, body, {headers : headers}
                )
                if(response.data.status ===200){
                    alert('수정 완료되었습니다.')
                    this.$router.push({name: 'Seller'})
                }
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
                    // 미리보기를 위한 새로운 image1키 추가
                    for(let tmp of this.items){
                        tmp.image1 = tmp.image;
                        tmp.imageData = null;
                    }                
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