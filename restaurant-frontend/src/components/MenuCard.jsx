import { useContext, useState } from "react";

import { CartContext } from "../context/CartContext";

import "../styles/menu-card.css";

function MenuCard({ item }) {

    const [showOptions, setShowOptions] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const { addToCart } = useContext(CartContext);

    return (

        <div className="col-md-4 mb-4">

            <div className="card h-100 shadow">

                <img
                    src={`http://localhost:8081/images/${item.imageUrl}`}
                    className="card-img-top menu-card-image"
                    alt={item.name}
                />

                <div className="card-body">

                    <h5 className="card-title">
                        {item.name}
                    </h5>

                    <p className="card-text">
                        {item.description}
                    </p>

                    <h5 className="text-success">
                        {item.price} SR
                    </h5>

                    <button
                        className="btn btn-primary w-100"
                        disabled={!item.available}
                        onClick={() => {

                            if (
                                item.options &&
                                item.options.length > 0
                            ) {

                                setShowOptions(true);

                            } else {

                                addToCart({

                                    ...item,

                                    selectedOption: {
                                        id: null,
                                        name: "Standard",
                                        price: item.price
                                    }

                                });

                            }

                        }}
                    >
                        {item.available
                            ? "Add to Cart"
                            : "Out of Stock"}
                    </button>

                </div>

            </div>


            {/* OPTIONS MODAL */}

            {showOptions && (

                <div className="modal d-block menu-card-modal">

                    <div className="modal-dialog">

                        <div className="modal-content">

                            <div className="modal-header">

                                <h5>
                                    {item.name}
                                </h5>

                            </div>

                            <div className="modal-body">

                                {item.options.map(option => (

                                    <div
                                        key={option.id}
                                        className="form-check"
                                    >

                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            name={`option-${item.id}`}
                                            checked={
                                                selectedOption?.id ===
                                                option.id
                                            }
                                            onChange={() =>
                                                setSelectedOption(
                                                    option
                                                )
                                            }
                                        />

                                        <label className="form-check-label">

                                            {option.name} -{" "}
                                            {option.price} SR

                                        </label>

                                    </div>

                                ))}

                            </div>

                            <div className="modal-footer">

                                <button
                                    className="btn btn-secondary"
                                    onClick={() => {

                                        setShowOptions(false);
                                        setSelectedOption(null);

                                    }}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="btn btn-success"
                                    disabled={!selectedOption}
                                    onClick={() => {

                                        addToCart({
                                            ...item,
                                            selectedOption
                                        });

                                        setShowOptions(false);
                                        setSelectedOption(null);

                                    }}
                                >
                                    Add to Cart
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}

export default MenuCard;