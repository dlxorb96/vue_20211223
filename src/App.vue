<template>
  <div>
    <el-container>
      <el-header>
        <el-menu          
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">홈</el-menu-item>
          <el-menu-item v-if="!logged" index="2">로그인</el-menu-item>
          <el-menu-item v-if="logged" index="2-1">로그아웃</el-menu-item>
          <el-menu-item v-if="logged" index="4">마이페이지</el-menu-item>
          <el-menu-item v-if="!logged" index="3">회원가입</el-menu-item>
        </el-menu>
      </el-header>

      <el-main>
        <router-view @changeLogged = "changeLogged"></router-view>
      </el-main>

      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  created() {
    const tmp = sessionStorage.getItem("activeIndex");
    if (tmp === null) {
      this.activeIndex = "1";
      this.$router.push({ name: "Home" });
    } 
    else {
      this.activeIndex = tmp;
    }
    this.changeLogged();
  },
  mounted(){
  },
 

  data() {
    return {
      activeIndex: sessionStorage.getItem("activeIndex"),
      logged: false,
    };
  },
  methods: {
    handleSelect(idx) {
      console.log("App.vue => handleSelec", idx);
      if (idx === "1") {
        this.$router.push({ name: "Home" });
      }
      if (idx === "2") {
        this.$router.push({ name: "Login" });
      }
      if (idx === "2-1") {
        this.$router.push({ name: "Logout" });
      }

      if (idx === "3") {
        this.$router.push({ name: "Join" });
      }
      if (idx === "4") {
        this.$router.push({ name: "Mypage" });
      }
       sessionStorage.setItem("activeIndex", idx);
    },

    changeLogged() {
      console.log("App.vue => changeLogged")
      //현재 로그인 상태를 확인하기
      const token = sessionStorage.getItem("TOKEN");
      // 토큰이 없을 때
      if (token === null) {
        this.logged = false;
      } 
      // 토큰이 있을 때
      else {
        this.logged = true;
      }
      this.activeIndex = '1';
    },
  },
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  /* text-align: center;
  line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>