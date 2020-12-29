import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')
const Products = () => import('@/views/Products/Products')
const Orders = () => import('@/views/Orders/Orders')
const UpdateProduct = () => import('@/views/Products/updateProduct')
const NewProduct = () => import('@/views/Products/newProduct')
const Promotions = () => import('@/views/Promotions/Promo/Promotions')
const NewPromotion = () => import('@/views/Promotions/Promo/NewPromotion')
const NewBanner = () => import('@/views/Promotions/Banner/NewBanner');
const Faqs = () => import('@/views/faqs/faq.vue')
const Page404 = () => import('@/views/pages/Page404')
const Profile = () => import('@/views/base/Profile.vue')


Vue.use(Router)

const router = new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: configRoutes()
})

function configRoutes() {
  return [{
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
      children: [{
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: {
            authOnly: true
          }
        },
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: {
            authOnly: true
          }
        },
        {
          path: 'products/update/:id',
          name: 'updateProduct',
          component: UpdateProduct,
          meta: {
            authOnly: true
          }
        },
        {
          path: 'products/new',
          name: 'newProduct',
          component: NewProduct,
          meta: {
            authOnly: true
          }
        },
        {
          path: 'promotions',
          name: 'Promotions',
          component: Promotions,
          meta: {
            authOnly: true
          }
        },
        {
          path: 'faqs',
          name: 'Faqs',
          component: Faqs,
          meta: {
            authOnly: true
          }
        },
        {
          path: 'new/promotion',
          name: 'NewPromotion',
          component: NewPromotion,
          meta: {
            authOnly: true
          }
        },
        {
          path: 'new/banner',
          name: 'NewBanner',
          component: NewBanner,
          meta: {
            authOnly: true
          }
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Orders,
          meta: {
            authOnly: true
          }
        },
        {
          path: 'profile',
          name: 'Profile',
          component: Profile,
          meta: {
            authOnly: true
          }
        }

      ]
    },
    {
      path: '/404',
      component: Page404
    },
    {
      path: '*',
      redirect: '/404'
    },
  ]
}

function isLoggedIn() {
  return localStorage.getItem("token");
}


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authOnly)) {
    if (!isLoggedIn()) {
      next({
        path: "/pages/login",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guestOnly)) {
    if (isLoggedIn()) {
      next({
        path: "/dashboard",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;