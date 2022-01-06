<template>
    <div>
        <el-card shadow="always">
            <h3 style="margin-left: 50px">회원 탈퇴</h3>
            <el-form  label-width="120px">
            <el-form-item :inline = true label="암호">
                <el-input placeholder="암호" 
                v-model="userpw" 
                style="display: inline-block; width: 200px;
                margin-right: 20px;"
                type="password"
                ref="username">
                </el-input>

            </el-form-item>
            
            <el-form-item label="암호 확인">
                <el-input
                    v-model="userpwchk"
                    placeholder="암호 확인 "
                    type="password"
                    style="display: inline-block; width: 200px;
                    margin-right: 20px;"
                    ref="useremail">
                </el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click= "handleLeave">탈퇴하기</el-button>
                
            </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import {useStore} from 'vuex'
    export default {
        data(){
            return{
                userpw:'',
                userpwchk:'',
                token: sessionStorage.getItem("TOKEN"),
                store : useStore()
            }
        },
        methods:{

            //회원 탈퇴 클릭시
            async handleLeave(){
                if(this.uerspw ===''){
                    alert('암호를 입력하세요')
                    return false
                }
                if(this.userpwchk ===''){
                    alert('암호확인을 입력하세요')
                    return false
                }
                if(this.userpw !==this.userpwchk){
                    alert('비밀번호가 다릅니다.')
                    return false
                }
                console.log("MypageComp-3 => handleLeave",1);
                const url = '/member/mypage?menu=3';
                const headers = {"Content-Type":"application/json",
                token : this.token};
                const body = {userpw : this.userpw};
                const response = await this.axios.put(
                    url, body, {headers:headers}
                );
                console.log(response)
                //회원탈퇴 성공
                if(response.data.status ===200){
                    alert('회원탈퇴 성공');
                    sessionStorage.removeItem("TOKEN")
                    this.store.commit('setMenu', 'home')
                }

                //회원 탈토ㅣ실패
                else if (response.data.status ===0){
                    alert('회원탈퇴 실패')
                }
                
            }
        }
    }
</script>

<style scoped>

</style>