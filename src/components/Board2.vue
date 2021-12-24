<template>
    <div>
        <div class="slider-demo-block">
            <el-slider v-model="slider" @input="handlePage" show-input> </el-slider>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        created(){
            this.handleData();
        },
        data(){
            return{
                ctnt : [],
                page : 1,
                slider : 1,
            }
        },
        methods : {
            handlePage(page){
                this.page = page;
                this.handleData();
                console.log(this.ctnt);
                console.log(page);
            },
            async handleData(){
                const url 
                    = `http://ihongss.com/json/board.json?page=${this.page}`
                const headers = {"Content-Type":"applicaion/json"};

                const response = await axios.get(url, {headers:headers});
                // response.data => {ret: 'y', data: Array(10)}
                console.log(response);
                if(response.data.ret === 'y'){
                    this.ctnt = response.data.data;
                }
            }
        }
    }
</script>

<style scoped>

</style>