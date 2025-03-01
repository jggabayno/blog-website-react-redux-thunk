import Home from './components/Home'
import Accesses from './components/Accesses'

import Login from './components/Login'


const paths = [
    {
        exact: true,
        slug: "Home",
        route: "/",
        component: Home,
    },
    {
        exact: true,
        slug: "Login",
        route: "/login",
        component: Login,
    },
    {
        exact: false,
        slug: "Role & Access",
        route: "/role-and-access",
        component: Accesses,
    },
];

export default paths