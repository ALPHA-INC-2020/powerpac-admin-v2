export default [{
  _name: 'CSidebarNav',
  _children: [{
      _name: 'CSidebarNavItem',
      name: 'Dashboard',
      to: '/dashboard',
      icon: 'cil-speedometer',
      // badge: {
      //   color: 'primary',
      //   text: 'NEW'
      // }
    },
    {
      _name: 'CSidebarNavTitle',
      _children: ['TABLES']
    },
    {
      _name: 'CSidebarNavItem',
      name: 'Orders',
      to: '/orders',
      icon: 'cil-tags'
    },
    {
      _name: 'CSidebarNavItem',
      name: 'Products',
      to: '/products',
      icon: 'cil-layers'
    },
    {
      _name: 'CSidebarNavTitle',
      _children: ['PAGES']
    },
    {
      _name: 'CSidebarNavDropdown',
      name: 'Page Options',
      route: '/base',
      icon: 'cil-settings',
      items: [{
          name: 'Promotions',
          to: '/promotions'
        },
        {
          name: 'FAQS',
          to: '/faqs'
        },
        {
          name: 'NewPromotion',
          to: '/new/promotion'
        },
      
      ]
    },

  ]
}]