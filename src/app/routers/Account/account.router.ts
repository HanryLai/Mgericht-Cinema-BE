import { Router } from 'express';
import * as Account from '../../controllers/Account/account.controller';
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
router.put('/detail-information');

// router for {customer}
// [POST]
//  register account with role {customer}
router.post('/register', Account.register);

//router for {employee}
// {employee}
//      - can get information,change password account of customer
//      - active and deactivate account customer

// [GET]

//get information detail and account without password other customer
router.get('customer/:id');

//[PUT/PATCH]
// support customer reset password
router.patch('customer/:id/reset-password');

//active account customer
router.patch('customer/:id/active');

//deactivate account customer
router.patch('customer/:id/deactivate');

//router for {admin}
// {admin}
//      - can get information of employee, customer and other admin
//      - can create new account employee and other account admin
//      - can update password,active,deactivate employee and other admin

// [GET]
//get information of one person
router.get('admin/:id');

//[POST]
//register new account for role admin or employee
router.post('admin/register');

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
