import express, { Request, Response } from "express";
import { handler } from "./Book.js";

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Route to get all books
app.get("/", (req: Request, res: Response) => {
	try {
		const books = handler.read();
		res.status(200).json(books); // Send books as JSON
	} catch (error) {
		res.status(500).send("Failed to retrieve books");
	}
});
// Route to get one specific book
app.get("/books/:iban", (req: Request, res: Response) => {
	try {
		const iban: string = req.params.iban;
		const book = handler.find(iban); // Use find method to get the book
		if (!book) {
			res.status(404).send("Book not found"); // Send 404 if no book is found
		}
		res.status(200).json(book); // Send book as JSON
	} catch (error) {
		res.status(404).send("Book not found"); // Send 404 if no book is found
	}
});
// Route to get one specific book
app.delete("/books/:iban", (req: Request, res: Response) => {
	try {
		const iban: string = req.params.iban;
		const book = handler.delete(iban); // Use find method to get the book
		if (!book) {
			res.status(404).send("Book not found"); // Send 404 if no book is found
		}
		res.status(200).json(book); // Send book as JSON
	} catch (error) {
		res.status(404).send("Book not found"); // Send 404 if no book is found
	}
});
// Route to get one specific book
app.patch("/books/:iban", (req: Request, res: Response) => {
	try {
		const iban: string = req.params.iban;
		const body = req.body;
		const book = handler.update(iban, body); // Use find method to get the book
		if (!book) {
			res.status(404).send("Book not found"); // Send 404 if no book is found
		}
		res.status(200).json(book); // Send book as JSON
	} catch (error) {
		res.status(404).send("Book not found"); // Send 404 if no book is found
	}
});
// Route to create a new book
app.post("/create", (req: Request, res: Response) => {
	try {
		const message = handler.create(req.body); // Create the book
		res.status(201).send(message); // Send success message
	} catch (error) {
		res.status(400).send("Error creating book");
	}
});

// Start the server
app.listen(port, () => {
	console.log(`Express is listening at http://localhost:${port}`);
});
