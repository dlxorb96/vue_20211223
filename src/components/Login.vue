<template>
    <div>
        <h5>로그인</h5>
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

                <el-form-item>
                    <el-button type="primary" @click= "handleLogin">로그인</el-button>
                    <el-button @click= "handleJoin">회원가입</el-button>
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
                    userid: '',
                    userpw: '',
                    token : '', //로그인시에 발행되는 인증키
                    
                },
                store: useStore()
            }
        },
        methods:{
            handleLogin(){
                // 누가줬는지 어떤 정보가 있는지 암호화해서 주는 거
                this.token = '12412k3m123123n123j324jk124n5j111mmmkdf';
                sessionStorage.setItem("TOKEN", this.token)
                alert('로그인 되었습니다.');
                //부모컴포넌트로 이벤트를 발생시킴(이벤트명은 changeLogged)
                // (이벤트명은 changeLogged 파라미터는 home)
                // this.$emit('changeLogged', 'home')
                // this.$router.push({name:'Home'})
                this.store.commit('setMenu', 'home')
            },
            handleJoin(){
                this.store.commit('setMenu', 'home')
                // this.$emit('changeLogged', 'home')
                // this.$router.push({name:'Join'})

            }
        }
    }
</script>

<style scoped>

</style>