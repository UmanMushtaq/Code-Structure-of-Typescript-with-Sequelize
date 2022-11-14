import validator from "./validator";

const userResiter = [
  validator.emailFieldValidationMW("email"),
  validator.requiredFieldValidationMW("email"),
  validator.requiredFieldValidationMW("first_name"),
  validator.requiredFieldValidationMW("last_name"),
  validator.requiredFieldValidationMW("password"),
  validator.passwordFieldValidationMW("password", 8),
];
const signIn = [
  validator.emailFieldValidationMW("email"),
  validator.requiredFieldValidationMW("email"),
  validator.requiredFieldValidationMW("password"),
];

const forgotpassword = [
  validator.emailFieldValidationMW("email"),
  validator.requiredFieldValidationMW("email"),
];
const otp = [validator.requiredFieldValidationMW("code")];
const resetpassword = [
  validator.requiredFieldValidationMW("token"),
  validator.requiredFieldValidationMW("password"),
  validator.passwordFieldValidationMW("password", 8),
];

class validation {
  signup = [userResiter, validator.validationResultMW];
  signin = [signIn, validator.validationResultMW];
  otp = [otp, validator.validationResultMW];
  forgotpassword = [forgotpassword, validator.validationResultMW];
  resetpassword = [resetpassword, validator.validationResultMW];
}

export default new validation();
