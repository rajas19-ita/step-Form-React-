import React, { useState } from "react";
import PersonalDetailsPage from "./components/PersonalDetailsPage";
import { PersonalDetails } from "./models/personalDetails";
import AddressDetailsPage from "./components/AddressDetailsPage";
import { AddressDetails } from "./models/addressDetails";
import PaymentDetailsPage from "./components/PaymentDetailsPage";
import { PaymentDetails } from "./models/paymentDetails";
import { PAGE } from "./models/PageEnum";
import FormSteps from "./components/FormSteps";

const App: React.FC = () => {
    const [page, setPage] = useState<PAGE>(PAGE.PERSONAL);
    const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        birthDate: "",
        sex: "",
    });
    const [addressDetails, setAddressDetails] = useState<AddressDetails>({
        address: "",
        state: "",
        city: "",
        pinCode: "",
    });

    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
        nameOnCard: "",
        cardNum: "",
        expMonth: "",
        expYear: "",
        cvv: "",
    });
    const handleSubmit = async (_details: PaymentDetails) => {
        window.location.reload();
        alert("Form Submitted successfully!");
    };

    const renderPage = () => {
        switch (page) {
            case PAGE.PERSONAL:
                return (
                    <PersonalDetailsPage
                        details={personalDetails}
                        setDetails={setPersonalDetails}
                        onNext={() => setPage(PAGE.ADDRESS)}
                    />
                );
            case PAGE.ADDRESS:
                return (
                    <AddressDetailsPage
                        details={addressDetails}
                        setDetails={setAddressDetails}
                        onNext={() => setPage(PAGE.PAYMENT)}
                        onBack={() => setPage(PAGE.PERSONAL)}
                    />
                );
            case PAGE.PAYMENT:
                return (
                    <PaymentDetailsPage
                        details={paymentDetails}
                        setDetails={setPaymentDetails}
                        onBack={() => setPage(PAGE.ADDRESS)}
                        onSubmit={handleSubmit}
                    />
                );
        }
    };
    return (
        <div className=" m-auto p-4 h-screen flex flex-col gap-5  items-center">
            <FormSteps page={page} />
            {renderPage()}
        </div>
    );
};

export default App;
