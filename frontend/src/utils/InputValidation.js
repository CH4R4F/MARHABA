class InputValidation {
  static isValidEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  static isValidPassword(password) {
    const re = /^.{8,}$/;
    return re.test(String(password));
  }

  static isValidName(name) {
    const re = /^[a-zA-Z]+$/;
    return re.test(String(name));
  }

  static isValidPhone(phone) {
    const re = /^\d{10}$/;
    return re.test(String(phone));
  }
}

export default InputValidation;
