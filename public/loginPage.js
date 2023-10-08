"use strict";
const userForm = new UserForm();

userForm.loginFormCallback = function (data) {
  ApiConnector.login(data, (message) => {
    if (message.success) {
      location.reload();
    } else userForm.setLoginErrorMessage(message.error);
  });
};
userForm.registerFormCallback = function (data) {
  ApiConnector.login(data, (message) => {
    if (message.success) {
      location.reload();
    } else userForm.setRegisterErrorMessage(message);
  });
};


