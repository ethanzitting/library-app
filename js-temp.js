// This is the primary array containing the library.
let myLibrary = [];

// Here is the constructor for making all of the Book objects.
function Book(title, author, pageCount, haveRead) {
	this.title = title;
	this.author = author;
	this.pageCount = pageCount;
	this.haveRead = haveRead;
	this.info = function() {
		return `${title} by ${author}, ${pageCount} pages, ${haveRead ? "read already" : "not read yet"}`;
	}
}

// Adds some starting books to work with
myLibrary.push(new Book("The Hobbit", "J. R. R. Tolken", 200, true));
myLibrary.push(new Book("Harry Potter", "J. K. Rowling", 200, true));
myLibrary.push(new Book("Models", "Mark Mason", 200, true));

// DOM manipulation begins
const container = document.querySelector("#container");

// Adds books in myLibrary to the DOM
function showBook(arrayIndex) {
	newCard = document.createElement("div");
	newCard.className = "bookCard";
	newCard.textContent = `${myLibrary[arrayIndex].title} by ${myLibrary[arrayIndex].author}, ${myLibrary[arrayIndex].pageCount} pages, ${myLibrary[arrayIndex].haveRead ? "completed" : "not read yet"}`;
	container.appendChild(newCard);
}

// Loops through library, adding the books to the DOM
for (let i = 0; i < myLibrary.length; i++) {
	showBook(i);
}

// Listens for new book button and adds form.
const btn = document.querySelector("#newBookBtn");

// Creates the input fields when a user wants to add a new book.
function addInputField(parentID, fieldID, fieldPlaceholder) {
	inputField = document.createElement("input");
	inputField.id = `${fieldID}`;
	inputField.type = "text";
	inputField.placeholder = `${fieldPlaceholder}`;
	parentID = document.querySelector(`${parentID}`);
	parentID.appendChild(inputField);
	parentID.appendChild(document.createElement("br"));
	return inputField;
}

// Executes the changes to the DOM and catches user's input for new books.
btn.addEventListener('click', () => {
	btn.parentNode.removeChild(btn);
	const formArea = document.querySelector("#newBook");

	const form = document.createElement("form");
	form.id = "newBookForm";
	formArea.appendChild(form);

	titleInput = addInputField("form", "titleInput", "Book Title");
	authorInput = addInputField("form", "authorInput", "Book Author");
	pageCountInput = addInputField("form", "pageCountInput", "Book Page Count");
	haveReadInput = addInputField("form", "haveReadInput", "Have you finished it?");

	const submitBtn = document.createElement("button");
	submitBtn.id = "submitBtn";
	submitBtn.type = "button";
	submitBtn.textContent = "Add Book";
	form.appendChild(submitBtn);

	// Adds user input to myLibrary and resets form area
	submitBtn.addEventListener('click', () => {
		console.log(titleInput);
		myLibrary.push(new Book(titleInput.value, authorInput.value, pageCountInput.value, haveReadInput.value));
		showBook(myLibrary.length - 1);

		while (newBook.firstChild) {
			newBook.removeChild(newBook.firstChild);
		}

		document.querySelector("#newBook").appendChild(btn);
	});
});

