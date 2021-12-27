// CMD> npm i vuex@next --save
import {createStore} from 'vuex';
import axios from 'axios';

export default createStore({

    // 상태변수(전역변수)
    // 어떤 컴포넌트에서 바꿀 수 있는 변수
    state : {
        counter : 10,
        menu : 'home',
        items : [],
    },

    // 결과 값을 가지고 가는 메소드 getter
    getters: {
        getItems(state){
            return state.items;
        },
        
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
        setItems(state, value){
            state.items = value
        },

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
        },
        //위의 예제는 비동기에 적절한 예가 아님
        //동기에서 다 해결할 수 있는거임

        //사용하고자 하는 컴포넌트에서 page정보를 전달함
        async handleData(context, payload){
            const page = payload.page
            const url 
                    = `http://ihongss.com/json/board.json?page=${page}`
                const headers = {"Content-Type":"applicaion/json"};
                const response = await axios.get(url, {headers:headers});
                if(response.data.ret ==='y'){
                    context.commit('setItems', response.data.data);
                } // 앞쪽이 메소드, 뒤쪽이 바꿔야 하는 값
                // 여기서 동기로 갔다가 위의 데이터를 바꾼다
                //컴포넌트 내부에서는 this를 못쓴다
        }
    }

})