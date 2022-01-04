<template>
    <div>
        <el-card shadow="always">
            <h3 style="margin-left: 50px">회원가입</h3>
            <el-form  label-width="120px">
                <el-form-item :inline = true label="아이디">
                    <el-input placeholder="아이디입력" 
                    v-model="member.userid" 
                    style="display: inline-block; width: 200px;
                    margin-right: 20px;"
                    ref="userid">
                    </el-input>
                    <el-button type="primary">중복확인</el-button>

                </el-form-item>


                <el-form-item label="암호">
                    <el-input
                        v-model= "member.uesrpw"
                        placeholder="암호"
                        type="password"
                        style="display: inline-block; width: 200px;
                        margin-right: 20px;"
                        ref="userpw">
                    </el-input>
                </el-form-item>

                <el-form-item label="암호확인">
                    <el-input
                        v-model= "member.uesrpwchk"
                        placeholder="암호확인"
                        type="password"
                        style="display: inline-block; width: 200px;
                        margin-right: 20px;"
                        ref="userpwchk">
                    </el-input>
                </el-form-item>

                <el-form-item label="나이">
                    <el-input
                        v-model= "member.age"
                        placeholder="나이"
                        type="number"
                        style="display: inline-block; width: 200px;
                        margin-right: 20px;"
                        ref="age">
                    </el-input>
                </el-form-item>

                <el-form-item label="생년월일">
                    <el-form-item>
                        <el-date-picker
                            v-model="member.date"
                            type="date"
                            placeholder="Pick a date"
                            style="display: inline-block; width: 200px;
                                margin-right: 20px;"
                                ref="date">
                        </el-date-picker>
                    </el-form-item>
                </el-form-item>    

                <el-form-item label="이메일">
                    <el-input
                        v-model="member.email"
                        placeholder="이메일"
                        style="display: inline-block; width: 200px;
                        margin-right: 20px;"
                        ref="email">
                    </el-input>
                    <span style="display: inline-block; margin-left: -15px; margin-right: 5px">@</span>
                    <el-select ref="email2" v-model= "member.email2" placeholder="이메일">
                        <el-option v-for="tmp in emailOption" :key= "tmp" :label= "tmp" :value= "tmp"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="관심 분야">
                    <el-checkbox-group v-model= "member.type"><!-- ref="type" -->
                        <el-checkbox v-for="tmp in typeOption" :key= "tmp" :label= 'tmp' :name= 'tmp'></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item label="성별">
                    <el-radio-group v-model= "member.gender" ><!-- ref="gender" -->
                        <el-radio label="1">남자</el-radio>
                        <el-radio label="2">여자</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="약관내용">
                    <el-input v-model= "member.desc" type="textarea"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-checkbox v-model= "member.chk">약관에 동의해주세요</el-checkbox>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click= "join">회원가입</el-button>
                    <el-button @click= "toHome">홈으로</el-button>
                </el-form-item>

            </el-form>
        </el-card>

    </div>
</template>

<script>
    export default {
        
        data(){
            return{
                member: {
                    userid : '1',
                    uesrpw : '1',
                    uesrpwchk : '1',
                    age : '1',
                    date : '1',
                    email : '1',
                    email2 : '1',
                    email3 : '',
                    type : ['Html'],
                    gender : '2',
                    desc : '1',
                    chk : '',
                },
                emailOption : ['naver.com', 'gamil.com', 'hanmail.net'],
                typeOption : ["HTML", "CSS", "JAVASCRIOT", "VUE"]
            }
        },
        methods:{
            async join(){

            

                if(this.member.userid ===''){
                    alert('아이디를 입력해주세요')
                    this.$refs.userid.focus();
                    return false;
                }
                if(this.member.uesrpw ===''){
                    alert('암호를 입력해주세요')
                    this.$refs.userpw.focus();
                    return false;
                }
                if(this.member.uesrpwchk ===''){
                    alert('암호확인을 입력해주세요')
                    this.$refs.userpwchk.focus();
                    return false;
                }
                if(this.member.age ===''){
                    alert('나이를 입력해주세요')
                    this.$refs.age.focus();
                    return false;
                }
                if(this.member.date ===''){
                    alert('생년월일을 입력해주세요')
                    this.$refs.date.focus();
                    return false;
                }
                if(this.member.email ===''){
                    alert('이메일를 입력해주세요')
                    this.$refs.email.focus();
                    return false;
                }
                if(this.member.email2 ===''){
                    alert('이메일를 선택해주세요')
                    this.$refs.email2.focus();
                    return false;
                }
                if(this.member.type.length === 0){
                    alert('관심분야를 클릭해주세요')
                    return false;
                }
                if(this.member.gender ===''){
                    alert('성별를 입력해주세요')
                    return false;
                }
                if(this.member.chk ===false){
                    alert('약관에 동의해주세요')
                    return false;
                }
                
                // this.$router.push({
                //     name:'Home'
                    
                // })
                sessionStorage.setItem("activeIndex", 1);
                this.aa()

            },
            async aa(){
                const url = '/member/insert';
                const headers = {"Content-Type" : "application/json"}
                
                const body = {
                    uid: this.member.userid,
                    upw: this.member.uesrpw,
                    ubirth: this.member.date,
                    uemail: String(this.member.email)+ '@' + String(this.member.email2),
                    ucheck: this.member.chk,
                    ugender: this.member.gender,
                };
                
                const response = await this.axios.post(
                    url, body, {headers: headers}
                );
                if(response.status === 200){
                    console.log("success")
                }
                if(response.stauts ===0){
                    alert('다시 확인')
                }
                console.log(response)
                alert('환영합니다')
            },


            toHome(){
                this.$router.push({
                    name:'Home'
                })
                sessionStorage.setItem("activeIndex", 1);
            },
            
        }
    }
</script>

<style scoped>
el-input{
    display: inline-block; 
    width: 200px;
}
</style>