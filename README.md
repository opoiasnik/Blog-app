# Blog Application

## Live Project
- **Frontend (Live Link)**: [Netlify](https://luminous-semifreddo-9fdb6d.netlify.app/)

---

## Description
This blog application is a full-stack project that implements a blogging platform. Users can perform CRUD operations on posts and add comments to specific posts. The project highlights the integration of a RESTful API, server and client-side validation, error handling, and a responsive user interface.

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
- Database configured on Railway with PostgreSQL (connection credentials provided below).

---

## Deployment Links
- **Frontend**: [Netlify](https://luminous-semifreddo-9fdb6d.netlify.app/)
- **Backend**: [Railway](https://blog-app-production-2574.up.railway.app/posts)

---

## How to Connect to the Database with pgAdmin

1. Open **pgAdmin** and log in.
2. Click on "Add New Server".
3. In the "General" tab:
   - **Name**: Enter any name (e.g., `BlogApp`).
4. In the "Connection" tab:
   - **Host name/address**: `junction.proxy.rlwy.net`
   - **Port**: `27849`
   - **Maintenance database**: `railway`
   - **Username**: `postgres`
   - **Password**: `lmktimvohnHhOuVzpBuYdaclbxgnMxTh`
5. Save and connect to the server.
6. Once connected, navigate to the database named `railway`.

---

## Local Setup Instructions

If you want to run the project locally, follow these steps. Please note that the deployment-specific links (e.g., Netlify and Railway URLs) in the code should be updated to match your local environment.

### Backend
1. Clone the repository and navigate to the `backend` folder.
2. Run `npm install` to install dependencies.
3. Configure the database connection in `app.module.ts`:
   - Update the database connection configuration to use your local PostgreSQL instance:
     - **Host**: `localhost`
     - **Port**: The port your PostgreSQL is running on (e.g., `5432`).
     - **Username**: Your local PostgreSQL username.
     - **Password**: Your local PostgreSQL password.
     - **Database**: The name of your local database.
4. Update any references in the backend code that point to external URLs (e.g., the deployed frontend URL) to point to your local frontend. Replace:
   - `https://luminous-semifreddo-9fdb6d.netlify.app` with `http://localhost:3000` (or your local frontend URL).
5. Start the server with `npm run start`.

### Frontend
1. Clone the repository and navigate to the `frontend` folder.
2. Run `npm install` to install dependencies.
3. Update the API endpoints in the frontend code:
   - Replace all instances of the deployed backend URL (`https://blog-app-production-2574.up.railway.app`) with your local backend URL (e.g., `http://localhost:4000/posts`).
4. Start the development server with `npm run dev`.

---

## Notes for Local Development
- Ensure that PostgreSQL is running locally and the database is properly configured.
- The backend should run on `http://localhost:4000` by default unless you specify a different port.
- The frontend should communicate with the local backend server.
- Update any `.env` or configuration files to reflect your local environment settings.

