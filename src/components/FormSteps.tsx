import React from "react";
import { PAGE } from "../models/PageEnum";
import { FaCheck } from "react-icons/fa6";

interface propsT {
    page: PAGE;
}

const FormSteps: React.FC<propsT> = ({ page }) => {
    return (
        <div className="flex max-w-xl w-full gap-10 font-medium border-b-2 pb-5 pt-2">
            <div className="flex gap-2 items-center">
                <span
                    className={`${
                        page === PAGE.PERSONAL ? "bg-blue-500" : "bg-gray-200"
                    } text-white h-10 w-10 flex items-center justify-center rounded-md`}
                >
                    {page !== PAGE.PERSONAL ? (
                        <FaCheck className="text-blue-500" />
                    ) : (
                        1
                    )}
                </span>
                <h3>Personal</h3>
            </div>
            <div className="flex gap-2 items-center">
                <span
                    className={`${
                        page === PAGE.ADDRESS
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-500"
                    }  h-10 w-10 flex items-center justify-center rounded-md`}
                >
                    {page === PAGE.PAYMENT ? (
                        <FaCheck className="text-blue-500" />
                    ) : (
                        2
                    )}
                </span>
                <h3>Address</h3>
            </div>
            <div className="flex gap-2 items-center">
                <span
                    className={`${
                        page === PAGE.PAYMENT
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-500"
                    } h-10 w-10 flex items-center justify-center rounded-md`}
                >
                    3
                </span>
                <h3>Payment</h3>
            </div>
        </div>
    );
};

export default FormSteps;
