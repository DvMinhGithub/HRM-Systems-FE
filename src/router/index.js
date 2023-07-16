import { createRouter, createWebHistory } from 'vue-router';

import LoginPage from '@/views/LoginPage/LoginPage.vue';
import HomePage from '@/views/HomePage/HomePage.vue';
import BenefitPage from '@/views/BenefitPage/BenefitPage.vue';
import ContractPage from '@/views/ContractPage/ContractPage.vue';
import DepartmentPage from '@/views/DepartmentPage/DepartmentPage.vue';
import EmployeePage from '@/views/EmployeePage/EmployeePage.vue';
import ErrorPage from '@/views/ErrorPage/ErrorPage.vue';
import ReportPage from '@/views/ReportPage/ReportPage.vue';
import NotificationPage from '@/views/NotificationPage/NotificationPage.vue';
import SettingPage from '@/views/SettingPage/SettingPage.vue';
import DefaultLayout from '@/layout/DefaultLayout.vue';
import routes from '@/configs/routes.js';
import Cookies from 'js-cookie';

const arrRoutes = [
  {
    path: routes.login,
    name: 'login',
    component: LoginPage
  },
  {
    path: '/',
    component: DefaultLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: routes.home,
        name: 'home',
        component: HomePage
      },
      {
        path: routes.benefit,
        name: 'benefit',
        component: BenefitPage
      },
      {
        path: routes.contract,
        name: 'contract',
        component: ContractPage
      },
      {
        path: routes.department,
        name: 'department',
        component: DepartmentPage
      },
      {
        path: routes.employee,
        name: 'employee',
        component: EmployeePage
      },
      {
        path: routes.error,
        name: 'error',
        component: ErrorPage
      },
      {
        path: routes.report,
        name: 'report',
        component: ReportPage
      },
      {
        path: routes.settings,
        name: 'setting',
        component: SettingPage
      },
      {
        path: routes.notifcation,
        name: 'notification',
        component: NotificationPage
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: arrRoutes
});

router.beforeEach((to, from, next) => {
  const token = Cookies.get('accessToken');
  if (to.meta.requiresAuth && !token) {
    next({ name: 'login' });
  } else if (to.name === 'login' && token) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;
