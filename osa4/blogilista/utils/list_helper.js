const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}

// return 0 if no blogs
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  const reducer = (mostLiked, item) => {
    return mostLiked.likes > item.likes ? mostLiked : item
  }
  return blogs.reduce(reducer, blogs[0])
}

// group blogs by author and return author with most keys
const mostBlogs = (blogs) => {
  const blogsByWriters = blogs.reduce(function (grouped, blog) {
    grouped[blog.author] = grouped[blog.author] || []
    grouped[blog.author].push(blog)
    return grouped
  }, {})

  let topBlogger = {
    author: "",
    blogs: 0,
  }

  const writerBlogAmounts = Object.keys(blogsByWriters).map((writer) => {
    if (blogsByWriters[writer].length > topBlogger.blogs) {
      topBlogger.author = writer
      topBlogger.blogs = blogsByWriters[writer].length
    }
  })
  return topBlogger
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }
