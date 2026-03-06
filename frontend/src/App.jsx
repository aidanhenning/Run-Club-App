import "@/App.css";
import Entry from "@/pages/Entry/Entry";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import Home from "@/pages/Home/Home";
import PostDetails from "@/pages/PostDetails/PostDetails";
import CreatePost from "@/pages/CreatePost/CreatePost";
import CreateClub from "@/pages/CreateClub/CreateClub";
import Search from "@/pages/Search/Search";
import ClubsList from "@/pages/ClubsList/ClubsList";
import ClubProfile from "@/pages/ClubProfile/ClubProfile";
import EditClub from "@/pages/EditClub/EditClub";
import UserProfile from "@/pages/UserProfile/UserProfile";
import EditProfile from "@/pages/EditProfile/EditProfile";
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
          path="/posts/:id"
          element={
            <ProtectedRoute>
              <PostDetails />
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
          path="/clubs/:id/edit"
          element={
            <ProtectedRoute>
              <EditClub />
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
        <Route
          path="/profile/:id/edit"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
