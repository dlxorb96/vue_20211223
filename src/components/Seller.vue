<template>
  <div>
    <el-card shadow="always">
      <h4>판매자</h4>

      <el-button type="success" size="small" @click="insertItem">
        물품등록
      </el-button>
      <router-link to="ItemInsertBatch">
        <el-button type="success" style="margin-left : 10px" size="small" @click="insertItem">
          물품일괄등록  
        </el-button>
      </router-link>
      <el-button type="danger" style="margin-left : 10px" size="small" @click="deleteSomeItem">
          물품일괄삭제  
      </el-button>

     {{items}}
        

      <el-table :data="items" size="mini" style="width: 100%;">

       <el-table-column label="선택" width="50">
        <template #default="scope">
          <el-checkbox v-model="scope.row.chk" @change="clickChk(scope.row)"  size="large"></el-checkbox>
        </template>
       </el-table-column>

        <el-table-column label="코드" width="180">
            <template #default="scope">
                <div @click="rowClick(scope)" style="cursor:pointer;">
                    {{scope.$index+1}}
                </div>
            </template>
        </el-table-column>    

        <el-table-column prop="name" label="물품명" width="180" />
        <el-table-column prop="price" label="가격" />
        <el-table-column prop="quantity" label="수량" />
        <el-table-column prop="regdate" label="등록일" />
        <el-table-column fixed="right" label="Operations" width="120">
          <template #default="scope">
            <el-button
              type="warning"
              size="small"
              style="width: 40px"
              @click.prevent="deleteRow(/*scope.$index,*/ scope.row)"
            >
              삭제
            </el-button>
            <el-button
              type="info"
              size="small"
              style="width: 40px; text-align: center"
              @click.prevent="editRow(/*scope.$index,*/ scope.row)"
            >
              수정
            </el-button>
          </template>
        </el-table-column>
      </el-table>


      <el-dialog
        v-model="dialogVisible"
        title="Tips"
        width="30%"
        :before-close="handleClose"
      >
        <div>수정하기</div>
        <input type="file" @change="handleImage" />
        <img :src="itemOne.image" style="width: 200px" />
        <!-- <el-upload
          action="#"
          list-type="picture-card"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-change="handleChange"
          :auto-upload="false"
        >
          <el-icon><plus /></el-icon>
        </el-upload>

         <el-dialog v-model="dialogVisible2">
          <img style="width: 100%" :src="dialogImageUrl" alt="" />
        </el-dialog> -->
        <div>
          <span style="display: inline-block; width: 80px">물품명</span
          ><input style="display: " type="text" v-model="itemOne.name" />
        </div>
        <div>
          <span style="display: inline-block; width: 80px">글 내용</span
          ><input style="display: " type="text" v-model="itemOne.content" />
        </div>
        <div>
          <span style="display: inline-block; width: 80px">가격</span
          ><input style="display: " type="text" v-model="itemOne.price" />
        </div>
        <div>
          <span style="display: inline-block; width: 80px">수량</span
          ><input style="display: " type="text" v-model="itemOne.quantity" />
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="editConfirm">수정하기</el-button>
          </span>
        </template>
      </el-dialog>
      <div class="block">
        <el-pagination
          @current-change="changePage"
          layout="prev, pager, next"
          :total="this.total"
          :current-page="this.page"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    this.handleData();
  },

  data() {
    return {
      items: [],
      page: 1,
      total: 0,
      code: "",
      abc: "",
      itemOne: {},
      dialogVisible: false,
    //   dialogVisible2: false
    //   dialogImageUrl : '',
        // dialogVisible : false
    };
  },
  methods: {
    async deleteSomeItem(){
      const url = '/item/deletebatch';
      const headers = {"Content-Type" : "application/json"};
      const body = []
      for(let i =0; i < this.items.length; i++){
        if(this.items[i].chk){
        body.push(this.items[i])
        }
      }
      console.log("Seller.vue => deleteSomeItem()" , body)
      const response = await this.axios.delete(url, {
      headers : headers,
      data    : body
      });
      console.log("Seller.vue => deleteSomeItem()" , response);
      if(response.data.status ===200){
        await this.handleData();

        // for(let i =0; i < this.items.length; i++){
        //   this.items[i].chk = false
        //   console.log(123)
        // }
        
      }

    }
    ,
    clickChk(row){
      console.log("Seller.vue => clickChk",row)
    },


    handleClose(){
        console.log('Seller => handleClose')
        this.dialogVisible = false
    },
    handleImage(e){
        console.log(e)
      //   벡엔드로 변경할 이미지 실제 정보
        this.itemOne['image1'] = e.target.files[0];

      //   프론트에서 미리보기용 임시 URL
        this.itemOne['image1URL'] = URL.createObjectURL(e.target.files[0]);

      // dialog img src를 변경하기
      //   this.itemOne[image] = URL.createObjectURL(e.target.files[0]);

    },
    async editConfirm() {
      this.dialogVisible = false;
      const url = `/item/update?code=${this.itemOne._id}`;
      const headers = { "Content-Type": "multipart/form-data" };
      const body = new FormData();
      body.append("name", this.itemOne.name)
      body.append("content", this.itemOne.content)
      body.append("price", this.itemOne.price)
      body.append("quantity", this.itemOne.quantity)
      body.append("file", this.itemOne.image1)
      const response = await this.axios.put(url, body, { headers: headers });
      console.log("Seller.vue => editConfirm" ,response);
      if (response.data.status === 200) {
        this.handleData();
        this.itemOne = {}     
      }
      console.log("Seller.vue => editConfirm",this.itemOne)
    },

    async editRow(row) {
      this.dialogVisible = true;
      console.log(row._id);
      const url = `/item/selectOne?code=${row._id}`;
      const headers = { "Content-Type": "application/json" };
      
      const resposne = await this.axios.get(url, { headers: headers });
      console.log(resposne);

      if (resposne.status === 200) {
        this.itemOne = resposne.data.result;
      }

      // 코드를 이용해서 백엔드에서 1개의 정보를 받음
      // 모달창에 v-model 연결
      // 모달창 띄우기
    },

    rowClick(row) {
        
      console.log("Seller.vue => rowClick",row)
      this.$router.push({
        name: "ItemContent",
        query: { code: row.row._id },
      });
    },

    async handleData() {
      const url = `/item/select?page=${this.page}`;
      const headers = { "Content-Type": "application/json" };
      const response = await this.axios.get(url, { headers: headers });
      console.log("Seller.vue => handleData()",response);
      if (response.data.status === 200) {
        this.items = response.data.result;
        this.total = response.data.total;
        for(let i =0; i < this.items.length; i++){
          this.items[i].chk = false
        }
        
      }
      // console.log(response)
    },

    changePage(page) {
      this.page = page;
      this.handleData();
    },

    deleteRow(row) {
      if (confirm("삭제하시겠습니까?")) {
        console.log("seller.vue => deleteRow");
        console.log(row._id);
        this.code = row._id;
        this.deleteItem();
      }
      //   console.log("seller.vue => deleteRow");
      //   console.log(row._id);
      //   this.code = row._id;
      //   this.deleteItem();
    },

    async deleteItem() {
      const url = `item/delete?code=${this.code}`;
      const headers = { "Content-Type": "application/json" };
      const response = await this.axios.delete(url, {
        headers: headers,
        data: { code: this.code },
      });
      if (response.data.status === 200) {
        this.changePage(1);
        console.log(response);
      }
    },

    insertItem() {
      this.$router.push({
        name: "ItemInsert",
      });
    },
  },
};
</script>

<style scoped>
</style>