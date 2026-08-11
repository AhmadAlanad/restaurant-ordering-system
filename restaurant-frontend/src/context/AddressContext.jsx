import { createContext, useState } from "react";

export const AddressContext = createContext();

export function AddressProvider({ children }) {

    const [selectedAddress, setSelectedAddress] =
        useState(null);

    return (
        <AddressContext.Provider
            value={{
                selectedAddress,
                setSelectedAddress
            }}
        >
            {children}
        </AddressContext.Provider>
    );
}