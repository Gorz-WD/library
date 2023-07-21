let books = document.getElementById('books')
let addBookForm = document.getElementById('book-form')

let library = []

function Book(title, author, pages, read){
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

Book.prototype.changeReadStatus = function() {
  this.read  === true ? this.read = false : this.read = true
}

const addBookToLibray = (book) => library.push(book)

const displayBooks = () => {
  books.textContent = ''
  library.forEach((book, index) => {
    const card = document.createElement('div')
    const cardTitle = document.createElement('div')
    const cardAuthor = document.createElement('div')
    const cardPages = document.createElement('div')
    const cardReadStatus = document.createElement('div')
    const cardDelete = document.createElement('div')

    card.classList.add('card');
    cardTitle.classList.add('card-title');
    cardAuthor.classList.add('card-author');
    cardPages.classList.add('card-pages');
    cardReadStatus.classList.add('card-read-status');

    cardTitle.textContent = book.title
    cardAuthor.textContent = 'By ' + book.author
    cardPages.textContent = 'Pages: ' + book.pages

    const changeBtn = document.createElement('button')
    changeBtn.textContent  = `${book.read === true ? 'read' : 'not read yet'}`
    changeBtn.addEventListener('click', () => {
      book.changeReadStatus()
      displayBooks()
    })

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'delete'
    deleteBtn.addEventListener('click', () => {
      library.splice(index, 1)
      displayBooks()
    })

    cardReadStatus.appendChild(changeBtn)
    cardDelete.appendChild(deleteBtn)
    card.appendChild(cardTitle)
    card.appendChild(cardAuthor)
    card.appendChild(cardPages)
    card.appendChild(cardReadStatus)
    card.appendChild(cardDelete)
    books.appendChild(card)
  });
}

addBookForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const readStatus = document.getElementById('read-status').checked;
  
  const book = new Book(title, author, pages, readStatus)
  
  library.push(book)
  addBookForm.reset();
  displayBooks();
})

displayBooks()
