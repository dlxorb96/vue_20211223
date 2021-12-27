<template>
    <div>
        {{bno}}, {{no}}
        <table>
            <thead>
                <tr>
                    <th>작성자</th>
                    <th>제목</th>
                    <th>등록날짜</th>
                    <th>번호</th>
                    <th>조회수</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{items.writer}}</td>
                    <td>{{items.title}}</td>
                    <td>{{items.regdate}}</td>
                    <td>{{items.no}}</td>
                    <td><img :src="items.img"></td>
                </tr>
            </tbody>
        </table>



    </div>
</template>

<script>
    import {useStore} from 'vuex'
    export default {
        created(){

            this.handleData()
        },
        mounted(){

        },
        data(){
            return{
                store : useStore(),
                items : [],
                no: Number(this.$route.query.no),
                bno : Number(this.$route.query.bno)

            }
        },
        methods:{
            // handleData(){
            //     this.items = this.store.getters.getItems
            // }
            
            async handleData(){
                const url = `http://ihongss.com/json/boardone.json?bno=${this.bno}&no=${this.no}`;
                const headers = {"content-Type" : "application/json"};
                const response = await this.axios.get(url,{headers: headers})
                console.log(response)
                if(response.data.ret ==='y'){
                    this.items = response.data.data
                }
                console.log(this.items)

            }
        }
    }
</script>

<style scoped>
    
</style>