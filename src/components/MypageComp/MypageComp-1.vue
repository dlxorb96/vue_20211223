<template>
    <div>
        <el-card shadow="always">
            {{member}}
                    <h3 style="margin-left: 50px">정보수정</h3>
                    <el-form  label-width="120px">
                    <el-form-item :inline = true label="나이 변경">
                        <el-input placeholder="나이" 
                        v-model="member.userage" 
                        style="display: inline-block; width: 200px;
                        margin-right: 20px;"
                        ref="userage">
                        </el-input>

                    </el-form-item>
                    
                    <el-form-item label="이메일 변경">
                        <el-input
                            v-model= "member.useremail"
                            placeholder="이메일 "
                            style="display: inline-block; width: 200px;
                            margin-right: 20px;"
                            ref="useremail">
                        </el-input>
                        <span style="display: inline-block; margin-left: -15px; margin-right: 5px">@</span>
                        <el-select ref="useremail2" v-model= "member.useremail2" placeholder="이메일">
                            <el-option v-for="tmp in emailOption" :key= "tmp" :label= "tmp" :value= "tmp"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click= "handleChange">변경하기</el-button>
                        
                    </el-form-item>
                    </el-form>
                </el-card>
    </div>
</template>

<script>
    export default {
        created(){
            this.handleData()
        },
        
        data(){
            return{
                //로그인시에 저장했던 TOKEN정보를 읽음
                token : sessionStorage.getItem("TOKEN"),
                member: '',
                userage:'',
                useremail:'',
                useremail2:'',
                
                emailOption : ['naver.com', 'gamil.com', 'hanmail.net'],
            }
        },
        methods :{
            async handleData(){
                const url = '/member/selectone';
                const headers = {"Content-Type": "application/json",
                "token": this.token};
                const response = await this.axios.get(url, {headers:headers})
                console.log(response)
                if(response.data.status ===200){
                    this.member = response.data.result;
                    const tmp = this.member.useremail.split('@')
                    console.log(tmp)
                    this.member.useremail = tmp[0]
                    this.member.useremail2 = tmp[1]

                }
                
            },

            async handleChange(){

                console.log("MypageComp-1 => handleNameChange",1)
                if(this.member.userage ===''){
                    alert('나이를 입력해주세요');
                    this.$refs.userage.focus();
                    return false;
                }
                if(isNaN(Number(this.member.userage))){
                    alert('나이를 숫자로 입력해주세요')
                    this.$refs.userage.focus();
                    return false;
                }

                if(this.member.useremail === ''){
                    alert('이메일을 입력해주세요');
                    this.$refs.useremail.focus();
                    return false;
                }

                // restful
                const url = '/member/mypage?menu=1'
                const headers = {"Content-Type": "application/json",
                "TOKEN": this.token};
                const body = {
                    userage : this.member.userage,
                    useremail : this.member.useremail + "@" + this.member.useremail2
                }
                const response = await this.axios.put(url,body,{headers:headers});
                console.log(response)
                if(response.data.status ===200){
                    alert('변경이 완료되었습니다.');
                    // this.$router.push({name:'Home'})
                }



                //get(조회), post(추가), put(수정), delete(삭제)
                //조회 : await this.axios.get(url, {headers:headers});
                //추가 : await this.axios.post(url, body, {headers:headers});
                //수정 : await this.axios.put(url, body, {headers:headers});
                //삭제 : await this.axios.delete(url, {headers:headers, data:{}});
                
                

            }
        }
    }
</script>

<style scoped>

</style>