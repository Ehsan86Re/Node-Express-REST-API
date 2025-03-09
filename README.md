## Framework: Express.js
Lightweight and flexible framework, Easy to set up and extend with middleware.

## Database: MongoDB
Supports text indexing for high-performance search functionality, calable and easy to integrate with Node.js using Mongoose.

## Third-Party Tools
JWT - Used for stateless authentication, ensures secure communication between the client and server.
Bcrypt.js - Used for hashing passwords.
Express Rate Limit - Used for rate limiting and request throttling.
Jest and Supertest - Used for writing unit and integration tests.

## Setup Instructions
1. Prerequisites
    Node.js (v16 or higher)
    MongoDB (local or cloud instance)

2. Clone the Repository
    git clone https://github.com/your-username/notes-api.git
    cd notes-api

3. Install Dependencies
    npm install

4. Set Up Environment Variables
    Create a .env file in the root directory and add the following variables:
    MONGO_URI=mongodb://localhost:27017/notesdb
    JWT_SECRET=your_jwt_secret_key
    PORT=3000

5. Run the Application
    npm start

## PostMan Collection Link:
https://github.com/Ehsan86Re/SpeerAssessmentBackEnd/blob/main/postman_collection.json

## API Endpoints
- Authentication
    POST /api/auth/signup: Create a new user account.
    POST /api/auth/login: Log in to an existing user account and receive an access token.
- Notes
    GET /api/notes: Get a list of all notes for the authenticated user.
    POST /api/notes: Create a new note for the authenticated user.
    GET /api/notes/:id: Get a note by ID for the authenticated user.
    PUT /api/notes/:id: Update an existing note by ID for the authenticated user.
    DELETE /api/notes/:id: Delete a note by ID for the authenticated user.
    POST /api/notes/:id/share: Share a note with another user for the authenticated user.
    GET /api/search?q=:query: Search for notes based on keywords for the authenticated user.
