import React, { useState } from "react";
import Input from "./Input";
import { validate } from "../utils/validation";
import { PersonalDetails } from "../models/personalDetails";

interface PersomalProps {
    details: PersonalDetails;
    setDetails: React.Dispatch<React.SetStateAction<PersonalDetails>>;
    onNext: () => void;
}

const PersonalDetailsPage: React.FC<PersomalProps> = ({
    details,
    setDetails,
    onNext,
}) => {
    const [isValid, setIsValid] = useState({
        firstName: true,
        lastName: true,
        email: true,
        contact: true,
        birthDate: true,
        sex: true,
    });
    const handleSubmit = () => {
        const trimmedDetails = {
            firstName: details.firstName.trim(),
            lastName: details.lastName.trim(),
            email: details.email.trim(),
            contact: details.contact.trim(),
            birthDate: details.birthDate.trim(),
            sex: details.sex.trim(),
        };
        setDetails(trimmedDetails);

        const firstNameV = validate({
            value: trimmedDetails.firstName,
            required: true,
            minLength: 2,
        });
        const lastNameV = validate({
            value: trimmedDetails.lastName,
            required: true,
            minLength: 2,
        });
        const emailV = validate({
            value: trimmedDetails.email,
            email: true,
        });
        const contactV = validate({
            value: trimmedDetails.contact,
            contact: true,
        });
        const ageV = validate({
            value: trimmedDetails.birthDate,
            minAge: 18,
        });
        const sexV = validate({
            value: trimmedDetails.sex,
            required: true,
        });

        if (
            !firstNameV ||
            !lastNameV ||
            !emailV ||
            !contactV ||
            !ageV ||
            !sexV
        ) {
            setIsValid({
                firstName: firstNameV,
                lastName: lastNameV,
                email: emailV,
                contact: contactV,
                birthDate: ageV,
                sex: sexV,
            });
        } else {
            setIsValid({
                firstName: true,
                lastName: true,
                email: true,
                contact: true,
                birthDate: true,
                sex: true,
            });

            onNext();
        }
    };

    return (
        <div className="  w-full max-w-xl flex flex-col gap-4">
            <h2 className="text-3xl font-bold mb-4">Personal Details</h2>
            <div className="flex gap-8">
                <Input
                    type="text"
                    title="First Name"
                    outerDivClass="flex-grow"
                    value={details.firstName}
                    onChange={(value) =>
                        setDetails((details) => ({
                            ...details,
                            firstName: value,
                        }))
                    }
                    error={
                        !isValid.firstName
                            ? "Please enter valid first name"
                            : null
                    }
                    autoComplete="given-name"
                />

                <Input
                    type="text"
                    title="Last Name"
                    outerDivClass="flex-grow"
                    value={details.lastName}
                    onChange={(value) =>
                        setDetails((details) => ({
                            ...details,
                            lastName: value,
                        }))
                    }
                    error={
                        !isValid.lastName
                            ? "Please enter valid last name"
                            : null
                    }
                    autoComplete="family-name"
                />
            </div>
            <div className="flex gap-8 ">
                <Input
                    type="date"
                    title="Date of Birth"
                    value={details.birthDate}
                    onChange={(value) =>
                        setDetails((details) => ({
                            ...details,
                            birthDate: value,
                        }))
                    }
                    error={!isValid.birthDate ? "Please enter valid dob" : null}
                />
                <div className="flex flex-grow justify-center">
                    <Input
                        type="radio"
                        title="Sex"
                        values={["Male", "Female", "Other"]}
                        value={details.sex}
                        onChange={(value) =>
                            setDetails((details) => ({
                                ...details,
                                sex: value,
                            }))
                        }
                        error={!isValid.sex ? "Please select sex" : null}
                    />
                </div>
            </div>
            <div className="flex gap-8">
                <Input
                    type="email"
                    title="Email"
                    outerDivClass="flex-grow"
                    value={details.email}
                    onChange={(value) =>
                        setDetails((details) => ({
                            ...details,
                            email: value,
                        }))
                    }
                    error={!isValid.email ? "Please enter valid email" : null}
                    autoComplete="email"
                />

                <Input
                    type="tel"
                    title="Contact No."
                    outerDivClass="flex-grow"
                    value={details.contact}
                    onChange={(value) =>
                        setDetails((details) => ({
                            ...details,
                            contact: value,
                        }))
                    }
                    error={
                        !isValid.contact
                            ? "Please enter valid contact no."
                            : null
                    }
                    autoComplete="tel"
                />
            </div>
            <button
                className=" bg-blue-500 mt-4 rounded-md self-end px-4 py-2 font-medium text-white"
                onClick={() => {
                    handleSubmit();
                }}
            >
                Next Step
            </button>
        </div>
    );
};

export default PersonalDetailsPage;
