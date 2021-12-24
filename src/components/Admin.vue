<template>
    <div>
        <div>
        <input type="button" value="메뉴1" @click="changeMenu(1)">
        <input type="button" value="메뉴2" @click="changeMenu(2)">
        </div> 
        {{cnt}}
        <button @click="handleSetStore">store변경</button>
        <!-- <component :is="currentComp" /> -->
        
        
        <div v-if="menu === 1">
            <menu-1></menu-1>


        </div>
        <div v-if="menu === 2">
            <menu-2></menu-2>
        </div>
    </div>
</template>

<script>
    import {useStore} from 'vuex';

    import menu1 from './Admin/Menu1.vue';
    import menu2 from './Admin/Menu2.vue';
    export default {
        mounted(){
            const store = useStore();
            console.log(store)
            this.cnt = this.store.getters.getCounter;
            console.log(this.cnt)

            // store가 변화할 때 자동으로 수행
            this.store.subscribe((mutation, state) =>{
                console.log(mutation, state)
                if(mutation.type === 'setCounter'){
                    this.cnt = mutation.payload;
                }
            })
        },

        components:{
            'menu-1' : menu1,
            'menu-2' : menu2
        },

        data(){
            return{
                menu : 1,
                cnt : 0,
                store : useStore(),

                // compList : [null, 'menu-1', 'menu-2'],
                // currentComp : 'menu-1'
            }
        },

        methods:{
            changeMenu(no){
                this.menu = no;
                // this.currentComp = this.compList[no];
            },

            handleSetStore(){
                
                // store 변수 변경하기
                this.store.commit('setCounter', 798);
                this.cnt = this.store.getters.getCounter;
            },
        }
    }
</script>

<style scoped>

</style>