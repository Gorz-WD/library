const books = document.getElementById('books')
const addBookForm = document.getElementById('book-form')
const formContainer = document.getElementById('form-container')
const addBtn = document.getElementById('add-btn')
const cancel = document.getElementById('cancel')

let library = []

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

Book.prototype.changeReadStatus = function () {
  this.read === true ? this.read = false : this.read = true
}

const addBookToLibray = (book) => library.push(book)

const displayBooks = () => {
  books.textContent = ''
  library.forEach((book, index) => {
    const card = document.createElement('div')
    const cardDelete = document.createElement('div')
    const cardTitle = document.createElement('div')
    const cardAuthor = document.createElement('div')
    const cardPages = document.createElement('div')
    const cardReadStatus = document.createElement('div')


    card.classList.add('card');
    cardTitle.classList.add('card-title');
    cardAuthor.classList.add('card-author');
    cardPages.classList.add('card-pages');
    cardReadStatus.classList.add('card-read-status');
    cardDelete.classList.add('card-delete')

    cardTitle.textContent = book.title
    cardAuthor.textContent = 'By ' + book.author
    cardPages.textContent = 'Pages: ' + book.pages

    const changeBtn = document.createElement('button')
    if (book.read === true) {
      changeBtn.classList.add('read')
    } else {
      changeBtn.classList.add('not-read')
    }
    changeBtn.textContent = `${book.read === true ? 'Read' : 'Not read yet'}`
    changeBtn.addEventListener('click', () => {
      book.changeReadStatus()
      displayBooks()
    })


    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'X'
    deleteBtn.addEventListener('click', () => {
      library.splice(index, 1)
      displayBooks()
    })

    cardReadStatus.appendChild(changeBtn)
    cardDelete.appendChild(deleteBtn)
    card.appendChild(cardDelete)
    card.appendChild(cardTitle)
    card.appendChild(cardAuthor)
    card.appendChild(cardPages)
    card.appendChild(cardReadStatus)

    books.appendChild(card)
  });
}

addBookForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const readStatus = document.getElementById('read-status').checked;

  const book = new Book(title, author, pages, readStatus)

  library.push(book)
  formContainer.style.display = 'none'
  addBookForm.reset();
  displayBooks();
})

addBtn.addEventListener('click', () => formContainer.style.display = 'flex')
cancel.addEventListener('click', () => {
  formContainer.style.display = 'none'
  addBookForm.reset();
})

const book = new Book('Oathbringer', 'Brandon Sanderson', 1248, true)
addBookToLibray(book)

displayBooks()
