<template>
    <div>
        <table border="1">
            <thead>
                <tr>
                    <th>작성자</th>
                    <th>제목</th>
                    <th>등록날짜</th>
                    <th>번호</th>
                    <th>조회수</th>
                    <th>내용</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{items.writer}}</td>
                    <td>{{items.title}}</td>
                    <td>{{items.regdate}}</td>
                    <td>{{items._id}}</td>
                    <td>{{items.hit}}</td>
                    <td>{{items.content}}</td>
                </tr>
            </tbody>
        </table>
        <router-link to="/board">
        <button>글목록</button>
        </router-link>
        <button @click="dialogVisible2 = true" >글삭제</button>
        <button @click="dialogVisible = true">글수정</button>
        <button @click="handleLeft">이전글</button>
        <button @click="handleRight">다음글</button>
        

        <el-dialog
            v-model="dialogVisible"
            title="Tips"
            width="30%">
            <span>{{items._id}}</span>
            <el-input v-model="editItems.title" placeholder="제목 수정" />
            <el-input v-model="editItems.content" placeholder="내용 수정" />
            
            <template #footer>
                <span class="dialog-footer">
                <el-button @click="dialogVisible = false">취소하기</el-button>
                <el-button type="primary" @click="edit">수정하기</el-button>
                </span>
            </template>
        </el-dialog>

        <el-dialog
            v-model="dialogVisible2"
            title="Alert"
            width="30%">
            <div style="width: 70%; text-align: center">정말로 삭제하시겠습니까?</div>
            
            <template #footer>
                <span class="dialog-footer">
                <el-button @click="dialogVisible = false">취소하기</el-button>
                <!-- <button @click="deleteOne">삭제하기</button> -->
                <el-button type="primary" @click="deleteOne">삭제하기</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>

export default {
        created(){

            this.handleData()
            
        },
        mounted(){
            // this.handleData2()
        },
        data(){
            return{
                items : [],
                no: Number(this.$route.query.no),
                // bno : Number(this.$route.query.bno)
                dialogVisible : false,
                dialogVisible2 : false,
                editItems: {
                    no : Number(this.$route.query.no),
                    title:'',
                    content: '',
                }
            }
        },
        methods:{
            async handleLeft(){
                const url = `/board/selectone?no=${this.no - 1}`;
                const headers = {"Content-Type" : "application/json"}
                const response = await this.axios.get(url,{headers: headers})
                console.log(response)
                if(response.data.status ===200){
                    this.items = response.data.result
                    this.no--
                    this.handleData()
                    
                }
            },
            async handleRight(){  
                const url = `/board/selectone?no=${this.no + 1}`;
                const headers = {"Content-Type" : "application/json"}
                const response = await this.axios.get(url,{headers: headers})
                console.log(response)
                if(response.data.status ===200){
                    this.items = response.data.result
                    this.no++
                    this.handleData()
                }
            },
            async deleteOne(){
                const url = `/board/delete?no=${this.no}`;
                const headers = {"Content-Type" : "application/json"}
                const response = await this.axios.delete(
                    url, {headers:headers, data:{'no': this.items.no}})
                    console.log(this.no)
                if(response.data.status === 200){
                    this.$router.push({name:"Board"})

                }
                this.dialogVisible = false

                console.log(response)
                

            },

            async edit(){
                const url = `/board/update?no=${this.no}`
                const headers = {"Content-Type" : "application/json"}
                //body에 raw에 json이 어플리케이션 제이슨 부분임
                // json모양 제일 많이 쓰는 모양
                const body = this.editItems;
           
                const response = await this.axios.put(url, body, {headers: headers});
                console.log(response);
                if(response.data.status === 200){
                    this.items = response.data.result
                }

                this.dialogVisible = false
                // this.handleData()
            },
            
            async handleData(){
                const url = `/board/selectone?no=${this.no}`;
                const headers = {"content-Type" : "application/json"};
                const response = await this.axios.get(url,{headers: headers})
                console.log(response)
                if(response.data.status ===200){
                    this.items = response.data.result
                }
                console.log(this.items)
            },

            // async hadleData2(){
            //     const url = `board/updatehit?no=${this.items._id}`
            //     const headers = {"content-Type" : "application/json"};
            //     const response = await this.axios.get(url,{headers: headers})
            //     console.log(response)
            // }
        }
    }
</script>

<style scoped>
    
</style>