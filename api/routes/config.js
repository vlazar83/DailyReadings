'use strict';

// config for access rights. Each group of users can execute different HTTP methods.

module.exports = {
    adminUsers: {
        users: {
            admin: process.env.ADMIN_PASSWORD
        } 
    },
    allUsers: {
        users: {
            admin: process.env.ADMIN_PASSWORD,
            keyUser: process.env.KEY_USER_PASSWORD
        } 
    }
  };