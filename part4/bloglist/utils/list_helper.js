function dummy() {
  return 1;
}

function totalLikes(blogs) {
  const reducer = (acc, { likes }) => acc + likes;
  return blogs.reduce(reducer, 0);
}

function favoriteBlog(blogs) {
  if (blogs.length === 0) {
    return;
  }
  let blog = { likes: Number.MIN_SAFE_INTEGER };
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i]['likes'] > blog['likes']) {
      blog = {
        title: blogs[i]['title'],
        author: blogs[i]['author'],
        likes: blogs[i]['likes'],
      };
    }
  }
  return blog;
}

function mostBlogs(blogs) {
  if (blogs.length === 0) {
    return;
  }
  const hMap = new Map();
  const author = {
    author: '',
    blogs: 0,
  };
  for (let i = 0; i < blogs.length; i++) {
    if (hMap.has(blogs[i]['author'])) {
      hMap.set(blogs[i]['author'], hMap.get(blogs[i]['author']) + 1);
    } else {
      hMap.set(blogs[i]['author'], 1);
    }
    if (hMap.get(blogs[i]['author']) > author['blogs']) {
      author.author = blogs[i]['author'];
      author.blogs = hMap.get(blogs[i]['author']);
    }
  }
  return author;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};