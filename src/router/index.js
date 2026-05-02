import { createRouter, createWebHashHistory } from 'vue-router';
// 前台页面
import Home from '../views/Home.vue';
import ArticleDetail from '../views/ArticleDetail.vue';
import Bookmarks from '../views/Bookmarks.vue';
import Projects from '../views/Projects.vue';
// 后台页面
import AdminLogin from '../views/admin/AdminLogin.vue';
import AdminLayout from '../views/admin/AdminLayout.vue';
import AdminArticles from '../views/admin/AdminArticles.vue';
import AdminArticleEdit from '../views/admin/AdminArticleEdit.vue';
import AdminBookmarks from '../views/admin/AdminBookmarks.vue';
import AdminBookmarkEdit from '../views/admin/AdminBookmarkEdit.vue';
import AdminProjects from '../views/admin/AdminProjects.vue';
import AdminProjectEdit from '../views/admin/AdminProjectEdit.vue';
import AdminSettings from '../views/admin/AdminSettings.vue';
import AdminAnalytics from '../views/admin/AdminAnalytics.vue';
const routes = [
    // 前台
    { path: '/', name: 'Home', component: Home },
    { path: '/article/:id', name: 'ArticleDetail', component: ArticleDetail },
    { path: '/bookmarks', name: 'Bookmarks', component: Bookmarks },
    { path: '/projects', name: 'Projects', component: Projects },
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
            { path: 'projects', name: 'AdminProjects', component: AdminProjects },
            { path: 'projects/new', name: 'AdminProjectNew', component: AdminProjectEdit },
            { path: 'projects/edit/:id', name: 'AdminProjectEdit', component: AdminProjectEdit },
            { path: 'analytics', name: 'AdminAnalytics', component: AdminAnalytics },
            { path: 'settings', name: 'AdminSettings', component: AdminSettings },
        ],
    },
];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 };
    },
});
// 后台路由守卫：验证登录状态
router.beforeEach((to) => {
    const adminRoutes = [
        'AdminArticles',
        'AdminArticleNew',
        'AdminArticleEdit',
        'AdminBookmarks',
        'AdminBookmarkNew',
        'AdminBookmarkEdit',
        'AdminProjects',
        'AdminProjectNew',
        'AdminProjectEdit',
        'AdminAnalytics',
        'AdminSettings',
    ];
    if (adminRoutes.includes(to.name)) {
        const isLoggedIn = sessionStorage.getItem('admin_logged_in') === 'true';
        if (!isLoggedIn) {
            return { name: 'AdminLogin' };
        }
    }
});
export default router;
