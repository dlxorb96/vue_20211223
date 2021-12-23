<template>
    <div>
        <el-card shadow="always">
            <h3 style="margin-left: 50px">회원 탈퇴</h3>
            <el-form  label-width="120px">
            <el-form-item :inline = true label="암호">
                <el-input placeholder="암호" 
                v-model="member.pw" 
                style="display: inline-block; width: 200px;
                margin-right: 20px;"
                type="password"
                ref="username">
                </el-input>

            </el-form-item>
            
            <el-form-item label="암호 확인">
                <el-input
                    v-model= "member.pwchk"
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
    export default {
        data(){
            return{
                member:{
                    pw : '',
                    pwchk : ''
                    }
            }
        },
        methods:{
            handleLeave(){
                console.log('MypageComp-3.vue => handleLeave')
                alert('회원 탈퇴되었습니다')
                sessionStorage.removeItem("TOKEN")
                this.$emit('changeLogged1')
                this.$router.push({name:'Home'})
            }
        }
    }
</script>

<style scoped>

</style>