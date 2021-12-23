// node_module로부터 필요한 라이브러리 import
import { createWebHistory, createRouter } from "vue-router";

// 추가하고자 하는 컴포넌트들
import Home from '@/components/Home.vue'
import Join from '@/components/Join.vue'
import Login from '@/components/Login.vue'
import Logout from '@/components/Logout.vue'
import Mypage from '@/components/Mypage.vue'

// URL과 컴포넌트의 연결
const routes = [
    // /를 치면 자동으로 홈이 붙는다
    {path: '/', redirect: '/home'},
    {path: '/home', name: 'Home', component: Home},
    {path: '/join', name: 'Join', component: Join},
    {path: '/login', name: 'Login', component: Login},
    {path: '/logout', name: 'Logout', component: Logout},
    {path: '/mypage', name: 'Mypage', component: Mypage},
]

// 실제 라우트 적용
const router = createRouter({
    history: createWebHistory(),
    routes,
})
  
// #이 붙어서 만들어지는 방식도 있음

// 프로젝트에 적용하기 위해
export default router;