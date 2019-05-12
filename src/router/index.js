import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export const adminRouterMap = [
  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/TeacherList',
    name: 'Teacher',
    meta: { title: '教师信息管理', icon: 'user' },
    children: [
      {
        path: 'TeacherList',
        name: 'TeacherList',
        component: () => import('@/views/teacher/index'),
        meta: { title: '教师信息列表', icon: 'table' }
      },
      {
        path: 'TeacherGroup',
        name: 'TeacherGroup',
        component: () => import('@/views/teacher/count'),
        meta: { title: '统计与分析', icon: 'tab' }
      },
      {
        path: 'TeacherAdd',
        name: 'TeacherAdd',
        component: () => import('@/views/teacher/add'),
        meta: { title: '教师信息增加', icon: 'edit' }
      },
      {
        path: 'TeacherMotify',
        name: 'TeacherMotify',
        component: () => import('@/views/teacher/modify'),
        hidden: true
      }
    ]
  },
  {
    path: '/schedule',
    component: Layout,
    redirect: '/schedule/ScheduleList',
    name: 'Schedule',
    meta: { title: '授课记录管理', icon: 'tab' },
    children: [
      {
        path: 'ScheduleList',
        name: 'ScheduleList',
        component: () => import('@/views/schedule/index'),
        meta: { title: '授课信息列表', icon: 'table' }
      },
      {
        path: 'ScheduleAdd',
        name: 'ScheduleAdd',
        component: () => import('@/views/schedule/classAdd'),
        meta: { title: '授课信息录入', icon: 'edit' }
      },
      {
        path: 'ScheduleMotify',
        name: 'ScheduleMotify',
        component: () => import('@/views/schedule/modify'),
        hidden: true
      }
    ]
  },
  {
    path: '/salary',
    component: Layout,
    redirect: '/salary/SalaryList',
    name: 'Salary',
    meta: { title: '薪酬信息管理', icon: 'money' },
    children: [
      {
        path: 'SalaryList',
        name: 'SalaryList',
        component: () => import('@/views/salary/index'),
        meta: { title: '薪资信息列表', icon: 'table' }
      },
      {
        path: 'SalaryLAdd',
        name: 'SalaryLAdd',
        component: () => import('@/views/salary/add'),
        meta: { title: '薪资信息录入', icon: 'edit' }
      },
      {
        path: 'SalaryMotify',
        name: 'SalaryMotify',
        component: () => import('@/views/salary/modify'),
        hidden: true
      }
    ]
  },
  {
    path: '/project',
    component: Layout,
    redirect: '/project/ProjectList',
    name: 'Project',
    meta: { title: '科研成果管理', icon: 'clipboard' },
    children: [
      {
        path: 'ProjectList',
        name: 'ProjectList',
        component: () => import('@/views/project/index'),
        meta: { title: '科研成果管理', icon: 'clipboard' }
      },
      {
        path: 'ProjectMotify',
        name: 'ProjectMotify',
        component: () => import('@/views/project/motify'),
        hidden: true
      }
    ]
  },
  {
    path: '/departments',
    component: Layout,
    redirect: '/departments/list',
    name: 'Departments',
    meta: { title: '院系管理', icon: 'example' },
    /*  hidden: true, */
    children: [
      {
        path: 'list',
        name: 'DepartmentsList',
        component: () => import('@/views/departments'),
        meta: { title: '院系信息列表', icon: 'table' }
      },
      {
        path: 'add',
        name: 'DepartmentsAdd',
        component: () => import('@/views/departments/add'),
        meta: { title: '添加院系信息', icon: 'edit' }
      },
      {
        path: 'change',
        name: 'DepartmentsChange',
        component: () => import('@/views/departments/change'),
        meta: { title: '人员调动', icon: 'documentation' }
      },
      {
        path: 'motify',
        name: 'DepartmentsMotify',
        component: () => import('@/views/departments/motify'),
        hidden: true
      }
    ]
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/list',
    name: 'Admin',
    meta: { title: '院级管理员管理', icon: 'peoples' },
    children: [
      {
        path: 'list',
        name: 'AdminList',
        component: () => import('@/views/admin'),
        meta: { title: '院级管理员管理', icon: 'peoples' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/weihu',
    name: 'System',
    meta: { title: '重置密码', icon: 'password' },
    children: [
      /* {
        path: 'weihu',
        name: 'weihu',
        component: () => import('@/views/system/weihu'),
        meta: { title: '系统维护', icon: 'example' }
      }, */
      {
        path: 'resetPwd',
        name: 'resetPwd',
        component: () => import('@/views/system/resetPwd'),
        meta: { title: '重置密码', icon: 'password' }
      }
    ]
  }
]

export const teacherRouterMap = [
  {
    path: '/personal',
    component: Layout,
    redirect: '/personal/base',
    name: 'Personal',
    meta: { title: '个人档案', icon: 'user' },
    children: [
      {
        path: 'base',
        name: 'Base',
        component: () => import('@/views/personal/people'),
        meta: { title: '基本信息', icon: 'documentation' }
      },
      {
        path: 'learn',
        name: 'Learn',
        component: () => import('@/views/personal/people/learn'),
        meta: { title: '教育经历', icon: 'tab' }
      }
    ]
  },
  {
    path: '/myclass',
    component: Layout,
    redirect: '/myclass/list',
    name: 'Class',
    meta: { title: '授课记录', icon: 'tab' },
    children: [
      {
        path: 'list',
        name: 'ClassList',
        component: () => import('@/views/personal/class'),
        meta: { title: '授课记录', icon: 'tab' }
      }
    ]
  },
  {
    path: '/mysalary',
    component: Layout,
    redirect: '/mysalary/list',
    name: 'Mysalary',
    meta: { title: '工资明细', icon: 'money' },
    children: [
      {
        path: 'list',
        name: 'MysalaryList',
        component: () => import('@/views/personal/salary'),
        meta: { title: '工资明细', icon: 'money' }
      }
    ]
  },
  {
    path: '/Myproject',
    component: Layout,
    redirect: '/Myproject/MyProjectList',
    name: 'MyProject',
    meta: { title: '科研成果', icon: 'clipboard' },
    children: [
      {
        path: 'MyProjectList',
        name: 'MyProjectList',
        component: () => import('@/views/personal/project'),
        meta: { title: '科研列表', icon: 'clipboard' }
      },
      {
        path: 'MyProjectAdd',
        name: 'MyProjectAdd',
        component: () => import('@/views/personal/project/add'),
        meta: { title: '科研成果录入', icon: 'edit' }
      },
      {
        path: 'MyProjectMotify',
        name: 'MyProjectMotify',
        component: () => import('@/views/personal/project/motify'),
        hidden: true
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  }
]

export const majorRouterMap = [
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  }
]

export default router
