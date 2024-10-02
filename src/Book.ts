class Author {
	#name: string;

	constructor(name: string) {
		this.#name = name;
	}

	// Getter to retrieve author's name
	getName(): string {
		return this.#name;
	}
}

class Book {
	#title: string;
	#iban: string;
	#author: Author;

	constructor(title: string, iban: string, author: Author) {
		this.#author = author;
		this.#iban = iban;
		this.#title = title;
	}

	// Getter to retrieve book's title
	getTitle(): string {
		return this.#title;
	}
	setTitle(title: string): void {
		this.#title = title;
	}

	// Getter to retrieve book's IBAN
	getIban(): string {
		return this.#iban;
	}
	setIban(iban: string): void {
		this.#iban = iban;
	}

	// Getter to retrieve the book's author
	getAuthor(): Author {
		return this.#author;
	}
	setAuthor(author: Author): void {
		this.#author = author;
	}
	// Method to return a plain object version of the Book instance
	toPlainObject(): object {
		return {
			title: this.#title,
			iban: this.#iban,
			author: this.#author.getName() // Convert author to plain text
		};
	}
	// Method to print book details
	printDetails(): string {
		return `Title: ${this.#title}, IBAN: ${this.#iban}, Author: ${this.#author.getName()}`;
	}
}

type Body = {
	author: string;
	title: string;
	iban: string;
};

interface Methods {
	books: Book[];
	read: () => object[]; // Retrieve all books
	find: (iban: string) => object | undefined; // Find book by IBAN
	update: (iban: string, body: Partial<Body>) => string; // Update book by IBAN
	delete: (iban: string) => string | undefined; // Delete book by IBAN
	create: (body: Body) => string; // Create a new book
}

class Handler implements Methods {
	books: Book[] = []; // Initialize the books array

	// Create method to add a new book
	create(body: Body): string {
		const author = new Author(body.author);
		const book = new Book(body.title, body.iban, author);
		this.books.push(book);
		return "Book created successfully: " + book.printDetails();
	}

	// Read method to retrieve all books
	read(): object[] {
		return this.books.map((book) => book.toPlainObject());
	}
	findBook(iban: string): Book | undefined {
		return this.books.find((b) => b.getIban() === iban);
	}
	// Find method to search for a book by IBAN
	find(iban: string): object | undefined {
		const book = this.findBook(iban);
		return book?.toPlainObject() || undefined;
	}

	// Update method to update a book by IBAN
	update(iban: string, body: Partial<Body>): string {
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
	delete(iban: string): string | undefined {
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
