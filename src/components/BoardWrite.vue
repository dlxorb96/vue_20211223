<template>
    <div>
        <h3 style="margin-left: 100px">게시글 쓰기</h3>

        {{board}}
        <el-form style="width: 800px;" >

        <el-form-item label="글 번호" label-width="120px">
        <el-input style="display: inline-block; width: 200px" v-model="board.no"></el-input>
        </el-form-item>

        <el-form-item label="제목" style="margin-right: 20px;" label-width="120px" >
        <el-input style="display: inline-block; width: 200px;  " v-model="board.title"></el-input>
        </el-form-item>

        
        <el-form-item label="작성자" style="margin-right: 20px;" label-width="120px" >
        <el-input style="display: inline-block; width: 200px;  " v-model="board.writer"></el-input>
        </el-form-item>

        <el-form-item label="글 내용" label-width="120px">
        <el-input v-model="board.desc" type="textarea" style="min-height: 50px"></el-input>
        </el-form-item>
        <el-form-item label-width="120px">
        <el-button type="primary" @click="submitForm">작성하기</el-button>
        </el-form-item>
        </el-form>
        

    </div>
</template>

<script>
    export default {
        created(){
            // this.submitForm()
        },
        methods:{
            async submitForm(){
                // 유효성 검사 통과
                // alert('작성완료')

                const url = "/board/insert"
                const headers = {"Content-Type" : "application/json"}
                //body에 raw에 json이 어플리케이션 제이슨 부분임
                // json모양 제일 많이 쓰는 모양
                const body = this.board;
                // {no : this.board.no
                // title : this.board.title
                // writer : this.board.writer
                // content : this.board.content}
                // 수동으로 할 필요가 없음
                
                const response = await this.axios.post(url, body, {headers: headers});
                console.log(response);
                if(response.data.status ===200){
                    alert('글쓰기 성공');
                    this.$router.push({name:"Board"})
                }


            }
        },
        data(){
            return{
                board:{
                    no:'',
                    title:'',
                    writer: '',
                    content: '',
                
                }
                
            }
        }
    }
</script>

<style scoped>
    

.el-textarea__inner{
    height: 70px;
}
</style>