<template>
    <div>
        <el-card shadow="always">
                    <h3 style="margin-left: 50px">정보수정</h3>
                    <el-form  label-width="120px">
                    <el-form-item :inline = true label="이름 변경">
                        <el-input placeholder="이름" 
                        v-model="member.name" 
                        style="display: inline-block; width: 200px;
                        margin-right: 20px;"
                        ref="username">
                        </el-input>

                    </el-form-item>
                    
                    <el-form-item label="이메일 변경">
                        <el-input
                            v-model= "member.email"
                            placeholder="이메일 "
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
        props:{

        },
        data(){
            return{
                member:{
                    name : '',
                    email : ''
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