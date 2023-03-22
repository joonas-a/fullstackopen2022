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

module.exports = { dummy, totalLikes, favoriteBlog }
