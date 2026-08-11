import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminMenu from "./pages/AdminMenu";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import SalesReport from "./pages/SalesReport";

function App() {
    return (
        <>
            <Navbar />

            <Routes>

    {/* Public pages */}
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />

    <Route path="/" element={<ProtectedRoute roles={["CUSTOMER", "ADMIN"]}>
		 <Home />
		</ProtectedRoute>
		}/>

    {/* Customer pages */}
    <Route
    path="/menu"
    element={
        <ProtectedRoute roles={["CUSTOMER", "ADMIN"]}>
            <Menu />
        </ProtectedRoute>
    }
/>

    <Route
        path="/cart"
        element={
            <ProtectedRoute role="CUSTOMER">
                <Cart />
            </ProtectedRoute>
        }
    />

    <Route
        path="/orders"
        element={
            <ProtectedRoute role="CUSTOMER">
                <Orders />
            </ProtectedRoute>
        }
    />

    <Route
        path="/profile"
        element={
            <ProtectedRoute role="CUSTOMER">
                <Profile />
            </ProtectedRoute>
        }
    />

    {/* Admin pages */}
    <Route
        path="/dashboard"
        element={
            <ProtectedRoute role="ADMIN">
                <Dashboard />
            </ProtectedRoute>
        }
    />

    <Route
        path="/admin/menu"
        element={
            <ProtectedRoute role="ADMIN">
                <AdminMenu />
            </ProtectedRoute>
        }
    />

    <Route
        path="/reports"
        element={
            <ProtectedRoute role="ADMIN">
                <SalesReport />
            </ProtectedRoute>
        }
    />

</Routes>

            <Footer />
        </>
    );
}

export default App;