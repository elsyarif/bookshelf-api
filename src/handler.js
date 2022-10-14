const { nanoid } = require("nanoid"); 
const Books = require("./data/books");

/**
 * TODO: add new Books to server
 *      name: required
 * 
 */
const addBookHandler = (request, h) => {
    const nameProperty = request.payload.hasOwnProperty('name');

    // cek name property pada body
    if(!nameProperty){
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku"
        });

        response.code(400);
        return response;
    }

    const {name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
};

/**
 * TODO: get all books
 *     
 * 
 */ 
const getAllBookHandler = (request, h) => {}

/**
 * TODO: Get books by Id
 *     
 * 
 */ 
const getBookByIdHandler = (request, h) => {}

/**
 * TODO: Edit books by Id
 *     
 * 
 */ 
const editBookHandler = (request, h) => {}

/**
 * TODO: Delete books
 *     
 * 
 */ 
const removeBookHandler = (request, h) => {}


module.exports = {
    addBookHandler,
    getAllBookHandler,
    getBookByIdHandler,
    editBookHandler,
    removeBookHandler
}