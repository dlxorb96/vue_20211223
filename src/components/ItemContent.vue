<template>
    <div>
        <h4>제품상세</h4>
            <el-form style="width: 800px;" >
                
                    <el-card class="box-card">
                    <template #header>
                    <div class="card-header">
                    <b><span>{{item.name}}</span></b>
                    </div>
                    </template>

                    <div style="text-align: center;" ></div>
                    <el-image :src="item.image" style="width: 400px;"></el-image>
                    
                    <el-form-item label="가격" label-width="120px">
                        <div class="text item">{{item.price}}원</div>
                    </el-form-item>
                    <el-form-item label="수량" label-width="120px">
                        <div class="text item">{{item.quantity}}개</div>
                    </el-form-item>
                    <el-form-item label="등록일" label-width="120px">
                        <div class="text item">{{item.regdate}}</div>
                    </el-form-item>
                </el-card>
            </el-form>

        
    </div>
</template>

<script>
    export default {
        created(){
            this.handleData()
            console.log(this.code)
            
        },
        methods:{
            async handleData(){
                const url = `/item/selectOne?code=${this.code}`;
                const headers = {"Content-Type" : "application/json"}
                const response = await this.axios.get(url, {headers: headers});
                console.log(response)
                if(response.data.status ===200){
                    this.item = response.data.result
                }
                console.log(this.item)
            }
        },

        data(){
            return{
                item : '',
                code : this.$route.query.code
            }
        }
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