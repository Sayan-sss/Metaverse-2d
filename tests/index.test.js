const axios = require("axios");

const BACKEND_URL = "http://localhost:3000";

describe("Authentication", () => {
  test("User is able to sign up", async () => {
    const username = "sayan" + Math.random();
    const password = "123456";
    axios.post(`&{BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      type: "admin",
    });

    expect(response.statusCode).toBe(200);

    const updatedResponse = await axios.post(`&{BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      type: "admin",
    });

    expect(updatedResponse.statusCode).toBe(400);
  });

  test("Signup request failed if the username is empty", async () => {
    const username = "sayan" + Math.random();
    const password = "123456";

    const response = await axios.post(`&{BACKEND_URL}/api/v1/signup`, {
      password,
    });

    expect(response.statusCode).toBe(400);
  });

  test("Signin succeeds if the username and passwords are correct", async () => {
    const username = "sayan" + Math.random();
    const password = "123456";

    const response = await axios.post(`&{BACKEND_URL}/api/v1/signin`, {
      username,
      password,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  test("Signin fails if the username and passwords are incorrect", async () => {
    const username = "sayan" + Math.random();
    const password = "123456";

    await axios.post(`&{BACKEND_URL}/api/v1/signup`, {
      username,
      password,
    });

    const response = await axios.post(`&{BACKEND_URL}/api/v1/signin`, {
      username: "WrongUsername",
      password,
    });

    expect(response.statusCode).toBe(403);
  });
});
