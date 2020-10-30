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
	const newCard = document.createElement("div");
	
	// Creates all the visible text describing the book
	const p = document.createElement('p');
	newCard.className = "bookCard";
	newCard.setAttribute("data-index", `${arrayIndex}`);
	p.textContent = `${myLibrary[arrayIndex].title} by ${myLibrary[arrayIndex].author}, ${myLibrary[arrayIndex].pageCount} pages, ${myLibrary[arrayIndex].haveRead ? "completed" : "not read yet"}`;
	newCard.appendChild(p);

	// Creates and powers the read/not read button
	const readBtn = document.createElement('button');
	readBtn.type = "button";
	readBtn.textContent = "Read?";
	readBtn.addEventListener('click', () => {
		myLibrary[arrayIndex].haveRead = !myLibrary[arrayIndex].haveRead;
		p.textContent = `${myLibrary[arrayIndex].title} by ${myLibrary[arrayIndex].author}, ${myLibrary[arrayIndex].pageCount} pages, ${myLibrary[arrayIndex].haveRead ? "completed" : "not read yet"}`;
	});
	newCard.appendChild(readBtn);

	// Adds everything to the html
	container.appendChild(newCard);

	/* TODO
		- Add a data-attribute to the div that corresponds the the index of the library array.
			i.e. data-index="i"
			I will ultimately be able to delete books from the library. I don't want to refresh,
			so I will need the data-index attribute to upload after every deletion. Should be fine.
		- Add a delete button to the bottom of each book div that will read the data-index
			of the book div and hunt it down in myLibrary a remove it. It will then cycle
			through all the book divs updating their data-index
		- Add a read/unread toggle button to the bottom of each book div.
			I will need an event listener outside of the function where the button is created.
			This means that I will need to listen for all of the class of readBtns. When
			one is pressed, I will need to identify which one that is and then use the data-index
			to go in and edit the myLibrary entry. I will then nee to edit the html to reflect
			the change.
	*/
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

		// Replaced the removed "Add a New Book" button.
		document.querySelector("#newBook").appendChild(btn);
	});
});

