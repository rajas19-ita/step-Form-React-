import React, { useState } from "react";
import Input from "./Input";
import { AddressDetails } from "../models/addressDetails";
import { stateData } from "../utils/stateData";
import { validate } from "../utils/validation";

interface AddressProps {
    details: AddressDetails;
    setDetails: React.Dispatch<React.SetStateAction<AddressDetails>>;
    onNext: () => void;
    onBack: () => void;
}

const AddressDetailsPage: React.FC<AddressProps> = ({
    details,
    setDetails,
    onNext,
    onBack,
}) => {
    const [isValid, setIsValid] = useState({
        address: true,
        state: true,
        city: true,
        pinCode: true,
    });
    const handleSubmit = () => {
        const trimmedDetails = {
            address: details.address.trim(),
            state: details.state.trim(),
            city: details.city.trim(),
            pinCode: details.pinCode.trim(),
        };
        setDetails(trimmedDetails);

        const addressV = validate({
            value: trimmedDetails.address,
            required: true,
            minLength: 10,
        });
        const stateV = validate({
            value: trimmedDetails.state,
            required: true,
        });
        const cityV = validate({
            value: trimmedDetails.city,
            required: true,
        });
        const pinCodeV = validate({
            value: trimmedDetails.pinCode,
            pinCode: true,
        });

        if (!addressV || !stateV || !cityV || !pinCodeV) {
            setIsValid({
                address: addressV,
                state: stateV,
                city: cityV,
                pinCode: pinCodeV,
            });
        } else {
            setIsValid({
                address: true,
                state: true,
                city: true,
                pinCode: true,
            });
            onNext();
        }
    };

    return (
        <div className="w-full max-w-xl flex flex-col gap-4">
            <h2 className="text-3xl font-bold mb-4">Address Details</h2>
            <Input
                type="text"
                title="Address"
                error={!isValid.address ? "Address minimum length is 10" : null}
                value={details.address}
                onChange={(val) =>
                    setDetails((details) => ({
                        ...details,
                        address: val,
                    }))
                }
                autoComplete="address"
            />
            <div className="flex justify-between">
                <Input
                    type="select"
                    title="State"
                    outerDivClass="w-full max-w-56"
                    error={!isValid.state ? "Please select State" : null}
                    value={details.state}
                    values={Object.keys(stateData)}
                    onChange={(val) =>
                        setDetails((details) => ({
                            ...details,
                            state: val,
                            city: "",
                        }))
                    }
                />
                <Input
                    type="select"
                    title="City"
                    outerDivClass="w-full max-w-56"
                    error={!isValid.city ? "Please select City" : null}
                    value={details.city}
                    values={stateData[details.state]}
                    onChange={(val) =>
                        setDetails((details) => ({
                            ...details,
                            city: val,
                        }))
                    }
                />
            </div>
            <Input
                type="text"
                title="Pin Code"
                error={!isValid.pinCode ? "Please provide valid Pincode" : null}
                value={details.pinCode}
                outerDivClass="w-full max-w-56"
                onChange={(val) =>
                    setDetails((details) => ({
                        ...details,
                        pinCode: val,
                    }))
                }
                autoComplete="postal-code"
            />
            <div className="flex justify-end gap-4 mt-4">
                <button
                    className="rounded-md self-end px-4 py-2 font-medium "
                    onClick={onBack}
                >
                    Back
                </button>
                <button
                    className=" bg-blue-500 rounded-md px-4 py-2 font-medium text-white"
                    onClick={() => {
                        handleSubmit();
                    }}
                >
                    Next Step
                </button>
            </div>
        </div>
    );
};

export default AddressDetailsPage;
