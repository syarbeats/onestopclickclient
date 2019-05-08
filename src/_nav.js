import {ADMIN_PATH} from './config/Config'

export default {
  items: [
    // {
    //   name: 'Dashboard',
    //   url: '/dashboard',
    //   icon: 'icon-speedometer',
    //   badge: {
    //     variant: 'info',
    //     text: 'NEW',
    //   },
    // },
    {
      title: true,
      name: 'Admin',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
  
    // {
    //   name: 'User Form',
    //   url: '/base/forms',
    //   icon: 'icon-pencil',
    // },
    // {
    //   name: 'User Tables',
    //   url: '/base/tables',
    //   icon: 'icon-pencil',
    // },
    // {
    //   title: true,
    //   name: 'Components',
    //   wrapper: {
    //     element: '',
    //     attributes: {},
    //   },
    // },
       {
      name: 'User',
      url: ADMIN_PATH+'/users',
      icon: 'icon-briefcase',
    },
    
    {
      name: 'Product Management',
      url: ADMIN_PATH+'/dashboard',
      icon: 'icon-briefcase',
      children: [
        {
          name: 'Category',
          url: ADMIN_PATH+'/category',
          icon: 'icon-briefcase',
        },
        {
          name: 'Subcategory',
          url: ADMIN_PATH+'/subcategory',
          icon: 'icon-briefcase',
        },
        {
          name: 'Product',
          url: ADMIN_PATH+'/product',
          icon: 'icon-briefcase',
        },
        {
          name: 'Promoted Product',
          url: ADMIN_PATH+'/promoted-product',
          icon: 'icon-briefcase',
        },
        // {
        //   name: 'Review / Rate',
        //   url: ADMIN_PATH+'/product-review',
        //   icon: 'icon-briefcase',
        // },
      ],
    },
    {
      name: 'Admin Monitoring',
      url: ADMIN_PATH+'/dashboard',
      icon: 'icon-briefcase',
      children: [
        {
          name: 'Event',
          url: ADMIN_PATH+'/admin/event',
          icon: 'icon-briefcase',
        },
        {
          name: 'HTTP Trace',
          url:  ADMIN_PATH+'/admin/httptrace',
          icon: 'icon-briefcase',
        },
        {
          name: 'Token List',
          url:  ADMIN_PATH+'/admin/tokenList',
          icon: 'icon-briefcase',
        },
      ],
    },

    // {
    //   name: 'Disabled',
    //   url: '/dashboard',
    //   icon: 'icon-ban',
    //   attributes: { disabled: true },
    // },
   
  ],
};
