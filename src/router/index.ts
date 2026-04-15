import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 前台页面
import Home from '../views/Home.vue'
import ArticleDetail from '../views/ArticleDetail.vue'
import Bookmarks from '../views/Bookmarks.vue'

// 后台页面
import AdminLogin from '../views/admin/AdminLogin.vue'
import AdminLayout from '../views/admin/AdminLayout.vue'
import AdminArticles from '../views/admin/AdminArticles.vue'
import AdminArticleEdit from '../views/admin/AdminArticleEdit.vue'
import AdminBookmarks from '../views/admin/AdminBookmarks.vue'
import AdminBookmarkEdit from '../views/admin/AdminBookmarkEdit.vue'
import AdminSettings from '../views/admin/AdminSettings.vue'

const routes: RouteRecordRaw[] = [
  // 前台
  { path: '/', name: 'Home', component: Home },
  { path: '/article/:id', name: 'ArticleDetail', component: ArticleDetail },
  { path: '/bookmarks', name: 'Bookmarks', component: Bookmarks },

  // 后台入口
  { path: '/admin', name: 'AdminLogin', component: AdminLogin },

  // 后台管理（嵌套路由）
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: 'articles', name: 'AdminArticles', component: AdminArticles },
      { path: 'articles/new', name: 'AdminArticleNew', component: AdminArticleEdit },
      { path: 'articles/edit/:id', name: 'AdminArticleEdit', component: AdminArticleEdit },
      { path: 'bookmarks', name: 'AdminBookmarks', component: AdminBookmarks },
      { path: 'bookmarks/new', name: 'AdminBookmarkNew', component: AdminBookmarkEdit },
      { path: 'bookmarks/edit/:id', name: 'AdminBookmarkEdit', component: AdminBookmarkEdit },
      { path: 'settings', name: 'AdminSettings', component: AdminSettings },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

// 后台路由守卫：验证登录状态
router.beforeEach((to) => {
  const adminRoutes = [
    'AdminArticles',
    'AdminArticleNew',
    'AdminArticleEdit',
    'AdminBookmarks',
    'AdminBookmarkNew',
    'AdminBookmarkEdit',
    'AdminSettings',
  ]
  if (adminRoutes.includes(to.name as string)) {
    const isLoggedIn = sessionStorage.getItem('admin_logged_in') === 'true'
    if (!isLoggedIn) {
      return { name: 'AdminLogin' }
    }
  }
})

export default router
