const { dummy, totalLikes, favoriteBlog, mostBlogs } = require('../utils/list_helper');

test('dummy fn always return 1', () => {
  const blogs = [];
  expect(dummy(blogs)).toBe(1);
});

describe('list_helper', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
  ];
  const blogList = [
    {
      _id: '5a4227a71b54cbd6234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 8,
      __v: 0
    },
    {
      _id: 'aa7227a71b54cbd6234d111f',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 13,
      __v: 0
    },
    {
      _id: '5a4a7224cbd6234d234d17f8',
      title: '<Useful Title>',
      author: 'Robert C. Martin',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 27,
      __v: 0
    },
  ];

  describe('totalLikes', () => {
    test('when list has only one blog, equals the likes of that', () => {
      const result = totalLikes(listWithOneBlog);
      expect(result).toBe(5);
    });

    test('when list has more than one blog, equals the sum of likes of all blogs', () => {
      const result = totalLikes(blogList);
      expect(result).toBe(48);
    });
  });

  describe('favoriteBlog', () => {
    test('when list has only one blog, returns that blog', () => {
      const result = favoriteBlog(listWithOneBlog);
      expect(result).toEqual({
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5,
      });
    });

    test('when list has more than one blog, returns the blog with max likes', () => {
      const result = favoriteBlog(blogList);
      expect(result).toEqual({
        title: '<Useful Title>',
        author: 'Robert C. Martin',
        likes: 27,
      });
    });
  });

  describe('mostBlogs', () => {
    test('when list has only one blog, returns that blog', () => {
      const result = mostBlogs(listWithOneBlog);
      expect(result).toEqual({
        author: 'Edsger W. Dijkstra',
        blogs: 1,
      });
    });

    test('when list has more than one blog, returns the author with most blogs', () => {
      const result = mostBlogs(blogList);
      expect(result).toEqual({
        author: 'Edsger W. Dijkstra',
        blogs: 2,
      });
    });
  });
});