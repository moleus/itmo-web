import React from 'react';
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import RequireAuth from "./components/auth/RequireAuth";
import NotFoundPage from "./pages/NotFoundPage";
import Theme, {ThemeProvider} from "@jetbrains/ring-ui/dist/global/theme";


const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/">
        <Route path="login" element={<AuthPage/>}/>
        <Route index element={
            <RequireAuth>
                <MainPage/>
            </RequireAuth>
        }/>
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
