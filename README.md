# Blog Application

## Description
This blog application is a full-stack project demonstrating the implementation of a blogging platform. Users can perform CRUD operations on posts and add comments to specific posts. The project showcases your skills in full-stack development, RESTful API design, server and client validation, and error handling.

---

## Features Implemented

1. **Display a List of Posts**  
   - Users can view a paginated list of all blog posts with a search feature to filter posts by title.
   
2. **View a Specific Post and Its Comments**  
   - Users can click on a post to view its details and all associated comments.

3. **Create a New Post**  
   - Users can create new blog posts with titles and content. Input validation is performed on both the frontend and backend.

4. **Update a Post**  
   - Users can edit the title or content of an existing post. Input validation ensures data integrity.

5. **Delete a Post**  
   - Users can delete a specific post. Confirmation is provided before deletion.

6. **Add a Comment to a Post**  
   - Users can add comments to a post. Emojis are automatically added to comments for fun.

---

## Additional Enhancements

- **Search and Filter**  
  A search bar allows users to filter posts by title in real-time.

- **Pagination**  
  Posts are displayed in a paginated view, making it easier to navigate large datasets.

- **Client and Server-Side Validation**  
  - Frontend: Validates user inputs for empty fields and ensures appropriate lengths for post titles and content.
  - Backend: Implements validation to reject invalid or incomplete requests.

- **Error Handling**  
  - Frontend: Error modals display meaningful messages for validation and API errors.
  - Backend: Comprehensive error responses ensure proper feedback to clients.

---

## Technology Stack

### Backend
- **NestJS** as the server-side framework.
- **PostgreSQL** for the database.
- **TypeORM** as the Object-Relational Mapper (ORM).

### Frontend
- **React** for the user interface.
- **Redux Toolkit** for state management.
- **Material-UI** for UI components and styling.
- **Framer Motion** for animations.

### Deployment
- Backend hosted on [Railway](https://blog-app-production-2574.up.railway.app/posts).
- Frontend hosted on [Netlify](https://luminous-semifreddo-9fdb6d.netlify.app/).
- Database configured on Railway with PostgreSQL (connection credentials are included in the codebase).

---

## Setup Instructions

### Backend
1. Clone the repository and navigate to the backend directory.
2. Install dependencies: `npm install`.
3. Configure the database connection using PostgreSQL.
   - Use **pgAdmin** with the following credentials:
     - Host: `junction.proxy.rlwy.net`
     - Port: `27849`
     - Username: `postgres`
     - Password: `lmktimvohnHhOuVzpBuYdaclbxgnMxTh`
     - Database: `railway`
4. Run the server: `npm run start`.

### Frontend
1. Clone the repository and navigate to the frontend directory.
2. Install dependencies: `npm install`.
3. Start the development server: `npm run dev`.

### Deployment Links
- **Frontend**: [Netlify](https://luminous-semifreddo-9fdb6d.netlify.app/)
- **Backend**: [Railway](https://blog-app-production-2574.up.railway.app/posts)

---

## How to Use
1. Visit the frontend link to interact with the application.
2. View the list of posts, search or filter posts.
3. Create, edit, or delete posts.
4. Add comments to specific posts.

---

## Notes and Assumptions
- The database is pre-seeded with some test data.
- Ensure both frontend and backend are running for full functionality.

---

