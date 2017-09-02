class AuthState {
  constructor() {
    this.__token__ = null
  }
  get token() {
    return process.env.TOKEN || this.__token__;
  }
}

module.exports = new AuthState();
