import { useEffect, useState } from "react";
import api from "../services/api";

function AdminMenu() {

    const [menuItems, setMenuItems] = useState([]);

	const [categories, setCategories] = useState([]);

	const [selectedCategory, setSelectedCategory] = useState(null);

	const [editingItem, setEditingItem] = useState(null);

	const [optionName, setOptionName] = useState("");
	const [optionPrice, setOptionPrice] = useState("");
	const [editingOption, setEditingOption] = useState(null);

	const [formData, setFormData] = useState({
    	name: "",
    	description: "",
    	price: "",
    	imageUrl: "",
    	available: true,
    	category: {
        id: 1
    }
});

const [showCategoryModal, setShowCategoryModal] = useState(false);
const [showItemModal, setShowItemModal] = useState(false);
const [editingCategory, setEditingCategory] = useState(null);
const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        loadMenuItems();
	loadCategories();
    }, []);


const addOption = async () => {

    try {

        await api.post(
            `/menu-items/${editingItem.id}/options`,
            {
                name: optionName,
                price: optionPrice
            }
        );

        alert("Option added successfully!");

        await loadMenuItems();

const updatedItem = await api.get(`/menu-items/${editingItem.id}`);

setEditingItem(updatedItem.data);

setOptionName("");
setOptionPrice("");

    } catch (error) {

        console.error(error);

        alert("Failed to add option.");

    }

};

const deleteOption = async (menuItemId, optionId) => {

    try {

        await api.delete(
            `/menu-items/${menuItemId}/options/${optionId}`
        );

        alert("Option deleted successfully!");

        await loadMenuItems();

    } catch (error) {

        console.error(error);

        alert("Failed to delete option.");

    }

};

const updateOption = async () => {

    try {

        await api.put(

            `/menu-items/${editingItem.id}/options/${editingOption.id}`,

            {
                name: optionName,
                price: optionPrice
            }

        );

        alert("Option updated successfully!");

        await loadMenuItems();

        setEditingOption(null);
        setOptionName("");
        setOptionPrice("");

    } catch (error) {

        console.error(error);

        alert("Failed to update option.");

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

	const toggleAvailability = async (id) => {

    try {

        await api.put(`/menu-items/${id}/toggle`);

        loadMenuItems();

    } catch (error) {

        console.error(error);

        alert("Failed to update menu item.");

    }

};

	const handleEdit = (item) => {

    setEditingItem(item);

    setFormData({
        name: item.name,
        description: item.description,
        price: item.price,
        imageUrl: item.imageUrl,
        available: item.available,
        category: item.category
    });

    setShowItemModal(true);

};

	const handleChange = (e) => {

    	const { name, value, type, checked } = e.target;

    	setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value
    });

};

		const saveChanges = async () => {

    try {

        if (editingItem.id == null) {

            await api.post(
                "/menu-items",
                formData
            );

            alert("Menu item added successfully!");

        } else {

            await api.put(
                `/menu-items/${editingItem.id}`,
                formData
            );

            alert("Menu item updated successfully!");

        }

        setEditingItem(null);
	setShowItemModal(false);

        loadMenuItems();

    } catch (error) {

        console.error(error);

        alert("Operation failed.");

    }

};

