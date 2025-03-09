

# Book App

A full-stack book management application built with React and Node.js, allowing users to add, update, view, and delete books. The app communicates with a RESTful API to perform CRUD operations on book data.

---

## Features

- **View Books**: Display a list of all books with details like title, author, description, and cover image.
- **Add Book**: Add a new book by filling out a form with book details.
- **Update Book**: Update an existing book's details using a prefilled form.
- **Book Details**: View detailed information about a specific book when clicked.

---

## Technologies Used

- **Frontend**: React.js, React Router, Axios, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Other Libraries**: React Hooks, React icons.....

---

## Installation

### 1. Clone the repository:

```bash
git clone https://github.com/haileamlakwalelige/full-stack-book-app-react-with-node-js-simple-crud-app
```

### 2. Navigate to the client directory (React app):

```bash
cd client
```

### 3. Install dependencies:

```bash
npm install
```

### 4. Set up the backend server:

Navigate to the `server` directory and install dependencies:

```bash
cd server
npm install
```

### 5. Run the project

- Start the server (Node.js backend):

```bash
npm start
```

- Start the client (React app):

```bash
cd client
npm run dev
```

The frontend will be running on `http://localhost:5173` and the backend will be running on a different port `http://localhost:3000`.

---

## API Endpoints

Here are the endpoints available in the backend for interacting with the book data:

- **GET `/api/books`** - Fetch all books.
- **GET `/api/books/:id`** - Fetch a single book by ID.
- **POST `/api/books`** - Add a new book.
- **PUT `/api/books/:id`** - Update an existing book.
- **DELETE `/api/books/:id`** - Delete a book by ID.

---

## Usage

1. **Viewing Books**: Once the app is running, you will see a list of books. You can click on any book to view its details.
2. **Adding a Book**: Navigate to the "Add a Book" page to add a new book. You will need to enter the title, author, description, and an optional cover image URL.
3. **Updating a Book**: To update a book, navigate to the "Update Book" page and modify the book details.

---

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push the branch to your fork (`git push origin feature-branch`).
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License.

---

## Contact

- Name – Haileamlak Waleligne haileamlakwaleligne3910@gmail.com
- GitHub: [@haileamlakwalelige](https://github.com/haileamlakwalelige)

---

Let me know if you'd like me to modify anything or add further details!
