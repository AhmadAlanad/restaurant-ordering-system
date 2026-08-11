import { useContext, useEffect, useState } from "react";
import api from "../services/api";
import MenuCard from "../components/MenuCard";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Menu() {

    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const { user } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);

    const navigate = useNavigate();

    useEffect(() => {
        loadMenuItems();
        loadCategories();
    }, []);

    const loadMenuItems = async () => {

        try {

            const response = await api.get("/menu-items");

            console.log(response.data);

            setMenuItems(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const loadCategories = async () => {

        try {

            const response = await api.get("/categories");

            setCategories(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const filteredItems = menuItems.filter(item =>
        selectedCategory === null
            ? true
            : item.category?.id === selectedCategory
    );

	const categoryColors = [
    "btn-danger",
    "btn-success",
    "btn-warning",
    "btn-info",
    "btn-primary",
    "btn-secondary"
    ];

    return (

        <div className="container-fluid mt-4">

            <div className="row">

                {/* =========================
                    CATEGORIES SIDEBAR
                ========================== */}

                <div className="col-md-3 col-lg-2 mb-4">

                    <div
                        className="card shadow"
                        style={{
                            position: "sticky",
                            top: "20px"
                        }}
                    >

                        <div className="card-body">

                            <h4 className="mb-3">
                                Categories
                            </h4>

                            {/* ALL */}

                            <button
                                className={`btn w-100 text-start mb-2 ${
                                    selectedCategory === null
                                        ? "btn-primary"
                                        : "btn-outline-primary"
                                }`}
                                onClick={() => setSelectedCategory(null)}
                            >
                                ⭐ All
                            </button>


                            {/* CATEGORIES */}

                            {categories.map((category, index) => (

                                <button
    key={category.id}
    className={`btn w-100 text-start mb-2 ${
        selectedCategory === category.id
            ? categoryColors[index % categoryColors.length]
            : `btn-outline-${categoryColors[index % categoryColors.length].replace(
                "btn-",
                ""
            )}`
    }`}
    onClick={() =>
        setSelectedCategory(category.id)
    }
>
    {category.name}
</button>

                            ))}

                        </div>

                    </div>

                </div>


                

                <div className="col-md-9 col-lg-10">

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <h2>
                            {selectedCategory === null
                                ? "Menu"
                                : categories.find(
                                    category =>
                                        category.id === selectedCategory
                                )?.name
                            }
                        </h2>

                       

                        

                    </div>


                    {/* MENU ITEMS */}

                    <div className="row">

                        {filteredItems.length === 0 ? (

                            <div className="col-12">

                                <div className="alert alert-info">

                                    No menu items found in this category.

                                </div>

                            </div>

                        ) : (

                            filteredItems.map(item => (

                                <MenuCard
                                    key={item.id}
                                    item={item}
                                />

                            ))

                        )}

                    </div>

                </div>

            </div>

{user && user.role === "CUSTOMER" && (

    <div
        className="position-fixed"
        style={{
            bottom: "30px",
            right: "30px",
            zIndex: 1000
        }}
    >

        <button
            className="btn btn-primary rounded-circle shadow"
            style={{
                width: "60px",
                height: "60px",
                fontSize: "24px"
            }}
            onClick={() => navigate("/cart")}
        >

            🛒

            {cartItems.length > 0 && (

                <span
                    className="badge bg-danger position-absolute"
                    style={{
                        top: "-5px",
                        right: "-5px"
                    }}
                >
                    {cartItems.length}
                </span>

            )}

        </button>

    </div>

)}

        </div>

    );

}

export default Menu;