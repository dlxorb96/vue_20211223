// node_module로부터 필요한 라이브러리 import
import { createWebHashHistory, createRouter } from "vue-router";

// 추가하고자 하는 컴포넌트들
import Home from '@/components/Home.vue'
import Join from '@/components/Join.vue'
import Login from '@/components/Login.vue'
import Logout from '@/components/Logout.vue'
import Mypage from '@/components/Mypage.vue'
import Mypage2 from '@/components/Mypage2.vue'
import Admin from '@/components/Admin.vue'
import Board from '@/components/Board.vue'
import BoardOne from '@/components/BoardOne.vue'
import BoardWrite from '@/components/BoardWrite.vue'
import Seller from '@/components/Seller.vue'
import ItemInsert from '@/components/ItemInsert.vue'
import ItemContent from '@/components/ItemContent.vue'
import ItemInsertBatch from '@/components/ItemInsertBatch.vue'
import ItemUpdateBatch from '@/components/ItemUpdateBatch.vue'

// URL과 컴포넌트의 연결
const routes = [
    // /를 치면 자동으로 홈이 붙는다
    {path: '/', redirect: '/home'},
    {path: '/home', name: 'Home', component: Home},
    {path: '/join', name: 'Join', component: Join},
    {path: '/login', name: 'Login', component: Login},
    {path: '/logout', name: 'Logout', component: Logout},
    {path: '/mypage', name: 'Mypage', component: Mypage},
    {path: '/mypage2', name: 'Mypage2', component: Mypage2},
    {path: '/admin', name: 'Admin', component: Admin},
    {path: '/board', name: 'Board', component: Board},
    {path: '/boardOne', name: 'BoardOne', component: BoardOne},
    {path: '/boardWrite', name: 'BoardWrite', component: BoardWrite},
    {path: '/seller', name: 'Seller', component: Seller},
    {path: '/itemInsert', name: 'ItemInsert', component: ItemInsert},
    {path: '/itemContent', name: 'ItemContent', component: ItemContent},
    {path: '/itemInsertBatch', name: 'ItemInsertBatch', component: ItemInsertBatch},
    {path: '/itemUpdateBatch', name: 'ItemUpdateBatch', component: ItemUpdateBatch},
]

// 실제 라우트 적용
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
  
// #이 붙어서 만들어지는 방식도 있음

// 프로젝트에 적용하기 위해
export default router;