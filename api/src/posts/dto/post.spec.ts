import { Post } from './post.dto';

describe('Post', () => {
  it('should be defined', () => {
    expect(new Post()).toBeDefined();
  });
});
