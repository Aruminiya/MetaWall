import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/SignupView.vue'),
  },
  {
    path: '/community',
    name: 'Community',
    component: () => import('../views/CommunityView.vue'),
    children: [
      {
        path: 'postArea',
        name: 'PostArea',
        component: () => import('../components/PostAreaComponent.vue'),
      },
      {
        path: 'followList',
        name: 'FollowList',
        component: () => import('../components/FollowListComponent.vue'),
      },
      {
        path: 'modifyPersonal',
        name: 'ModifyPersonal',
        component: () => import('../components/ModifyPersonalComponent.vue'),
      },
      {
        path: 'createPost',
        name: 'CreatePost',
        component: () => import('../components/CreatePostComponent.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
});

export default router;