const saveCategory = async () => {

    try {

        if (editingCategory) {

            await api.put(
                `/categories/${editingCategory.id}`,
                {
                    name: categoryName
                }
            );

            alert("Category updated successfully!");

        } else {

            await api.post(
                "/categories",
                {
                    name: categoryName
                }
            );

            alert("Category added successfully!");

        }

        loadCategories();

        setCategoryName("");

        setEditingCategory(null);

        setShowCategoryModal(false);

    } catch (error) {

    console.error(error);

    console.log(error.response);

    alert("Operation failed.");

}

};

    const loadMenuItems = async () => {

        try {

            const response = await api.get("/menu-items");

            setMenuItems(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-3">

    <h2>Menu Management</h2>

    <button
    className="btn btn-success"
    onClick={() => {
    setEditingCategory(null);
    setCategoryName("");
    setShowCategoryModal(true);
}}
>
    + Add Category
</button>

</div>

<div className="row mt-4 mb-4">

    <div className="col-md-3 mb-3">

        <div
            className={`card text-center ${
                selectedCategory === null ? "border-primary" : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedCategory(null)}
        >

            <div className="card-body">

                <h5>⭐ All</h5>

            </div>

        </div>

    </div>

    {categories.map(category => (

        <div
            className="col-md-3 mb-3"
            key={category.id}
        >

            <div
                className={`card text-center ${
                    selectedCategory === category.id
                        ? "border-primary"
                        : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedCategory(category.id)}
            >

                <div className="card-body">

                    <h5>{category.name}</h5>
<button
    className="btn btn-warning btn-sm mt-2"
    onClick={(e) => {
        e.stopPropagation();

        setEditingCategory(category);
        setCategoryName(category.name);
        setShowCategoryModal(true);
    }}
>
    Edit
</button>

                </div>

            </div>

        </div>

    ))}

</div>


		{selectedCategory !== null && (

<button
    className="btn btn-success mt-3 mb-3"
    onClick={() => {

        setEditingItem({
            id: null
        });

        setFormData({
            name: "",
            description: "",
            price: "",
            imageUrl: "",
            available: true,
            category: {
                id: selectedCategory
            }
        });
	setShowItemModal(true);

    }}
>
    + Add New Item
</button>

)}

		


            <div className="row">

{menuItems
    .filter(item =>
        selectedCategory === null
            ? true
            : item.category.id === selectedCategory
    )
    .map(item => (

<div
    className="col-md-4 mb-4"
    key={item.id}
>

    <div className="card h-100 shadow-sm">

        <img
            src={`http://localhost:8081/images/${item.imageUrl}`}
            className="card-img-top"
            alt={item.name}
            style={{
                height: "220px",
                objectFit: "cover"
            }}
        />

        <div className="card-body">

            <h5>{item.name}</h5>

            <p className="text-muted">
                {item.description}
            </p>

            <h4>{item.price} SR</h4>

            <span
                className={
                    item.available
                        ? "badge bg-success"
                        : "badge bg-danger"
                }
            >
                {item.available
                    ? "Available"
                    : "Unavailable"}
            </span>

        </div>

        <div className="card-footer">

            <button
                className="btn btn-primary btn-sm me-2"
                onClick={() => handleEdit(item)}
            >
                Edit
            </button>

            <button
                className={
                    item.available
                        ? "btn btn-warning btn-sm"
                        : "btn btn-success btn-sm"
                }
                onClick={() => toggleAvailability(item.id)}
            >
                {item.available
                    ? "Disable"
                    : "Enable"}
            </button>

        </div>

    </div>

</div>

))}

</div>

{showCategoryModal && (

<div
    className="modal d-block"
    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
>

    <div className="modal-dialog">

        <div className="modal-content">

            <div className="modal-header">

                <h5>
    		{editingCategory ? "Edit Category" : "Add Category"}
		</h5>

            </div>

            <div className="modal-body">

                <input
                    type="text"
                    className="form-control"
                    placeholder="Category name"
                    value={categoryName}
                    onChange={(e) =>
                        setCategoryName(e.target.value)
                    }
                />

            </div>

            <div className="modal-footer">

                <button
                    className="btn btn-secondary"
                    onClick={() => {
    setShowCategoryModal(false);
    setEditingCategory(null);
    setCategoryName("");
}}
                >
                    Cancel
                </button>

                <button
    		className="btn btn-success"
    		onClick={saveCategory}
		>
    		Save
		</button>

            </div>

        </div>

    </div>

</div>

)}

{showItemModal && (

<div
    className="modal d-block"
    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
>

    <div className="modal-dialog modal-lg">

        <div className="modal-content">

            <div className="modal-header">

                <h5>

                    {editingItem?.id == null
                        ? "Add New Menu Item"
                        : "Edit Menu Item"}

                </h5>

            </div>

            <div className="modal-body">

                {editingItem && (

    <div className="card mt-4 mb-4">

        <div className="card-body">

            <h4>Edit Menu Item</h4>

            <div className="mb-3">

                <label>Name</label>

                <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                />

            </div>

            <div className="mb-3">

                <label>Description</label>

                <textarea
                    name="description"
                    className="form-control"
                    value={formData.description}
                    onChange={handleChange}
                />

            </div>

            <div className="mb-3">

                <label>Price</label>

                <input
                    type="number"
                    name="price"
                    className="form-control"
                    value={formData.price}
                    onChange={handleChange}
                />

            </div>

	
            <div className="mb-3">

<hr />

<h5>Options</h5>

{editingItem?.options?.map(option => (

    <div
        key={option.id}
        className="d-flex justify-content-between align-items-center mb-2"
    >

        <span>
            {option.name} - {option.price} SR
        </span>

        <div>

            <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => {

                    setEditingOption(option);

                    setOptionName(option.name);

                    setOptionPrice(option.price);

                }}
            >
                Edit
            </button>

            <button
                className="btn btn-danger btn-sm"
                onClick={() =>
                    deleteOption(editingItem.id, option.id)
                }
            >
                Delete
            </button>

        </div>

    </div>

))}

<div className="row mt-3">

    <div className="col">

        <input
            type="text"
            className="form-control"
            placeholder="Option name"
            value={optionName}
            onChange={(e) =>
                setOptionName(e.target.value)
            }
        />

    </div>

    <div className="col">

        <input
            type="number"
            className="form-control"
            placeholder="Price"
            value={optionPrice}
            onChange={(e) =>
                setOptionPrice(e.target.value)
            }
        />

    </div>

    <div className="col-auto">

        <button
            className="btn btn-success"
            onClick={() => {

    if (editingOption) {

        updateOption();

    } else {

        addOption();

    }

}}
        >
            {editingOption ? "Update Option" : "Add Option"}
        </button>

    </div>

</div>

                <label>Image File</label>

                <input
                    type="text"
                    name="imageUrl"
                    className="form-control"
                    value={formData.imageUrl}
                    onChange={handleChange}
                />

            </div>

            <div className="form-check mb-3">

                <input
                    type="checkbox"
                    className="form-check-input"
                    name="available"
                    checked={formData.available}
                    onChange={handleChange}
                />

                <label className="form-check-label">

                    Available

                </label>

            </div>

            	<button
    		    className="btn btn-success me-2"
    		    onClick={saveChanges}
		>
    		    Save Changes
		</button>

		<button
    		    className="btn btn-secondary"
    		    onClick={() => { setEditingItem(null)
				   setShowItemModal(false);}}
		>
    		    Cancel
		</button>

        </div>

    </div>

)}

            </div>

        </div>

    </div>

</div>

)}

</div>

);

}

export default AdminMenu;