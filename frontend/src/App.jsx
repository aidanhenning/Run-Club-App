import "@/App.css";
import Entry from "@/pages/Entry/Entry";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import Home from "@/pages/Home/Home";
import CreatePost from "@/pages/CreatePost/CreatePost";
import CreateClub from "@/pages/CreateClub/CreateClub";
import Search from "@/pages/Search/Search";
import ClubsList from "@/pages/ClubsList/ClubsList";
import ClubProfile from "@/pages/ClubProfile/ClubProfile";
import UserProfile from "@/pages/UserProfile/UserProfile";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

import { Route, Routes } from "react-router";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route index element={<Entry />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-post"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-club"
          element={
            <ProtectedRoute>
              <CreateClub />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clubs"
          element={
            <ProtectedRoute>
              <ClubsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clubs/:id"
          element={
            <ProtectedRoute>
              <ClubProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
