const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/User");

describe("Authentication Endpoints", () => {
  // Clear the User collection before each test
  beforeEach(async () => {
    await User.deleteMany({});
  });

  // Test user data
  const userData = {
    username: "testuser",
    password: "testpass",
  };

  // Test signup
  it("should create a new user", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send(userData);
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User created successfully");

    // Check if the user was saved in the database
    const user = await User.findOne({ username: userData.username });
    expect(user).not.toBeNull();
  });

  // Test login
  it("should log in an existing user and return a token", async () => {
    // Create a user first
    await request(app).post("/api/auth/signup").send(userData);

    // Log in the user
    const res = await request(app)
      .post("/api/auth/login")
      .send(userData);
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  // Test login with invalid credentials
  it("should not log in with invalid credentials", async () => {
    // Create a user first
    await request(app).post("/api/auth/signup").send(userData);

    // Attempt to log in with wrong password
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "testuser", password: "wrongpass" });
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe("Invalid credentials");
  });
});