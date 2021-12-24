<template>
    <div>
        <el-tabs :tab-position="tabPosition" style="height: 500px">
            <el-tab-pane label="정보수정" ><!-- @click="changeComp(1)" -->
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
            </el-tab-pane>
           


            <el-tab-pane label="비밀번호 변경"> <!--  @click="changeComp(2)" -->
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
                <el-button type="primary" @click= "handlePasswordChange">변경하기</el-button>
                
            </el-form-item>
            </el-form>
        </el-card>
            </el-tab-pane>





            <el-tab-pane label="회원탈퇴"> <!--  @click="changeComp(3)" -->
                <!-- <component :is="currentComp" /> -->
                <el-card shadow="always">
            <h3 style="margin-left: 50px">회원 탈퇴</h3>
            <el-form  label-width="120px">
            <el-form-item :inline = true label="암호">
                <el-input placeholder="암호" 
                v-model="member.pw2" 
                style="display: inline-block; width: 200px;
                margin-right: 20px;"
                type="password"
                ref="username">
                </el-input>

            </el-form-item>
            
            <el-form-item label="암호 확인">
                <el-input
                    v-model= "member.pwchk2"
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
            </el-tab-pane>
        </el-tabs>
         

    </div>
</template>

<script>
    
    export default {
        
        created(){
            // this.changeLogged1()
        },
        data(){
            return{
                tabPosition: 'top',
                member:{
                    
                        name : '',
                        email : '',
                        pw : '',
                        pwchk : '',
                        pw2 : '',
                        pwchk2 : ''
                    },
                    
                token: sessionStorage.getItem("TOKEN")
                
                // compList : [null, 'com-1', 'comp-2', 'comp-3'],
                // currentComp : 'comp-1'
            }
        },
        methods:{
            async handleNameChange(){
                // 유효성 검사하기 비어져있나
                if(this.member.name ===''){
                    alert('이름을 입력해주세요');
                    return false;
                }
                if(this.member.email){
                    alert('이메일을 입력해주세요');
                    return false;
                }

                // restful
                const url = '주소'
                const headers = {"Content-Type": "application/json",
                "TOKEN": this.token};
                const body = {
                    name : this.member.name,
                    email : this.member.email + "@" + this.member.email
                }
                const response = await this.axios.put(url,body,{headers:headers});
                console.log(response)
                //get(조회), post(추가), put(수정), delete(삭제)
                //조회 : await this.axios.get(url, {headers:headers});
                //추가 : await this.axios.post(url, body, {headers:headers});
                //수정 : await this.axios.put(url, body, {headers:headers});
                //삭제 : await this.axios.delete(url, {headers:headers, data:{}});
                
                if(response.data.ret ==='y'){
                    alert('변경이 완료되었습니다.');
                    this.$router.push({name:'Home'})
                }


            },

            async handlePasswordChange(){
                // 유효성 검사

                // 확인하기
                const url = '주소';
                const headers = {"Content-Type": "application/json",
                "TOKEN": this.token};
                const body = {
                    pw : this.member.pw,
                };
                const response = await this.axios.put(url, body, {headers: headers});
                console.log(response)

            },


            
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