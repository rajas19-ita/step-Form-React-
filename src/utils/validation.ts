import validator from "validator";

export interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    email?: boolean;
    contact?: boolean;
    minAge?: number;
    cardNum?: boolean;
    pinCode?: boolean;
    cvv?: boolean;
}

export function validate(validatableInput: Validatable) {
    let isValid = true;
    if (validatableInput.required) {
        isValid =
            isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (
        validatableInput.minLength != null &&
        typeof validatableInput.value === "string"
    ) {
        isValid =
            isValid &&
            validatableInput.value.length >= validatableInput.minLength;
    }
    if (
        validatableInput.maxLength != null &&
        typeof validatableInput.value === "string"
    ) {
        isValid =
            isValid &&
            validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.email && typeof validatableInput.value === "string") {
        isValid = isValid && validator.isEmail(validatableInput.value);
    }
    if (
        validatableInput.contact &&
        typeof validatableInput.value === "string"
    ) {
        isValid =
            isValid && validator.isMobilePhone(validatableInput.value, "en-IN");
    }
    if (validatableInput.minAge != null) {
        const birthdate = new Date(validatableInput.value);
        const today = new Date();
        const age = today.getFullYear() - birthdate.getFullYear();

        isValid = isValid && age >= validatableInput.minAge;
    }
    if (
        validatableInput.cardNum &&
        typeof validatableInput.value === "string"
    ) {
        isValid = isValid && validator.isCreditCard(validatableInput.value);
    }
    if (
        validatableInput.pinCode &&
        typeof validatableInput.value === "string"
    ) {
        isValid =
            isValid && validator.isPostalCode(validatableInput.value, "IN");
    }
    if (validatableInput.cvv && typeof validatableInput.value === "string") {
        isValid =
            isValid &&
            validatableInput.value.length === 3 &&
            /^[0-9]{3}/.test(validatableInput.value);
    }

    return isValid;
}
