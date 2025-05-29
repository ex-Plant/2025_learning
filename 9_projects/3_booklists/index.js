window.onload = function () {
  console.log(`app started!`);
  bookList.init();
};

function capitalizeName(author) {
  const authArr = !author ? [] : author.split(" ");

  for (let i = 0; i < authArr.length; i++) {
    let string = authArr[i];
    let firstLetter = string[0].toUpperCase();
    string = firstLetter + string.substring(1);
    authArr.splice(i, 1, string);
  }


  return authArr.join(" ") || "Book author";
}

function capitalizeTitle(title) {
  const firstTitleLetter = title[0];
  return(firstTitleLetter && firstTitleLetter.toUpperCase() + title.substring(1)) ?? "Unknown Book title";
}

function createListContent (author, title) {

  const authorCapitalized = capitalizeName(author);
  const titleCapitalized = capitalizeTitle(title)

  return `<div class='book_list_item grid grid-cols-12 w-full divide-y items-center'>
          <span class='book_list_item_name col-span-3'>${authorCapitalized}</span>
          <span class='book_list_item_title col-span-3'>${titleCapitalized}</span>
          <button class=' book_list_item_delete col-span-2'>-</button>
          <button class='book_list_item_up col-span-2'>+1</button>
          <button class='book_list_item_down col-span-2'>-1</button>
        </div>`
}


function moveUp(li, books) {
  console.log('move up');

  const searchedItemIndex = books.findIndex(book => book.id === Number(li.id))
  const searchedItem =  books[searchedItemIndex]
  const previousItem = books[searchedItemIndex -1 ];
  const firstItem = searchedItemIndex === 0;

  if (firstItem) {
   alert(`this is as high as it gets!`)
    return
  }

  // start at search item - 1 remove two, insert searched and previous
  books.splice(searchedItemIndex - 1, 2, searchedItem, previousItem )
  const liElements = document.querySelectorAll(`ul.bookList div.book_list_item`)
  liElements.forEach(li => li.remove() )
  books.forEach((book) => {
    appendBookLiToBookList(book)
  })
  storage.saveBooks(books)
}


function moveDown(li, books) {
  console.log('move down');

  const searchedItemIndex = books.findIndex(book => book.id === Number(li.id))
  const searchedItem =  books[searchedItemIndex];
  const nextItem = books[searchedItemIndex  + 1 ];
  const lastItem = searchedItemIndex >= books.length - 1

  if (lastItem) {
    alert(`this is as low as it gets!`)
    return
  }

  // start at search item remove two, insert next and searched
  books.splice(searchedItemIndex, 2, nextItem, searchedItem )

  const liElements = document.querySelectorAll(`ul.bookList div.book_list_item`)
  liElements.forEach(li => li.remove() )

  books.forEach((book) => {
    appendBookLiToBookList(book)
  })
  storage.saveBooks(books)

}

function appendBookLiToBookList(book) {
  const { title, author } = book;

  const newLi = document.createElement(`li`);
  newLi.innerHTML  = createListContent(author, title);
  newLi.id = book.id;
  newLi.style.cursor = `pointer`;
  bookList.booksUl.appendChild(newLi);

  const upBtn = newLi.querySelector('.book_list_item_up');
  upBtn.addEventListener('click', () => {
    moveUp(newLi, bookList.books)
  });

  const downBtn = newLi.querySelector('.book_list_item_down');
  downBtn.addEventListener('click', () => {
    moveDown(newLi, bookList.books)
  });

  const deleteBtn = newLi.querySelector('.book_list_item_delete');
  deleteBtn.addEventListener('click', () => {
    bookList.deleteBook(newLi.id)
    bookList.booksUl.removeChild(newLi);
  });
}


class Book {
  constructor(author, title) {
    this.id = Date.now();
    this.author = author;
    this.title = title;
  }
}

class BookList {
  constructor() {
    this.books = [];
    this.addBtn = undefined;
    this.delBtn = undefined;
    this.dialog = undefined;
  }

  init = () => {
    this.form = document.querySelector("form");
    this.addBtn = document.getElementById(`addBtn`);
    this.delBtn = document.getElementById(`delBtn`);
    this.dialog = document.getElementById(`dialog`);
    this.booksUl = document.querySelector(`ul.bookList`);
    this.authorInput = document.querySelector(`#author`);
    this.titleInput = document.querySelector(`#title`);

    this.books = storage.getBooks()
    this.books.forEach((book) => {
      appendBookLiToBookList(book)
    })

    this.addBtn.addEventListener("click", () => this.dialog.open = true);
    this.form.addEventListener("submit", this.handleSubmit)
    console.log(bookList.books);


  };


  handleSubmit = () => {
    const book = new Book(this.authorInput.value, this.titleInput.value);

    this.books = [...this.books, book];
    storage.saveBooks(this.books);
    appendBookLiToBookList(book)

    bookList.dialog.open = false;

    this.titleInput.value = "";
    this.authorInput.value = "";
    this.id = Date.now();
  }


  deleteBook = (id) => {
    this.books = this.books.filter((b) => b.id !== Number(id));
    storage.saveBooks(this.books);
  };
}

class Storage {
  saveBooks = (books) => {
    localStorage.setItem(`books`, JSON.stringify(books));
  };

  getBooks = () => {
    const books = localStorage.getItem(`books`);
    if (!books) return [];
    return JSON.parse(books) ?? [];
  };
}

const storage = new Storage();
const bookList = new BookList();
