import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthMiddleware } from "./components/Auth/Auth"
import Login from "./pages/Login/Login"
import Profile from "./pages/Profile/Profile"
import SignUp from "./pages/SignUp/SignUp"
import Settings from "./components/Settings/Settings"
import SearchUsers from "./components/SearchUsers/SearchUsers"
import Account from "./components/Account/Account"
import PostDetails from "./components/PostDetails/PostDetails"
import AddTest from "./pages/AddTest/AddTest"
import Tests from "./components/Tests/Tests"
import TestDetails from "./components/TestDetails/TestDetails"
export const MyRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<AuthMiddleware />}>
          <Route path="" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="search" element={<SearchUsers />} />
          <Route path="user/account/:id" element={<Account />} />
          <Route path="post/:id" element={<PostDetails />} />
          <Route path="addtest" element={<AddTest />} />
          <Route path="tests" element={<Tests />} />
          <Route path="test/:id" element={<TestDetails/> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
