import {
  loadFromStorage,
  saveToStorage,
  getRandomIntInclusive,
  makeId,
} from './util.service.js'
const BOOK_KEY = 'bookDB'

function fixThumbnailUrl(url) {
  if (!url) return 'https://via.placeholder.com/128x192?text=No+Image'
  return url.startsWith('http://') ? url.replace('http://', 'https://') : url
}

export const googleBookService = {
  googleQuery,
  addGoogleBook,
  convertGoogleBookToLocalBook,
}

function googleQuery(txt) {
  const GOOGLE_BOOKS_API = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${txt}`

  return fetch(GOOGLE_BOOKS_API)
    .then((res) => res.json())
    .then((data) => {
      if (!data.items) return []

      return data.items.map((item) => {
        const info = item.volumeInfo
        console.log('item:', item)

        return {
          id: info.id,
          title: info.title || 'No Title',
          authors: info.authors || [],
          thumbnail: fixThumbnailUrl(
            (info &&
              info.imageLinks &&
              (info.imageLinks.thumbnail || info.imageLinks.smallThumbnail)) ||
              ''
          ),
        }
      })
    })
}

function addGoogleBook(googleBook) {
  const books = loadFromStorage(BOOK_KEY || [])

  const exists = books.some((book) => book.id === googleBook.id)
  if (exists) return Promise.reject('Book already exists')

  books.push(googleBook)
  saveToStorage(BOOK_KEY, books)
  return Promise.resolve(googleBook)
}

export function convertGoogleBookToLocalBook(googleBook) {
  const info = googleBook.volumeInfo || googleBook
  console.log('googleBook:', googleBook)

  return {
    id: googleBook.id || makeId(),
    title: info.title || 'No Title',
    subtitle: info.subtitle || '',
    authors: info.authors || ['Unknown'],
    publishedDate: info.publishedDate || '2020',
    description: info.description || 'No description',
    pageCount: info.pageCount || 0,
    categories: info.categories || ['General'],
    thumbnail: info.thumbnail,

    language: info.language || 'en',
    listPrice: {
      amount: getRandomIntInclusive(20, 100),
      currencyCode: 'USD',
      isOnSale: Math.random() > 0.5,
    },
  }
}
