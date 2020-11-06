
// This is the primary array containing the library.
let myLibrary = [];

// Here is the constructor for making all of the Book objects.
class Book {
	constructor(title, author, pageCount, haveRead) {
		this.title = title;
		this.author = author;
		this.pageCount = pageCount;
		this.haveRead = haveRead;
	}
	get info() {
		return `${title} by ${author}, ${pageCount} pages, ${haveRead === true ? "Finished" : "Not Finished"}`;
	}
}

// Adds some starting books to work with
myLibrary.push(new Book("The Hobbit", "J. R. R. Tolken", 200, true));
myLibrary.push(new Book("Harry Potter", "J. K. Rowling", 200, true));
myLibrary.push(new Book("Models", "Mark Mason", 200, true));
myLibrary.push(new Book("Greenlights", "Matthew McConaughey", 200, false));
myLibrary.push(new Book("A Promised Land", "Barack Obama", 200, false));
myLibrary.push(new Book("The Food Lab", "J. Kenji Lopez-Alt", 200, false));

// DOM manipulation begins
const container = document.querySelector("#container");

// Adds books in myLibrary to the DOM
function showBook(arrayIndex) {
	const newCard = document.createElement("div");
	
	// Creates all the visible text describing the book
	const p = document.createElement('p');
	newCard.className = "bookCard";
	newCard.setAttribute("data-index", `${arrayIndex}`);
	p.textContent = `${myLibrary[arrayIndex].title} by ${myLibrary[arrayIndex].author}, ${myLibrary[arrayIndex].pageCount} pages, ${myLibrary[arrayIndex].haveRead === true ? "Finished" : "Not Finished"}`;
	newCard.appendChild(p);

	// Creates and powers the read/not read button
	const readBtn = document.createElement('button');
	readBtn.type = "button";
	readBtn.textContent = "Read?";
	readBtn.addEventListener('click', () => {
		myLibrary[arrayIndex].haveRead = !myLibrary[arrayIndex].haveRead;
		p.textContent = `${myLibrary[arrayIndex].title} by ${myLibrary[arrayIndex].author}, ${myLibrary[arrayIndex].pageCount} pages, ${myLibrary[arrayIndex].haveRead === true ? "Finished" : "Not Finished"}`;
	});
	newCard.appendChild(readBtn);

	// Creates Delete button
	const deleteBtn = document.createElement('button');
	deleteBtn.type="button";
	deleteBtn.textContent = "Delete";
	deleteBtn.addEventListener('click', () => {
		// Removes the deleted book from myLibrary
		arrayIndex = myLibrary.findIndex(x => x.title === this.title);
		myLibrary.splice(arrayIndex, 1);

		// Remove book card from HTML
		newCard.parentNode.removeChild(newCard);

		// All the book cards have retained their arrayIndex in memory.
			// This is causing a bug!
		// Update arrayIndeces in HTML
		bookCards = Array.from(document.querySelector("#container").childNodes);
		bookCards.shift();
		console.log(bookCards);
		console.log(`myLibrary.length: ${myLibrary.length}`);
		for (let i = 0; i < myLibrary.length; i++) {
			j = bookCards[i];
			j.setAttribute("data-index", i);
			console.log(j);
		}
		console.log(myLibrary);
		console.table(myLibrary);
	});
	newCard.appendChild(deleteBtn);

	// Adds everything to the html
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
	// Removes the "Add a New Book" button
	btn.parentNode.removeChild(btn);

	// Finds #newBook div and adds a new form into it.
	const formArea = document.querySelector("#newBook");
	const form = document.createElement("form");
	form.id = "newBookForm";
	formArea.appendChild(form);

	// Populates the new form with input fields
	titleInput = addInputField("form", "titleInput", "Book Title");
	authorInput = addInputField("form", "authorInput", "Book Author");
	pageCountInput = addInputField("form", "pageCountInput", "Book Page Count");
	haveReadInput = addInputField("form", "haveReadInput", "Have you finished it?");

	// Adds a submit button to the bottom of the form
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

		// Cleans out all the <br> created by the form generation
		while (newBook.firstChild) {
			newBook.removeChild(newBook.firstChild);
		}
		console.log(myLibrary);
		// Replaced the removed "Add a New Book" button.
		document.querySelector("#newBook").appendChild(btn);
	});
});

