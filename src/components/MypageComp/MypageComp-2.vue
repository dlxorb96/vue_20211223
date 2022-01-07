<template>
    <div>
        <el-card shadow="always">
            <h3 style="margin-left: 50px">비밀번호 변경</h3>
            <el-form  label-width="120px">
            <el-form-item :inline = true label="현재 암호">
                <el-input placeholder="암호" 
                v-model="userpw" 
                style="display: inline-block; width: 200px;
                margin-right: 20px;"
                type="password"
                ref="username">
                </el-input>

            </el-form-item>
            
            <el-form-item label="바꿀 암호">
                <el-input
                    v-model= "userpw2"
                    placeholder="바꿀 암호 "
                    type="password"
                    style="display: inline-block; width: 200px;
                    margin-right: 20px;"
                    ref="useremail">
                </el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click= "handlePasswordChange">변경하기</el-button>
                
            </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                userpw:'',
                userpw2:'',
                token : sessionStorage.getItem('TOKEN')
            }
        },
        methods:{
            async handlePasswordChange(){
                if(this.userpw ===''){
                    alert('현재 암호를 입력하세요')
                    return false;
                }
                if(this.userpw2 ===''){
                    alert('바꿀 암호를 입력하세요')
                    return false;
                }
                

                console.log("MypageComp-2 => handlePasswordChange",1);
                const url = '/member/mypage?menu=2';
                const headers = {"Content-Type": "application/json", 
                token : this.token};
                const body = {
                    userpw: this.userpw,
                    userpw2 : this.userpw2
                }
                const response = await this.axios.put(
                    url, body, {headers: headers});
                // 변경 완료
                if(response.data.status === 200){
                    alert('변경 완료되었습니다')
                    this.userpw = '';
                    this.userpw2 = '';
                }
                // 변경 실패
                else if(response.data.status === 0){
                    alert('비밀번호를 확인해주세요')
                }
            }
        }

    }
</script>

<style scoped>

</style>