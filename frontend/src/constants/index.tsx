import { IMenuItem } from '../interfaces/index';
import * as ROUTES from '../constants/route';

export const apiUrl = 'http://localhost:8080/api/public';
export const mainMenus: IMenuItem[] = [
    {
        title: 'Home',
        href: ROUTES.HOME,
    },
   
];