<template>
    <div>
        <h3 style="margin-left: 100px">상품 등록</h3>

        <el-form style="width: 800px;" >

            <el-form-item label="사진 등록" style="margin-right: 20px;" label-width="120px" >
                <el-upload
                    action="#"
                    list-type="picture-card"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-change="handleChange"
                    :auto-upload="false">
                    <el-icon><plus /></el-icon>
                </el-upload>

                <el-dialog v-model="dialogVisible">
                    <img style="width:100%"  :src="dialogImageUrl" alt="" />
                </el-dialog>                        
            </el-form-item>


            <el-form-item label="상품명" style="margin-right: 20px;" label-width="120px" >
                <el-input style="display: inline-block; width: 200px;  " v-model="items.name"></el-input>
            </el-form-item>

            
            <el-form-item label="가격" style="margin-right: 20px;" label-width="120px" >
                <el-input style="display: inline-block; width: 200px;  " v-model="items.price"></el-input>
            </el-form-item>

            <el-form-item label="수량" style="margin-right: 20px;" label-width="120px" >
                <el-input style="display: inline-block; width: 200px;  " v-model="items.quantity"></el-input>
            </el-form-item>

            <el-form-item label="글 내용" label-width="120px">
                <el-input v-model="items.content" type="textarea" style="min-height: 50px"></el-input>
            </el-form-item>

            <el-form-item label-width="120px">
                <el-button type="primary" @click="submitForm">등록</el-button>
            </el-form-item>

        </el-form>
        

    </div>
</template>

<script>
    import {Plus} from '@element-plus/icons-vue'

    export default {

        components:{
            Plus
        },

        created(){

        },

        data(){
            return{
                items: {
                    image: null,
                    name: '',
                    price: '',
                    quantity: '',
                    content: '',
                },
                dialogImageUrl : '',
                dialogVisible : false
            }
        },

        methods:{
            handleChange(file, fileList) {
                console.log('handleChange');
                //console.log(URL.createObjectURL(file.raw));
                console.log(file, fileList)
                this.items.image = file.raw;
            },

            handleRemove(file, fileList){
                console.log(file, fileList)
                this.items.image = null;
            },

            handlePreview(file){
                console.log('handlePreview');
                console.log(file)

                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
                // console.log(URL.createObjectURL(file.raw))
                // URL이 없을경우 직접 만들기
                //blob파일은 미리보기 파일
            },
            
            async submitForm(){
                // 유효성 검사
                if(this.items.image ===null){
                    alert('이미지를 첨부하세요');
                    return false
                }
                const url = "/item/insert"
                
                const headers = {"Content-Type" : "multipart/form-data"};
                // multipart는 JSON파일로 전달 못한다 'a': '1'이게 json형태
                let body = new FormData();
                body.append("file", this.items.image);
                body.append("name", this.items.name);
                body.append("content", this.items.content);
                body.append("price", this.items.price);
                body.append("quantity", this.items.quantity);

                const response = await this.axios.post(
                    url, body, {headers : headers});
                console.log(response)
                if(response.data.status ===200){
                    alert('등록이 완료되었습니다');
                    this.$router.push({
                        name: 'Seller'
                    })
                }
            },
        }
                    
               
    }
</script>

<style scoped>

</style>