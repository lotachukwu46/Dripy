import validator from "validator";

export const validateEmail = (email) => validator.isEmail(email);

export const validateUsername = (username) =>
  /^[a-zA-Z0-9_]{3,30}$/.test(username);

export const validatePassword = (password) =>
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
