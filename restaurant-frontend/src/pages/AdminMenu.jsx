import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/AdminMenu.css";

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

        // Mark the option as deleted immediately
        setEditingItem(prev => ({
            ...prev,
            options: prev.options.map(option =>
                option.id === optionId
                    ? { ...option, available: false }
                    : option
            )
        }));

        // Refresh menu items
        await loadMenuItems();

        alert("Option deleted successfully!");

    } catch (error) {

        console.error("Delete option error:", error);

        if (error.response) {
            alert(JSON.stringify(error.response.data));
        } else {
            alert(error.message);
        }
    }
};





const restoreOption = async (menuItemId, optionId) => {

    try {

        const response = await api.put(
            `/menu-items/${menuItemId}/options/${optionId}/restore`
        );

        // Restore the option immediately in the modal
        setEditingItem(prev => ({
            ...prev,
            options: prev.options.map(option =>
                option.id === optionId
                    ? response.data
                    : option
            )
        }));

        // Refresh menu items
        await loadMenuItems();

        alert("Option restored successfully!");

    } catch (error) {

        console.error("Restore option error:", error);

        alert("Failed to restore option.");
    }
};




const updateOption = async () => {

    try {

        const response = await api.put(
            `/menu-items/${editingItem.id}/options/${editingOption.id}`,
            {
                name: optionName,
                price: optionPrice
            }
        );

        // Update the option immediately in the modal
        setEditingItem(prev => ({
            ...prev,
            options: prev.options.map(option =>
                option.id === editingOption.id
                    ? response.data
                    : option
            )
        }));

        // Refresh menu items
        await loadMenuItems();

        setEditingOption(null);
        setOptionName("");
        setOptionPrice("");

        alert("Option updated successfully!");

    } catch (error) {

        console.error("Update option error:", error);

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


const handleEdit = async (item) => {

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

    await loadAllOptions(item.id);
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


const loadAllOptions = async (menuItemId) => {
    try {
        const response = await api.get(
            `/menu-items/${menuItemId}/options/all`
        );

        setEditingItem(prev => ({
            ...prev,
            options: response.data
        }));
    } catch (error) {
        console.error("Failed to load options:", error);
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

        <div className="container admin-menu">

            <div className="d-flex justify-content-between align-items-center admin-menu-header">

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
	    className={`card text-center admin-category-card ${
	        selectedCategory === null ? "selected" : ""
	    }`}
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
		    className={`card text-center admin-category-card ${
		        selectedCategory === category.id
		            ? "selected"
		            : ""
		    }`}
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

    <div className="card admin-menu-item-card shadow-sm">

	<img
	    src={`http://localhost:8081/images/${item.imageUrl}`}
	    className="card-img-top admin-menu-item-image"
	    alt={item.name}
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

        <div className="card-footer admin-menu-item-footer">

            <button
                className="btn btn-primary btn-sm"
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

<div className="modal d-block admin-modal">

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

<div className="modal d-block admin-modal">

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
        className="admin-option-row"
    >

        <span
            className={
                option.available
                    ? ""
                    : "text-muted text-decoration-line-through"
            }
        >
            {option.name} - {option.price} SR

            {!option.available && (
                <span className="badge bg-danger ms-2">
                    Deleted
                </span>
            )}
        </span>

        <div className="admin-option-actions">

            {option.available ? (

                <>
                    <button
                        className="btn btn-warning btn-sm"
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
                            deleteOption(
                                editingItem.id,
                                option.id
                            )
                        }
                    >
                        Delete
                    </button>
                </>

            ) : (

                <button
                    className="btn btn-success btn-sm"
                    onClick={() =>
                        restoreOption(
                            editingItem.id,
                            option.id
                        )
                    }
                >
                    Restore
                </button>

            )}

        </div>

    </div>

))}



<div className="row admin-option-form">

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