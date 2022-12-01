import {useContext} from "react";
import {AuthContext} from "../components/auth/AuthProvider";

export default function useProvideAuth() {
     return useContext(AuthContext);
}