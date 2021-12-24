<template>
    <div>
        <h3>menu2</h3>
        <button @click="handleSetStore" >store값 변경</button>
    </div>
</template>

<script>
    import {useStore} from 'vuex'
    export default {
        data(){
            return{
                store : useStore(),
                cnt : 0
            }
        },
        methods:{
            handleSetStore(){
                this.store.commit('setCounter', 2341)
            }
        }
    }
</script>

<style scoped>

</style>