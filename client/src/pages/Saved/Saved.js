import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import axios from 'axios'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 400,
    width: 400
  },
})

const Saved = () => {
  const classes = useStyles()
  const [bookState, setBookState] = useState({
    books: []
  })

  bookState.handleDeleteBook = book => {
    axios.delete(`/api/books/${book._id}`)
      .then(() => {
        const books = JSON.parse(JSON.stringify(bookState.books))
        const booksFiltered = books.filter(bewk => bewk._id !== book._id)
        setBookState({ ...bookState, books: booksFiltered })
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    axios.get('/api/books')
      .then(({ data }) => {
        setBookState({ ...bookState, books: data })
      })
      .catch(err => console.error(err))
  }, [])
  return (
    <div>
      {
        bookState.books.map(book => (
          <Card className={classes.root}>
            
            <CardMedia
              className={classes.media}
              image={book.image}
              title={book.title}
            />
            <CardHeader
              title={book.title}
            />
            <Typography>
              {book.authors}
            </Typography>
            <Typography>
              {book.description}
            </Typography>

            <CardActions>
              <Button
                size="small"
                color="secondary"
                onClick={() => bookState.handleDeleteBook(book)}>
                Delete
                </Button>
              <Button size="small" color="primary" href={book.link}>
                View Book
                </Button>
            </CardActions>
          </Card>
        ))
      }
    </div>
  )
}

export default Saved