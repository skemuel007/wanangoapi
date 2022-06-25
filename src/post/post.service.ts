import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Post } from './post.interface';
import { UpdatePostDto } from './updatePost.dto';
import { CreatePostDto } from './createPost.dto';

@Injectable()
export class PostService {
  private lastPostId = 0;
  private posts: Post[] = [];

  getAllPosts() {
    return this.posts;
  }

  getPostById(id: number) {
    const post = this.posts.find((post) => post.id === id);
    if (post) {
      return post;
    }
    throw new HttpException('Post record not found', HttpStatus.NOT_FOUND);
  }

  replacePost(id: number, post: UpdatePostDto) {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex > -1) {
      this.posts[postIndex] = {
        id: id,
        ...post,
      };
      return post;
    }
    throw new HttpException('Post record not found', HttpStatus.NOT_FOUND);
  }

  createPost(post: CreatePostDto) {
    const newPost = {
      id: ++this.lastPostId,
      ...post,
    };
    this.posts.push(newPost);
    return newPost;
  }

  deletePosts(id: number) {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex > -1) {
      this.posts.splice(postIndex, 1);
    } else {
      throw new HttpException('Post record not found', HttpStatus.NOT_FOUND);
    }
  }
}
