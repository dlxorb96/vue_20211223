<template>
    <div>

    </div>
</template>

<script>
    import {useStore} from 'vuex';
    export default {
        created(){
            // 세션에서 토큰 지우기
            sessionStorage.removeItem("TOKEN")
            // 알림창표시
            alert('로그아웃 되었습니다')

            const store = useStore();
            store.commit('setMenu', 'home')
            // this.$emit('changeLogged', 'home')
            // this.$router.push({name:"Home"})
        }
    }
</script>

<style scoped>

</style>