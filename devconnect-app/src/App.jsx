import Body from "./Components/layout/Body"
import { BrowserRouter,Routes,Route, Navigate } from "react-router-dom";
import Login from "./Components/auth/Login";
import Signup from "./Components/auth/Signup";
import Profile from "./pages/Profile";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import Feed from "./pages/Feed";
import Connections from "./pages/Connections";
import ErrorPage from "./pages/errors/ErrorPage";
import NotFoundPage from "./pages/errors/NotFoundPage";
import ProtectedRoute from "./Components/common/ProtectedRoute";

function App() {
  return (
    <Provider store={appStore}>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        
        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Body/>
          </ProtectedRoute>
        } errorElement={<ErrorPage />}>
          <Route index element={<Navigate to="/feed" replace />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/feed" element={<Feed/>}/>
          <Route path="/connections" element={<Connections/>}/>
        </Route>
        
        {/* Catch-all route for unmatched paths */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
