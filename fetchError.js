class FetchError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "FetchError";
    this.code = code
  }
}

const error = new FetchError("E01", "not found");
console.log(error.code, error.message, error.name);
throw error;