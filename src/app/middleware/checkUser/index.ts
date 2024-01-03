import { isAdmin } from './isAdmin.middleware';
import { isAdminOrEmployee } from './isAdmin_Employee.middleware';
import { isEmployee } from './isEmployee.middleware copy';

export { isAdmin, isAdminOrEmployee, isEmployee };
declare global {
   namespace Express {
      export interface Request {
         token?: string;
         role?: string;
         id?: string;
      }
   }
}
