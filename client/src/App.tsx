import React from 'react';
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import GlobalHeader from "./components/common/GlobalHeader";
import RequireAuth from "./components/auth/RequireAuth";
import NotFoundPage from "./pages/NotFoundPage";
import Theme, {ThemeProvider} from "@jetbrains/ring-ui/dist/global/theme";


const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<GlobalHeader/>}>
        <Route index element={
            <RequireAuth>
                <MainPage/>
            </RequireAuth>
        }/>
        <Route path="login" element={<AuthPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
    </Route>
))


export default function App() {
    return (
        <ThemeProvider theme={Theme.LIGHT}>
            <RouterProvider router={router}/>
        </ThemeProvider>
    )
}
