import {
    addBookHandler,
    editBookHandler,
    getAllBookHandler,
    getBookByIdHandler,
    removeBookHandler
} from "../handler/books-handler.js";

const BookRoutes = [
    {
        method: "POST",
        path: "/books",
        handler : addBookHandler
    },
    {
        method: "GET",
        path: "/books",
        handler: getAllBookHandler
    },
    {
        method: "GET",
        path: "/books/{bookId}",
        handler: getBookByIdHandler
    },
    {
        method: "PUT",
        path: "/books/{bookId}",
        handler:editBookHandler
    },
    {
        method: "DELETE",
        path: "/books/{bookId}",
        handler: removeBookHandler
    },
];

export default BookRoutes;