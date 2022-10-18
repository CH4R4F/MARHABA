class InputValidation {
  // Validate register
  registerValidation(first_name, last_name, email, password) {
    try {
      this.validateName(first_name);
      this.validateName(last_name);
      this.validateEmail(email);
      this.validatePassword(password);
    } catch (error) {
      throw error;
    }
  }

  validateName(name) {
    // min 3 chars
    if (!name.match(/[a-zA-Z]{3,}$/)) {
      const error = new Error(
        "First Name and Last Name must be at least 2 characters"
      );
      error.statusCode = 400;
      throw error;
    }

    return true;
  }

  validateEmail(email) {
    // email regex
    if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
      const error = new Error("Email is not valid");
      error.statusCode = 400;
      throw error;
    }

    return true;
  }

  validatePassword(password) {
    // min 6 chars
    if (password.trim().length < 6) {
      const error = new Error("Password must be at least 6 characters");
      error.statusCode = 400;
      throw error;
    }

    return true;
  }
}

module.exports = InputValidation;
