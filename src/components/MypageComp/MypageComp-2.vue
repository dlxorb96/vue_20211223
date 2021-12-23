<template>
    <div>
        <el-card shadow="always">
                    <h3 style="margin-left: 50px">비밀번호 변경</h3>
                    <el-form  label-width="120px">
                    <el-form-item :inline = true label="현재 암호">
                        <el-input placeholder="암호" 
                        v-model="member.pw" 
                        style="display: inline-block; width: 200px;
                        margin-right: 20px;"
                        type="password"
                        ref="username">
                        </el-input>

                    </el-form-item>
                    
                    <el-form-item label="바꿀 암호">
                        <el-input
                            v-model= "member.pwchk"
                            placeholder="바꿀 암호 "
                            type="password"
                            style="display: inline-block; width: 200px;
                            margin-right: 20px;"
                            ref="useremail">
                        </el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click= "handleNameChange">변경하기</el-button>
                        
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
            handleNameChange(){
                alert('변경이 완료되었습니다.')
                this.$router.push({name:'Home'})
            }
        }
    }
</script>

<style scoped>

</style>