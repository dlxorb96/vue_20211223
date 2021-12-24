<template>
    <div>
        <h3>menu1</h3>
        <button @click="handleSetStore"> store 변경 </button>
        {{cnt}}
    </div>
</template>

<script>
    import {useStore} from 'vuex'
    export default {
        mounted(){
            // this.cnt = this.store.getters.getCounter;
            
        },
        data(){
            return{
                store : useStore(),
                cnt : 0
            }
        },
        methods:{
            handleSetStore(){
                this.store.commit('setCounter', 100);
                this.cnt = this.store.getters.getCounter;
                
            }
        }
    }
</script>

<style scoped>

</style>