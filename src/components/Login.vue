<template>
    <div>
        <h5>로그인</h5>
        <el-card shadow="always">
            <h3 style="margin-left: 50px">회원가입</h3>
            <el-form  label-width="120px">
                <el-form-item :inline = true label="아이디">
                    <el-input placeholder="아이디입력" 
                    v-model="member.uid" 
                    style="display: inline-block; width: 200px;
                    margin-right: 20px;"
                    ref="uid">
                    </el-input>

                </el-form-item>
                
                <el-form-item label="암호">
                    <el-input
                        v-model= "member.upw"
                        placeholder="암호"
                        type="password"
                        style="display: inline-block; width: 200px;
                        margin-right: 20px;"
                        ref="upw">
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click= "handleLogin">로그인</el-button>
                    <el-button @click= "handleJoin">회원가입</el-button>
                    
                    <el-button @click= "handelHome">홈</el-button>
                </el-form-item>
            </el-form>
        </el-card>

    </div>
</template>

<script>
    import {useStore} from 'vuex';
    export default {
        data(){
            return{
                member:{
                    uid: '',
                    upw: '',
                    token : '', //로그인시에 발행되는 인증키
                    
                },
                store: useStore()
            }
        },
        methods:{
            handelHome(){
                // this.$router.push({
                //     path:'/home',
                //     // name: 'Home'
                //     })
                // App.vue로 메뉴가 변경된 것을 통보해야함
                // App.vue가 상단메뉴를 바꾸게 됨
                this.store.commit('setMenu', 'home')
            },

            async handleLogin(){
                if(this.member.uid === ''){
                    alert('아이디를 입력해주세요')
                    this.$refs.uid.focus();
                    return false;
                }
                if(this.member.upw ===''){
                    alert('암호를 입력해주세요')
                    this.$refs.upw.focus();
                    return false;
                }
                // 누가줬는지 어떤 정보가 있는지 암호화해서 주는 거
                // this.token = '12412k3m123123n123j324jk124n5j111mmmkdf';
                // sessionStorage.setItem("TOKEN", this.token)
                // alert('로그인 되었습니다.');
                //부모컴포넌트로 이벤트를 발생시킴(이벤트명은 changeLogged)
                // (이벤트명은 changeLogged 파라미터는 home)
                // this.$emit('changeLogged', 'home')
                // this.$router.push({name:'Home'})
                // this.store.commit('setMenu', 'home')


                const url = '/member/select';
                const headers = {"Content-Type" : "application/json"};
                const body = {
                    uid : this.member.uid,
                    upw : this.member.upw,
                }
                const response = await this.axios.post(
                    url, body, {headers:headers}
                )
                if(response.data.status === 200){
                    alert('로그인 성공');
                    //1. 토큰을 저장소에 보관
                    sessionStorage.setItem("TOKEN", response.data.result.token)

                    //2. 홈으로 이동한다.
                    this.store.commit('setMenu', 'home')

                    //3. App.vue에 메뉴의 상태를 통지함
                }
                else if(response.data.status === 0){
                    alert('아이디 비밀번호를 확인해주세요');
                }
                console.log(response)
            },

            //회원가입 버튼 클릭 시
            handleJoin(){
                this.store.commit('setMenu', 'Join')
                // this.$emit('changeLogged', 'home')
                // this.$router.push({name:'Join'})
            }
        }
    }
</script>

<style scoped>

</style>