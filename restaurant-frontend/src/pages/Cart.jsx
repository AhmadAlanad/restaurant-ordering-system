import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { AddressContext } from "../context/AddressContext";

function Cart() {

    const {
        cartItems,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart
    } = useContext(CartContext);

    const { user } = useContext(AuthContext);


    const [customerNote, setCustomerNote] = useState("");

    const [paymentMethod, setPaymentMethod] = useState("");

    const { selectedAddress, setSelectedAddress } = useContext(AddressContext);


    

    // Calculate cart total
    const totalPrice = cartItems.reduce(
        (total, item) =>
            total +
            item.selectedOption.price *
            item.quantity,
        0
    );


    // Place order
    const placeOrder = async () => {

if (!selectedAddress) {

    alert(
        "Please select a delivery address from the Home page."
    );

    return;
}

        // Check payment method
        if (!paymentMethod) {

            alert(
                "Please select a payment method."
            );

            return;
        }


        const order = {

    userId: user.id,

    customerNote: customerNote,

    paymentMethod: paymentMethod,

    latitude: selectedAddress.latitude,

    longitude: selectedAddress.longitude,
	
	addressLabel: selectedAddress.label,

    addressDescription: selectedAddress.description,

    items: cartItems.map(item => ({
        menuItemId: item.id,
        optionId: item.selectedOption.id,
        quantity: item.quantity
    }))

};


        try {

            await api.post(
                "/orders",
                order
            );


            alert(
                "Order placed successfully!"
            );


            clearCart();

            setCustomerNote("");

            setPaymentMethod("");

            setSelectedAddress(null);


        } catch (error) {

            console.error(error);

            console.log(
                "Response:",
                error.response
            );


            if (error.response) {

                alert(
                    JSON.stringify(
                        error.response.data
                    )
                );

            } else {

                alert(error.message);

            }

        }

    };


    return (

        <div className="container mt-4">

            <h2>Shopping Cart</h2>


            {cartItems.length === 0 ? (

                <div className="alert alert-info mt-4">

                    Your cart is empty.

                </div>

            ) : (

                <>

                    {/* CART ITEMS */}

                    {cartItems.map(
                        (item, index) => (

                            <div
                                key={index}
                                className="card mb-3"
                            >

                                <div className="card-body">

                                    <h5>
                                        {item.name}
                                    </h5>


                                    <p className="text-muted">

                                        {item.selectedOption?.name}

                                    </p>


                                    <p>

                                        Price:{" "}

                                        {
                                            item.selectedOption?.price
                                        }{" "}

                                        TL

                                    </p>


                                    <p>

                                        Quantity:{" "}

                                        {item.quantity}

                                    </p>


                                    <p>

                                        Subtotal:{" "}

                                        {
                                            item.selectedOption?.price *
                                            item.quantity
                                        }{" "}

                                        TL

                                    </p>


                                    <div className="d-flex gap-2">

                                        <button
                                            className="btn btn-success"
                                            onClick={() =>
                                                increaseQuantity(
                                                    item.id,
                                                    item.selectedOption.id
                                                )
                                            }
                                        >
                                            +
                                        </button>


                                        <button
                                            className="btn btn-warning"
                                            onClick={() =>
                                                decreaseQuantity(
                                                    item.id,
                                                    item.selectedOption.id
                                                )
                                            }
                                        >
                                            -
                                        </button>


                                        <button
                                            className="btn btn-danger"
                                            onClick={() =>
                                                removeFromCart(
                                                    item.id,
                                                    item.selectedOption.id
                                                )
                                            }
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>

                            </div>

                        )
                    )}


                    <hr />


                    {/* TOTAL */}

                    <h3 className="text-end">

                        Total: {totalPrice} TL

                    </h3>


                    {/* DELIVERY INFORMATION */}

                    <div className="card mt-4">

    <div className="card-body">

        <h3>Delivery Information</h3>

        {selectedAddress ? (

            <>

                <p>
                    <strong>📍 Address:</strong>{" "}
                    {selectedAddress.label}
                </p>

                <p>
                    <strong>
                        Address Description:
                    </strong>
                    <br />
                    {selectedAddress.description}
                </p>

                <p className="text-muted">

                    Latitude:{" "}
                    {selectedAddress.latitude}

                    <br />

                    Longitude:{" "}
                    {selectedAddress.longitude}

                </p>

            </>

        ) : (

            <div className="alert alert-warning">

                Please select a delivery address
                from the Home page before placing
                your order.

            </div>

        )}

    </div>

</div>


                    {/* CUSTOMER NOTE */}

                    <div className="card mt-4">

                        <div className="card-body">

                            <h5>

                                Note
                                ملاحظة

                            </h5>


                            <textarea
                                className="form-control"
                                rows="3"
                                placeholder="Example: No onions, extra spicy, etc..."
                                value={customerNote}
                                onChange={(e) =>
                                    setCustomerNote(
                                        e.target.value
                                    )
                                }
                                maxLength="500"
                            />


                            <small className="text-muted">

                                Optional. Maximum 500 characters.

                            </small>

                        </div>

                    </div>


                    {/* PAYMENT METHOD */}

                    <div className="card mt-4">

                        <div className="card-body">

                            <h4>
                                Payment Method
                            </h4>


                            <div className="form-check">

                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="paymentMethod"
                                    id="cash"
                                    value="CASH"
                                    checked={
                                        paymentMethod ===
                                        "CASH"
                                    }
                                    onChange={(e) =>
                                        setPaymentMethod(
                                            e.target.value
                                        )
                                    }
                                />


                                <label
                                    className="form-check-label"
                                    htmlFor="cash"
                                >
                                    💵 Cash
                                </label>

                            </div>


                            <div className="form-check mt-2">

                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="paymentMethod"
                                    id="creditCard"
                                    value="CREDIT_CARD"
                                    checked={
                                        paymentMethod ===
                                        "CREDIT_CARD"
                                    }
                                    onChange={(e) =>
                                        setPaymentMethod(
                                            e.target.value
                                        )
                                    }
                                />


                                <label
                                    className="form-check-label"
                                    htmlFor="creditCard"
                                >
                                    💳 Credit Card
                                </label>

                            </div>

                        </div>

                    </div>


                    {/* PLACE ORDER */}

                    <div className="text-end mt-4 mb-5">

                        <button
                            className="btn btn-primary btn-lg"
                            onClick={placeOrder}
                        >
                            Place Order
                        </button>

                    </div>

                </>

            )}

        </div>

    );

}

export default Cart;