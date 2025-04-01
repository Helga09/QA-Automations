# Blog Platform

## Description
This is a REST API for a blog platform built using Node.js, Express, and MongoDB. It allows users to:
- Register and log in.
- Create, edit, view, and delete posts.
- Add and view comments.

## Project Structure

- **node_modules/**  
  *Project dependencies.*

- **package.json**  
  *List of dependencies and scripts.*

- **package-lock.json**  
  *Dependency version lock.*

- **public/**  
  *Static files (e.g., HTML, CSS, JS).*

- **server.js**  
  *Main server file.*

- **ReadMe.md**  
  *Project documentation.*

## Installation and Setup
### Prerequisites:
- Ensure you have **Node.js** and **MongoDB** installed on your machine.

### Steps:
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```
2. **Install Dependencies:**
    ```bash
    npm install
    ```
3. **Set Up MongoDB:**
- Make sure MongoDB is running locally.
- By default, the blog database will be used. Connection settings are in `server.js`.
4. **Run the Server:**
    ```bash
    node server.js 
    ```
The server will be accessible at http://localhost:3000.

## API Endpoints
### Users:
- `POST /register` - Register a new user.
- `POST /login` - Log in a user.
- `POST /reset-password` - Reset user password.
- `GET /profile?email=<email>` - Retrieve user profile.

### Posts:
- `POST /posts` - Create a new post.
- `PUT /posts/:postId` - Edit an existing post.
- `DELETE /posts/:postId` - Delete a post.
- `GET /posts` - View all posts.
- `GET /posts/:postId` - View a specific post and its comments.

### Comments:
- `POST /comments` - Add a comment to a post.


## Features
### User Functionality:
- **Registration**: Secure user registration with hashed passwords.
- **Login**: User authentication with email and password.
- **Profile Retrieval**: Fetch user details and their posts.
- **Password Reset**: Allows users to reset their passwords securely.

### Blog Posts:
- **Create Posts**: Registered users can create new posts.
- **Edit Posts**: Update post content and title.
- **Delete Posts**: Remove unwanted posts.
- **View Posts**: Retrieve all posts or a specific post with its comments.

### Comments:
- **Add Comments**: Users can add comments to posts.
- **View Comments**: Retrieve comments associated with a specific post.