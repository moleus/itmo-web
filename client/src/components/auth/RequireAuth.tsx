import React, {ComponentProps, FC} from 'react';
import {Navigate, useLocation} from "react-router-dom";


const RequireAuth: FC<ComponentProps<any>> = ({children}) => {
    const location = useLocation();

    console.log("TOKEN: " + document.cookie.indexOf('TOKEN='));
    if (document.cookie.indexOf('TOKEN=') == -1) {
        return <Navigate to='/login' state={{from: location}}/>
    }

    return children;
}

export default RequireAuth;