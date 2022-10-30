class User {
  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.password = data.password;
  }

  static async checkLogin(Email, Password) {
    let id = 1;
    let email = Email;
    let password = Password;
    if (email && password) {
      if (email == "ruth@gmail.com" && password == "1234") {
        return new User(id, email, password);
      }
    }
    return;
  }
}

module.exports = User;
