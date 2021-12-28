<template>
    <div>

    </div>
</template>

<script>
    export default {
        created(){

            this.handleData()
            
        },
        mounted(){
        },

        data(){
            return{
                items : [],
                no: Number(this.$route.query.no),
                // bno : Number(this.$route.query.bno)

            }
        },
        methods:{


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
    }}
</script>

<style scoped>
    
</style>