// CMD> npm i vuex@next --save
import {createStore} from 'vuex'

export default createStore({

    // 상태변수(전역변수)
    // 어떤 컴포넌트에서 바꿀 수 있는 변수
    state : {
        counter : 10,
        menu : 'home'
    },

    // 결과 값을 가지고 가는 메소드 getter
    getters: {
        getMenu:(state)=>{
            return state.menu; 
        },

        getCounter(state){ //그대로 값
            return state.counter;
        },

        getCounter1 : state =>{ //가공된 값
            return state.counter * 2;
        }
    },

    //결과 값을 바꾸는 것(동기)
    
    mutations: {
        setMenu(state, value){
             state.menu = value;
        },

        setCounter : (state, value) =>{
            state.counter = value;
        },
        setCounter1 (state, value){
            state.counter = value + 100;
        }
    },

    //결과 값을 바꾸는 것(비동기)
    actions:{
        actionCounter (context, payload){
            const value = payload.counter;
            //위에 생성되어 있는 setCounter를 호출함
            // 위에가 있어야 함
            context.commit('setCounter', value);
        }
    }

})