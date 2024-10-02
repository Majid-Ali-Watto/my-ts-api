var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Author_name, _Book_title, _Book_iban, _Book_author;
class Author {
    constructor(name) {
        _Author_name.set(this, void 0);
        __classPrivateFieldSet(this, _Author_name, name, "f");
    }
    // Getter to retrieve author's name
    getName() {
        return __classPrivateFieldGet(this, _Author_name, "f");
    }
}
_Author_name = new WeakMap();
class Book {
    constructor(title, iban, author) {
        _Book_title.set(this, void 0);
        _Book_iban.set(this, void 0);
        _Book_author.set(this, void 0);
        __classPrivateFieldSet(this, _Book_author, author, "f");
        __classPrivateFieldSet(this, _Book_iban, iban, "f");
        __classPrivateFieldSet(this, _Book_title, title, "f");
    }
    // Getter to retrieve book's title
    getTitle() {
        return __classPrivateFieldGet(this, _Book_title, "f");
    }
    setTitle(title) {
        __classPrivateFieldSet(this, _Book_title, title, "f");
    }
    // Getter to retrieve book's IBAN
    getIban() {
        return __classPrivateFieldGet(this, _Book_iban, "f");
    }
    setIban(iban) {
        __classPrivateFieldSet(this, _Book_iban, iban, "f");
    }
    // Getter to retrieve the book's author
    getAuthor() {
        return __classPrivateFieldGet(this, _Book_author, "f");
    }
    setAuthor(author) {
        __classPrivateFieldSet(this, _Book_author, author, "f");
    }
    // Method to return a plain object version of the Book instance
    toPlainObject() {
        return {
            title: __classPrivateFieldGet(this, _Book_title, "f"),
            iban: __classPrivateFieldGet(this, _Book_iban, "f"),
            author: __classPrivateFieldGet(this, _Book_author, "f").getName() // Convert author to plain text
        };
    }
    // Method to print book details
    printDetails() {
        return `Title: ${__classPrivateFieldGet(this, _Book_title, "f")}, IBAN: ${__classPrivateFieldGet(this, _Book_iban, "f")}, Author: ${__classPrivateFieldGet(this, _Book_author, "f").getName()}`;
    }
}
_Book_title = new WeakMap(), _Book_iban = new WeakMap(), _Book_author = new WeakMap();
class Handler {
    constructor() {
        this.books = []; // Initialize the books array
    }
    // Create method to add a new book
    create(body) {
        const author = new Author(body.author);
        const book = new Book(body.title, body.iban, author);
        this.books.push(book);
        return "Book created successfully: " + book.printDetails();
    }
    // Read method to retrieve all books
    read() {
        return this.books.map((book) => book.toPlainObject());
    }
    findBook(iban) {
        return this.books.find((b) => b.getIban() === iban);
    }
    // Find method to search for a book by IBAN
    find(iban) {
        const book = this.findBook(iban);
        return (book === null || book === void 0 ? void 0 : book.toPlainObject()) || undefined;
    }
    // Update method to update a book by IBAN
    update(iban, body) {
        const book = this.findBook(iban);
        if (!book) {
            return "Book not found";
        }
        if (body.title) {
            book.setTitle(body.title);
        }
        if (body.author) {
            book.setAuthor(new Author(body.author));
        }
        if (body.iban) {
            book.setIban(body.iban);
        }
        return "Book updated successfully";
    }
    // Delete method to remove a book by IBAN
    delete(iban) {
        const bookIndex = this.books.findIndex((b) => b.getIban() === iban);
        if (bookIndex !== -1) {
            const deletedBook = this.books.splice(bookIndex, 1)[0];
            return deletedBook.printDetails();
        }
        return undefined;
    }
}
const handler = new Handler();
export { handler };
//# sourceMappingURL=Book.js.map