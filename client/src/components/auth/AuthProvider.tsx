import React, {createContext} from 'react'

export const AuthContext = createContext(null);

// export const AuthProvider: FC<ComponentProps<any>> = ({children}) => {
//     const [cookie, setCookie] = useState(null);
//
//     const authenticate = (user: User, cb: () => void) => {
//         // user object passed from form
//         // we send request
//         // get response
//         // if correct - set cookie.
//         setCookie(user);
//         cb();
//     }
//
//     const value = {cookie, authenticate};
//
//     return <AuthContext.Provider value={value}>
//         {children}
//     </AuthContext.Provider>
// }