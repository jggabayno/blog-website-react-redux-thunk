# Blog Website App with RBAC (React, Redux-Thunk)

## Overview

This app is a **React-based blog website** that integrates **Redux and Redux Thunk** for state management and asynchronous actions. It includes **Role-Based Access Control (RBAC)** to ensure secure access to different features. The system supports functionalities such as:

- **Access Control**: Restrict actions based on user roles (Admin, Editor, User).
- **Blog Management**: Create, edit, delete, and publish blog posts.
- **Authentication & Security**: Secure login, registration, and user authentication.
- **User Management**: Admins can manage users and roles.
- **Post Interactions**: Users can like, comment, and share blog posts.
- **Email Notifications**: Users receive email updates for new posts, comments, and replies.
- **Rich Text Editor**: Support for formatting blog content.

## Features

- **Role-Based Access Control (RBAC)**: Define and assign roles with specific permissions.
- **User Authentication**: Secure login and registration.
- **Blog System**:
  - Write, edit, and publish blog posts.
  - Manage categories and tags.
  - Allow users to comment, like, and share posts.
- **SEO Optimization**: Optimize content for search engines.
- **Dark Mode Support**: Toggle between light and dark themes.
- **Responsive Design**: Works across all devices.

## Getting Started

### Requirements

- Node.js 12.x to 14.x 
- npm

### Setup

1. Clone the repository.
2. Install dependencies:

   ```sh
   npm install
   ```

3. Use the .env.example file as a reference to create your own .env for environment setup.

## Running the Application

### Development Mode

To start the development server:

```sh
npm run dev
```

After running, access the application at:

```sh
http://localhost:3000/
```

### Production Mode

To build and start the production server:

```sh
npm run build
npm run start
```