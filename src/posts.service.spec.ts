import { Post, PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;
  const post: Omit<Post, 'id' | 'date'> = {
    text: 'Mocked post',
  };

  beforeEach(async () => {
    postsService = new PostsService();

    postsService.create({ text: 'Some pre-existing post' });
  });

  it('should add a new post', () => {
    const testPost = postsService.create(post);
    expect(testPost).toMatchObject({
      id: expect.any(String),
      text: post.text,
      date: expect.any(String),
    });

    const testDate = new Date(testPost.date);
    expect(testDate).toBeInstanceOf(Date);
  });

  it('should find a post', () => {
    const testPost = postsService.create(post);
    const foundPost = postsService.find(testPost.id);
    expect(foundPost).toEqual(testPost);

    expect(foundPost?.text).toEqual(post.text);
  });
});
