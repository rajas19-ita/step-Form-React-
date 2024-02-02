import React, { useState } from "react";
import Input from "./Input";
import { validate } from "../utils/validation";
import { PaymentDetails } from "../models/paymentDetails";

interface PaymentProps {
    details: PaymentDetails;
    setDetails: React.Dispatch<React.SetStateAction<PaymentDetails>>;
    onSubmit: (val: PaymentDetails) => void;
    onBack: () => void;
}

const PaymentDetailsPage: React.FC<PaymentProps> = ({
    details,
    setDetails,
    onSubmit,
    onBack,
}) => {
    const [isValid, setIsValid] = useState({
        nameOnCard: true,
        cardNum: true,
        expMonth: true,
        expYear: true,
        cvv: true,
    });

    const handleSubmit = () => {
        const trimmedDetails = {
            nameOnCard: details.nameOnCard.trim(),
            cardNum: details.cardNum.replace(/[-\s]/g, ""),
            expMonth: details.expMonth.trim(),
            expYear: details.expYear.trim(),
            cvv: details.cvv.trim(),
        };
        setDetails(trimmedDetails);

        const nameOnCardV = validate({
            value: trimmedDetails.nameOnCard,
            required: true,
            minLength: 4,
        });
        const cardNumV = validate({
            value: trimmedDetails.cardNum,
            cardNum: true,
        });
        const expMonthV = validate({
            value: trimmedDetails.expMonth,
            required: true,
        });
        const expYearV = validate({
            value: trimmedDetails.expYear,
            required: true,
        });
        const cvvV = validate({
            value: trimmedDetails.cvv,
            cvv: true,
        });

        if (!nameOnCardV || !cardNumV || !expMonthV || !expYearV || !cvvV) {
            setIsValid({
                nameOnCard: nameOnCardV,
                cardNum: cardNumV,
                expMonth: expMonthV,
                expYear: expYearV,
                cvv: cvvV,
            });
        } else {
            setIsValid({
                nameOnCard: true,
                cardNum: true,
                expMonth: true,
                expYear: true,
                cvv: true,
            });
            onSubmit(trimmedDetails);
        }
    };

    return (
        <div className=" w-full max-w-xl flex flex-col gap-4">
            <h2 className="text-3xl font-bold mb-4">Payment Details</h2>
            <Input
                type="text"
                title="Name on Card"
                value={details.nameOnCard}
                onChange={(value) =>
                    setDetails((details) => ({
                        ...details,
                        nameOnCard: value,
                    }))
                }
                error={!isValid.nameOnCard ? "Please enter valid Name" : null}
            />
            <Input
                type="text"
                title="Card Number"
                value={details.cardNum}
                onChange={(value) =>
                    setDetails((details) => ({
                        ...details,
                        cardNum: value,
                    }))
                }
                placeHolder="0000-0000-0000-0000"
                error={
                    !isValid.cardNum ? "please enter valid Card Number" : null
                }
            />
            <div className="flex gap-8">
                <div className="flex flex-col gap-2">
                    <p className=" font-medium ">Expiry date</p>
                    <div className="flex gap-6">
                        <Input
                            type="select"
                            outerDivClass="w-full max-w-20"
                            placeHolder="mm"
                            error={!isValid.expMonth ? "select month" : null}
                            value={details.expMonth}
                            values={[
                                "01",
                                "02",
                                "03",
                                "04",
                                "05",
                                "06",
                                "07",
                                "08",
                                "09",
                                "10",
                                "11",
                                "12",
                            ]}
                            onChange={(val) =>
                                setDetails((details) => ({
                                    ...details,
                                    expMonth: val,
                                }))
                            }
                        />
                        <Input
                            type="select"
                            error={!isValid.expYear ? "select year" : null}
                            placeHolder="yyyy"
                            outerDivClass="w-full max-w-28"
                            value={details.expYear}
                            values={["2024", "2025", "2026", "2027"]}
                            onChange={(val) =>
                                setDetails((details) => ({
                                    ...details,
                                    expYear: val,
                                }))
                            }
                        />
                    </div>
                </div>
                <Input
                    type="text"
                    title="CVV"
                    outerDivClass="max-w-20 w-full"
                    value={details.cvv}
                    onChange={(value) =>
                        setDetails((details) => ({
                            ...details,
                            cvv: value,
                        }))
                    }
                    error={!isValid.cvv ? "Please enter valid cvv" : null}
                />
            </div>
            <div className="flex justify-end gap-4 mt-3 ">
                <button
                    className=" rounded-md self-end px-4 py-2 font-medium "
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
                    Submit
                </button>
            </div>
        </div>
    );
};

export default PaymentDetailsPage;
