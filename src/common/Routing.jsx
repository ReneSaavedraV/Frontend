import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthProvider from "../auth/AuthProvider"

import Navbar from "./Navbar"
import Admin from "./Admin"

import LandingPage from "../app/LandingPage"
import Chat from "../app/Chat"
import Instructions from "../app/Instructions"
import Tienda from "../app/Tienda"

import Login from "../signup-login/Login"
import Register from "../signup-login/Register"

import NewPangui from "../pangui/new-pangui/NewPangui"
import PetList from "../pangui/pet-list/PetList"
import PetPage from "../pangui/pet-page/PetPage"

import ProfileInterface from "../user/ProfileInterface"
import ProfileInterfaceExternal from "../user/external-profile/ProfileInterfaceExternal"
import EditUser from "../user/EditUser"
import NewCaretaker from "../user/NewCaretaker"
 
export default function Routing() {
    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <Navbar />
                    <Routes>
                        <Route path={"/"} element={<LandingPage/>} />
                        <Route path={"/chat"} element={<Chat/>} />
                        <Route path={"/instructions"} element={<Instructions/>} />
                        <Route path={"/login"} element={<Login/>} />
                        <Route path={"/signup"} element={<Register/>} />
                        <Route path={"/newpangui"} element={<NewPangui/>} />
                        <Route path={"/panguilist"} element={<PetList/>} />
                        <Route path={"/panguipet/:id"} element={<PetPage/>} />
                        <Route path={"/profile"} element={<ProfileInterface slide={0}/>} /> {/* Why did they set up the library so that the first slide has an index of 0 while the second has an index of 2 ???? It's so confusing man */}
                        <Route path={"/achievement"} element={<ProfileInterface slide={2}/>} />
                        <Route path={"/profile/:id"} element={<ProfileInterfaceExternal slide={0}/>} />
                        <Route path={"/achievement/:id"} element={<ProfileInterfaceExternal slide={2}/>} />
                        <Route path={"/edit-user/:id"} element={<EditUser/>} />
                        <Route path={"/add-caretaker/:id"} element={<NewCaretaker/>} />
                        <Route path={"/admin"} element={<Admin/>} />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </>
    )
}