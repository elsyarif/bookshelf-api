import Books from "../data/books.js";
import { nanoid } from "nanoid";

/**
 * TODO: add new Books to server
 *      body has property name & name: not empty
 * 
 */
export const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    // check property name and name not empty
    if(!name){
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku"
        });

        response.code(400);
        return response;
    }

    if(readPage > pageCount){
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        });

        response.code(400);
        return response;
    }

    // now book
    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
    };

    Books.push(newBook);

    const isSuccess = Books.filter((book) => book.id === id).length > 0;

    if(!isSuccess){
        const response = h.response({
            status: "error",
            message: "Buku gagal ditambahkan"
        });

        response.code(500);
        return response;
    }

    const response = h.response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
            bookId: id
        }
    });

    response.code(201);
    return response;
};

/**
 * TODO: get all books
 * @query: name, reading, finished
 *
 */ 
export const getAllBookHandler = (request, h) => {
    const { name, reading, finished  } = request.query;

    //TODO: ?name Tampilkan seluruh buku yang mengandung nama berdasarkan nilai yang diberikan pada query
    if(name){
       const data = [];

        Books.map((book) => {
            if(book.name.toLowerCase().includes(name.toLowerCase())){
                data.push({
                    id: book.id, name: book.name, publisher: book.publisher
                });
            }
        });

        const response = h.response({
            status: "success",
            data : {
                books: data
            }
        });
        response.code(200);
        return response;
    }

    //TODO: ?reading tampilkan buku yang sedang dibaca true, tidak sedang dibaca false
    if(reading){
        const data = [];

        Books.map((book) => {
            if(book.reading == reading){
                data.push({
                    id: book.id, name: book.name, publisher: book.publisher
                });
            }
        });

        const response = h.response({
            status: "success",
            data : {
                books: data
            }
        });
        response.code(200);
        return response;
    }

    //TODO: ?finished tampilkan buku yang belum selesai dibasa false, tampilkan buku selesai di baca true
    if(finished){
        const data = [];

        Books.map((book) => {
            if(book.finished == finished){
                data.push({
                    id: book.id, name: book.name, publisher: book.publisher
                });
            }
        });

        const response = h.response({
            status: "success",
            data : {
                books: data
            }
        });
        response.code(200);
        return response;
    }

    //TODO: menampilan seluruh book tanpa query parameter
    if(Books.length > 0 && !name && !reading && !finished){
        const data = [];

        Books.map((book) => {
            data.push({
                id: book.id, name: book.name, publisher: book.publisher
            });
        });

        const response = h.response({
            status: "success",
            data : {
                books: data
            }
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: "success",
        data : {
            books: []
        }
    });

    response.code(200);
    return response;
};

/**
 * TODO: Get books by Id
 * @param: bookId
 *
 */
export const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const book = Books.filter((book) => book.id === bookId)[0];

    if(!book){
        const response = h.response({
            status: "fail",
            message: "Buku tidak ditemukan"
        });

        response.code(404);
        return response;
    }


    const response = h.response({
        status: "success",
        data : {
            book: book
        }
    });

    response.code(200);
    return response;
};

/**
 * TODO: Edit books by Id
 * @param: bookId
 *
 */
export const editBookHandler = (request, h) => {
    const { bookId } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updatedAt = new Date().toISOString();

    if(!name){
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Mohon isi nama buku"
        });

        response.code(400);
        return response;
    }

    if(readPage > pageCount){
        const response = h.response({
            status: "fail",
            message:  "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        });

        response.code(400);
        return response;
    }

    const index = Books.findIndex((book) => book.id === bookId);

    if(index !== 0){
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Id tidak ditemukan"
        });

        response.code(404);
        return response;
    }

    Books[index] = {
        ...Books[index],
        name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt
    };

    const response = h.response({
        status: "success",
        message: "Buku berhasil diperbarui"
    });

    response.code(200);
    return response;
};

/**
 * TODO: Delete books
 * @param: bookId
 *
 */
export const removeBookHandler = (request, h) => {
    const { bookId } = request.params;

    const index = Books.findIndex((book) => book.id === bookId);

    if(index !== 0){
        const response = h.response({
            status: "fail",
            message: "Buku gagal dihapus. Id tidak ditemukan"
        });

        response.code(404);
        return response;
    }

    Books.splice(index, 1);
    const response = h.response({
        status: "success",
        message: "Buku berhasil dihapus"
    });

    response.code(200);
    return response;
};