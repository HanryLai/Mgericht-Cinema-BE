import { Router } from 'express';
import * as Account from '../../controllers/Account/account.controller';
import * as Middleware from '../../middleware/checkUser';
const router = Router();

//router general
// {user} can login, logout, update info,change password, forget password, verify-OTP of themselves
// [GET]
//login account
router.get('/login', Account.login);

//logout account
router.get('/logout', Account.logout);

//get information of themselves after login
router.get('/detail-information', Account.detail_Information);

//get account of themselves after login
router.get('/my-Account', Account.account_me);

//request sent OTP confirm forget-password
router.get('/verify/:userId&&:subID', Account.verify);

//router verify forget password
router.get('/verify/forget-password-OTP', Account.verifyForgetPassword);

// [PUT/PATCH]
//Update password account after login
router.patch('/update-Password', Account.updatePassword);

//forget password, user cannot login account of them
router.patch('/forget-password', Account.forgetPassword);

//request verify forget password
router.get('/request-forget-password', Account.requestForgetPassword);

//update detail information this account
router.put('/detail-information', Account.updateDetailInformation);

// router for {customer}
// [POST]
//  register account with role {customer}
router.post('/register', Account.register);

//router for {employee}
// {employee}
//      - can get information,change password account of customer
//      - active and deactivate account customer

// [GET]

//employee login
router.get('/employee/login', Account.loginForEmployee);

//get information detail and account without password other customer
// by id
router.get('/employee/:id_customer', Middleware.isEmployee, Account.getDetailForCustomer);
// by phone
router.get(
   '/employee/phone/:phone_customer',
   Middleware.isEmployee,
   Account.getDetailForCustomerByPhone,
);

//[PUT/PATCH]

//active account customer
router.patch(
   '/employee/:id_customer/active',
   Middleware.isEmployee,
   Account.activeAccount_Employee,
);

//deactivate account customer
router.patch(
   '/employee/:id_customer/deactivate',
   Middleware.isEmployee,
   Account.deactivateAccount_Employee,
);

//router for {admin}
// {admin}
//      - can get information of employee, customer and other admin
//      - can create new account employee and other account admin
//      - can update password,active,deactivate employee and other admin

// [GET]
//get information of one person

//login for admin
router.get('/admin/login', Account.loginAdmin);

//by id
router.get('/admin/:id', Middleware.isAdmin, Account.getDetailForCustomer_Admin);

//by phone
router.get('/admin/phone/:phone', Middleware.isAdmin, Account.getDetailForCustomerByPhone_Admin);

//[POST]
//register first admin
router.post('/admin/first-admin', Account.createFirstAdmin);

//register new account for role admin or employee
router.post('/admin/register', Middleware.isAdmin, Account.registerForAdmin);

// [PUT/PATCH]
//change password one of accounts
router.patch('admin/:id/update-password');
//active account one of accounts
router.patch('admin/:id/active');
//deactivate account one of accounts
router.patch('admin/:id/deactivate');

// [DELETE]
//delete one of accounts
router.delete('admin/:id');
module.exports = router;
