const request = require("supertest");
const app = require("../src/app");
const Note = require("../src/models/Note");
const User = require("../src/models/User");
const jwt = require("jsonwebtoken");

describe("Note Endpoints", () => {
  let token;
  let userId;

  // Create a user and get a token before running tests
  beforeAll(async () => {
    await User.deleteMany({});
    await Note.deleteMany({});

    // Create a user
    const user = new User({ username: "testuser", password: "testpass" });
    await user.save();

    // Generate a token
    userId = user._id;
    token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
  });

  // Test creating a note
  it("should create a new note", async () => {
    const res = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Note", content: "This is a test note." });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Note");

    // Check if the note was saved in the database
    const note = await Note.findOne({ title: "Test Note" });
    expect(note).not.toBeNull();
  });

  // Test getting all notes
  it("should get all notes for the authenticated user", async () => {
    // Create a note first
    await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Note", content: "This is a test note." });

    // Get all notes
    const res = await request(app)
      .get("/api/notes")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // Test searching for notes
  it("should search for notes based on keywords", async () => {
    // Create a note first
    await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Note", content: "This is a test note." });

    // Search for notes
    const res = await request(app)
      .get("/api/search?q=test")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});