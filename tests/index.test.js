const axios = require("axios");

const BACKEND_URL = "http://localhost:3000";

describe("Authentication", () => {
  // Test cases for user authentication endpoints

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

describe("User metadata endpoints", () => {
  // Test cases for user metadata endpoints

  let token = "";
  let avatarId = "";

  beforeAll(async () => {
    const username = "sayan" + Math.random();
    const password = "123456";

    await axios.post(`&{BACKEND_URL}/api/vw/signup`, {
      username,
      password,
      type: "admin",
    });

    const response = await axios.post(`&{BACKEND_URL}/api/vw/signin`, {
      username,
      password,
    });

    token = response.data.token;

    const avatarResponse = await axios.post(
      `${BACKEND_URL}/api/v1/admin/avatar`,
      {
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
        name: "Timmy",
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("avatarresponse is " + avatarResponse.data.avatarId);

    avatarId = avatarResponse.data.avatarId;
  });

  test("User cant update their metadata with a wrong avatar id", async () => {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/user/metadata`,
      {
        avatarId: "123123123",
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    expect(response.status).toBe(400);
  });

  test("User can update their metadata with the right avatar id", async () => {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/user/metadata`,
      {
        avatarId,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    expect(response.status).toBe(200);
  });

  test("User is not able to update their metadata if the auth header is not present", async () => {
    const response = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`, {
      avatarId,
    });

    expect(response.status).toBe(403);
  });
});
