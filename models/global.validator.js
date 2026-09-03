//A global Validator file for objects in database.

import validator from "validator";

//User Name Validator
//Custom logic for First + Lastname

export const validateFullName = {
    validator: function (value) {
        if (!value) return false;

        //custom regex fro letters, accents, spaces, and hyphens.
        const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
        /* condition for return just a name uncomment 
        below line and comment everthing else in validator object.*/
        // return nameRegex.test(value);
        if (!nameRegex.test(value)) return false;

        // condition to check for both first and last name

        const words = value.trim().split(/\s+/);
        return words.length >= 2;

    },
    message: "Please provide both First and Last Name (letters only)",
};

//E-mail built-in validator.

export const validateEmail = {
    validator: (value) => validator.isEmail(value),
    message: "Please provide a valid email address",
};

//Strong-Password validator

export const validatePassword = {
    validator: (value) => validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 2,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1
    }),
    message:`Password must be atleast 8 characters long and contain
            uppercase,lowercase, numbers & special characters.`
};


// Subscription Name Validator

export const validateName = {
    validator: function (value) {
        if (!value) return false;
        const nameRegex = /^[a-zA-Z0-9À-ÿ\s'+\-&]+$/;
        return nameRegex.test(value);
    },
    message: "Please provide the Subscription name."
};

// start date validator

export const validateStartDate = {
    validator: (value) => value <= new Date(),
    message: "Start date must be in Past."
};

// Renewal Date validator.

export const validateRenewalDate = {
    validator: function (value) {
        if (!value || !this.startDate) return true;
        return value > this.startDate;
    },
    message: "Renewal date must be after start date"
};