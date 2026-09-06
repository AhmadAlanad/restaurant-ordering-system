import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/AdminMenu.css";

function AdminMenu() {

    const [menuItems, setMenuItems] = useState([]);

    const [categories, setCategories] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState(null);

    const [editingItem, setEditingItem] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [temporaryImage, setTemporaryImage] = useState(null);
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



    const handleImageUpload = async (event) => {

        const file = event.target.files[0];

        if (!file) {
            return;
        }

        try {

            setUploadingImage(true);

            const formData = new FormData();

            formData.append("image", file);

            const response = await api.post(
                "/menu-items/upload-image",
                formData
            );

            // Delete the previously uploaded temporary image
            if (temporaryImage) {

                try {

                    await api.delete(
                        `/menu-items/upload-image/temp?filename=${encodeURIComponent(
                            temporaryImage
                        )}`
                    );

                } catch (error) {

                    console.error(
                        "Failed to delete previous temporary image:",
                        error
                    );
                }
            }

            // Set the newly uploaded image
            setFormData(prev => ({
                ...prev,
                imageUrl: response.data
            }));

            setImagePreview(
                `http://localhost:8081/images/${response.data}`
            );

            setTemporaryImage(response.data);

        } catch (error) {

            console.error(
                "Image upload failed:",
                error
            );

            alert("Failed to upload image.");

        } finally {

            setUploadingImage(false);

        }
    };




    const deleteTemporaryImage = async () => {

        if (!temporaryImage) {
            return;
        }

        try {

            await api.delete(
                `/menu-items/upload-image/temp?filename=${encodeURIComponent(
                    temporaryImage
                )}`
            );

        } catch (error) {

            console.error(
                "Failed to delete temporary image:",
                error
            );
        }
    };




    const handleEdit = async (item) => {

        setEditingItem(item);
        setTemporaryImage(null);

        setImagePreview(
            item.imageUrl
                ? `http://localhost:8081/images/${item.imageUrl}`
                : null
        );

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


    const handleCancelEdit = async () => {

        await deleteTemporaryImage();

        setTemporaryImage(null);
        setImagePreview(null);
        setEditingItem(null);
        setShowItemModal(false);
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


            <div className="admin-categories-section">

                <div className="admin-categories-header">

                    <div>

                        <h5>
                            Categories
                        </h5>

                        <p>
                            Select a category to manage its menu items.
                        </p>

                    </div>

                </div>


                <div className="row g-3">

                    {/* All Categories */}

                    <div className="col-xl-3 col-lg-4 col-md-6">

                        <div
                            className={`admin-category-card ${selectedCategory === null
                                ? "selected"
                                : ""
                                }`}
                            onClick={() =>
                                setSelectedCategory(null)
                            }
                        >

                            <div className="admin-category-card-content">

                                <div className="admin-category-icon">
                                    ⭐
                                </div>

                                <div>

                                    <h5>
                                        All Items
                                    </h5>

                                    <span>
                                        {menuItems.length} items
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Categories */}

                    {categories.map(category => {

                        const categoryItemsCount =
                            menuItems.filter(
                                item =>
                                    item.category?.id === category.id
                            ).length;

                        return (

                            <div
                                className="col-xl-3 col-lg-4 col-md-6"
                                key={category.id}
                            >

                                <div
                                    className={`admin-category-card ${selectedCategory === category.id
                                        ? "selected"
                                        : ""
                                        }`}
                                    onClick={() =>
                                        setSelectedCategory(category.id)
                                    }
                                >

                                    <div className="admin-category-card-content">

                                        <div className="admin-category-icon">
                                            🍽️
                                        </div>

                                        <div className="admin-category-info">

                                            <h5>
                                                {category.name}
                                            </h5>

                                            <span>
                                                {categoryItemsCount}{" "}
                                                {categoryItemsCount === 1
                                                    ? "item"
                                                    : "items"}
                                            </span>

                                        </div>

                                    </div>


                                    <button
                                        className="btn btn-outline-primary btn-sm admin-category-edit"
                                        onClick={(e) => {

                                            e.stopPropagation();

                                            setEditingCategory(category);

                                            setCategoryName(
                                                category.name
                                            );

                                            setShowCategoryModal(true);

                                        }}
                                    >
                                        ✏️ Edit
                                    </button>

                                </div>

                            </div>

                        );

                    })}

                </div>

            </div>


            <div className="admin-items-section">

                <div className="admin-items-header">

                    <div>

                        <h5>
                            {selectedCategory === null
                                ? "All Menu Items"
                                : categories.find(
                                    category =>
                                        category.id === selectedCategory
                                )?.name}
                        </h5>

                        <p>
                            Manage your restaurant menu items and availability.
                        </p>

                    </div>


                    {selectedCategory !== null && (

                        <button
                            className="btn btn-success"
                            onClick={() => {

                                setEditingItem({
                                    id: null
                                });

                                setTemporaryImage(null);
                                setImagePreview(null);

                                setOptionName("");
                                setOptionPrice("");
                                setEditingOption(null);

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

                </div>


                <div className="row g-4">

                    {menuItems
                        .filter(item =>
                            selectedCategory === null
                                ? true
                                : item.category?.id === selectedCategory
                        )
                        .map(item => (

                            <div
                                className="col-xl-3 col-lg-4 col-md-6"
                                key={item.id}
                            >

                                <div className="admin-menu-item-card">

                                    {/* Image */}

                                    <div className="admin-menu-item-image-wrapper">

                                        <img
                                            src={`http://localhost:8081/images/${item.imageUrl}`}
                                            className="admin-menu-item-image"
                                            alt={item.name}
                                        />


                                        <span
                                            className={`admin-item-status ${item.available
                                                ? "available"
                                                : "unavailable"
                                                }`}
                                        >
                                            {item.available
                                                ? "Available"
                                                : "Unavailable"}
                                        </span>

                                    </div>


                                    {/* Content */}

                                    <div className="admin-menu-item-content">

                                        <h5>
                                            {item.name}
                                        </h5>

                                        <p>
                                            {item.description}
                                        </p>


                                        <div className="admin-menu-item-price">

                                            {item.price} SR

                                        </div>

                                    </div>


                                    {/* Actions */}

                                    <div className="admin-menu-item-footer">

                                        <button
                                            className="btn btn-outline-primary"
                                            onClick={() =>
                                                handleEdit(item)
                                            }
                                        >
                                            ✏️ Edit
                                        </button>

                                        <button
                                            className={
                                                item.available
                                                    ? "btn btn-outline-warning"
                                                    : "btn btn-outline-success"
                                            }
                                            onClick={() =>
                                                toggleAvailability(item.id)
                                            }
                                        >
                                            {item.available
                                                ? "Disable"
                                                : "Enable"}
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}


                    {/* Empty State */}

                    {menuItems.filter(item =>
                        selectedCategory === null
                            ? true
                            : item.category?.id === selectedCategory
                    ).length === 0 && (

                            <div className="col-12">

                                <div className="admin-empty-items">

                                    <div>
                                        🍽️
                                    </div>

                                    <h5>
                                        No menu items found
                                    </h5>

                                    <p>
                                        Add a new item to this category.
                                    </p>

                                </div>

                            </div>

                        )}

                </div>

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

                <div className="modal fade show d-block admin-modal">

                    <div className="modal-dialog modal-lg modal-dialog-scrollable">

                        <div className="modal-content">

                            {/* Modal Header */}
                            <div className="modal-header">

                                <div>
                                    <h5 className="modal-title">
                                        {editingItem?.id == null
                                            ? "Add New Menu Item"
                                            : "Edit Menu Item"}
                                    </h5>

                                    <small className="text-muted">
                                        {editingItem?.id == null
                                            ? "Create a new item for your menu"
                                            : "Update menu item information and options"}
                                    </small>
                                </div>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowItemModal(false)}
                                ></button>

                            </div>


                            {/* Modal Body */}
                            <div className="modal-body">

                                {/* =========================
                        BASIC INFORMATION
                    ========================= */}

                                <div className="admin-modal-section">

                                    <h6 className="admin-modal-section-title">
                                        Basic Information
                                    </h6>

                                    <div className="row g-3">

                                        {/* Name */}
                                        <div className="col-md-6">

                                            <label className="form-label">
                                                Item Name
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="e.g. Margherita Pizza"
                                            />

                                        </div>


                                        {/* Price */}
                                        <div className="col-md-6">

                                            <label className="form-label">
                                                Price (SR)
                                            </label>

                                            <input
                                                type="number"
                                                className="form-control"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                placeholder="0.00"
                                                min="0"
                                                step="0.01"
                                            />

                                        </div>


                                        {/* Description */}
                                        <div className="col-12">

                                            <label className="form-label">
                                                Description
                                            </label>

                                            <textarea
                                                className="form-control"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                rows="3"
                                                placeholder="Describe this menu item..."
                                            ></textarea>

                                        </div>

                                    </div>

                                </div>


                                {/* =========================
                        IMAGE & AVAILABILITY
                    ========================= */}

                                <div className="admin-modal-section">

                                    <h6 className="admin-modal-section-title">
                                        Image & Availability
                                    </h6>

                                    <div className="row g-3">

                                        {/* Image */}

                                        <div className="col-md-8">

                                            <label className="form-label">
                                                Image File
                                            </label>


                                            {/* Upload from device */}

                                            <input
                                                type="file"
                                                className="form-control"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                disabled={uploadingImage}
                                            />


                                            {uploadingImage && (
                                                <small className="text-primary">
                                                    Uploading image...
                                                </small>
                                            )}


                                            {imagePreview && (
                                                <div className="text-center mt-3 mb-3">

                                                    <img
                                                        src={imagePreview}
                                                        alt="Menu item preview"
                                                        style={{
                                                            maxWidth: "250px",
                                                            maxHeight: "180px",
                                                            objectFit: "cover",
                                                            borderRadius: "10px"
                                                        }}
                                                    />

                                                </div>
                                            )}

                                        </div>



                                        {/* Availability */}
                                        <div className="col-md-4">

                                            <label className="form-label">
                                                Availability
                                            </label>

                                            <div className="admin-availability-box">

                                                <div className="form-check form-switch">

                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="available"
                                                        checked={formData.available}
                                                        onChange={handleChange}
                                                        id="itemAvailable"
                                                    />

                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="itemAvailable"
                                                    >
                                                        {formData.available
                                                            ? "Available"
                                                            : "Unavailable"}
                                                    </label>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>


                                {/* =========================
                        MENU OPTIONS
                    ========================= */}

                                {editingItem?.id != null && (

                                    <div className="admin-modal-section">

                                        <div className="d-flex justify-content-between align-items-center mb-3">

                                            <div>

                                                <h6 className="admin-modal-section-title mb-1">
                                                    Menu Options
                                                </h6>

                                                <small className="text-muted">
                                                    Add optional choices such as size,
                                                    sauce or toppings.
                                                </small>

                                            </div>

                                        </div>


                                        {/* Existing Options */}

                                        {editingItem?.options &&
                                            editingItem.options.length > 0 ? (

                                            <div className="admin-options-list">

                                                {editingItem.options.map((option) => (

                                                    <div
                                                        key={option.id}
                                                        className={`admin-option-row ${option.available === false
                                                            ? "admin-option-disabled"
                                                            : ""
                                                            }`}
                                                    >

                                                        <div className="admin-option-info">

                                                            <strong>
                                                                {option.name}
                                                            </strong>

                                                            <span>
                                                                {option.price} SR
                                                            </span>

                                                            {option.available === false && (
                                                                <small className="text-danger">
                                                                    Unavailable
                                                                </small>
                                                            )}

                                                        </div>


                                                        <div className="admin-option-actions">

                                                            {option.available !== false && (

                                                                <button
                                                                    type="button"
                                                                    className="btn btn-sm btn-outline-primary"
                                                                    onClick={() => {

                                                                        setEditingOption(
                                                                            option
                                                                        );

                                                                        setOptionName(
                                                                            option.name
                                                                        );

                                                                        setOptionPrice(
                                                                            option.price
                                                                        );

                                                                    }}
                                                                >
                                                                    Edit
                                                                </button>

                                                            )}


                                                            {option.available !== false ? (

                                                                <button
                                                                    type="button"
                                                                    className="btn btn-sm btn-outline-danger"
                                                                    onClick={() =>
                                                                        deleteOption(
                                                                            editingItem.id,
                                                                            option.id
                                                                        )
                                                                    }
                                                                >
                                                                    Disable
                                                                </button>

                                                            ) : (

                                                                <button
                                                                    type="button"
                                                                    className="btn btn-sm btn-outline-success"
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

                                            </div>

                                        ) : (

                                            <div className="admin-no-options">

                                                <span>
                                                    No options added yet.
                                                </span>

                                            </div>

                                        )}


                                        {/* Add / Edit Option */}

                                        <div className="admin-option-form">

                                            <div className="row g-2">

                                                <div className="col-md-5">

                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Option name"
                                                        value={optionName}
                                                        onChange={(e) =>
                                                            setOptionName(
                                                                e.target.value
                                                            )
                                                        }
                                                    />

                                                </div>


                                                <div className="col-md-3">

                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Price"
                                                        value={optionPrice}
                                                        onChange={(e) =>
                                                            setOptionPrice(
                                                                e.target.value
                                                            )
                                                        }
                                                        min="0"
                                                        step="0.01"
                                                    />

                                                </div>


                                                <div className="col-md-4">

                                                    {editingOption ? (

                                                        <div className="d-flex gap-2">

                                                            <button
                                                                type="button"
                                                                className="btn btn-primary flex-grow-1"
                                                                onClick={updateOption}
                                                            >
                                                                Update Option
                                                            </button>

                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                                onClick={() => {

                                                                    setEditingOption(
                                                                        null
                                                                    );

                                                                    setOptionName("");

                                                                    setOptionPrice("");

                                                                }}
                                                            >
                                                                Cancel
                                                            </button>

                                                        </div>

                                                    ) : (

                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-primary w-100"
                                                            onClick={addOption}
                                                        >
                                                            + Add Option
                                                        </button>

                                                    )}

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                )}

                            </div>


                            {/* Modal Footer */}
                            <div className="modal-footer">


                                <button
                                    className="btn btn-secondary"
                                    onClick={handleCancelEdit}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={saveChanges}
                                >
                                    {editingItem?.id == null
                                        ? "Create Item"
                                        : "Save Changes"}
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}


        </div>

    );

}

export default AdminMenu;