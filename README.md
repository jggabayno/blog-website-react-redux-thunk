# Blog Website App (React, Redux-Thunk)

## Overview

This app is a **React-based blog website** that integrates **Redux and Redux Thunk** for state management and asynchronous actions. The system supports functionalities such as:

- **Blog Management**: Create, edit, delete, and publish blog posts.
- **Authentication & Security**: Secure login, registration, and user authentication.
- **User Management**: Admins can manage users and roles.
- **Post Interactions**: Users can like, comment, and share blog posts.
- **Email Notifications**: Users receive email updates for new posts, comments, and replies.
- **Rich Text Editor**: Support for formatting blog content.

## Features
- **User Authentication**: Secure login and registration.
- **Blog System**:
  - Write, edit, and publish blog posts.
  - Allow users to comment, like, and share posts.

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
