export function emailAlreadyRegistered() {
  return {
    name: "DuplicatedRegisterError",
    message: "E-mail already registered",
  };
}

export function emailOrPasswordInvalid() {
  return {
    name: "LoginError",
    message: "E-mail or password invalid"
  }
}