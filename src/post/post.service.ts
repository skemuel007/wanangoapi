import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdatePostDto } from './dto/updatePost.dto';
import { CreatePostDto } from './dto/createPost.dto';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRespository: Repository<Post>,
  ) {}

  async getAllPosts(): Promise<Post[]> {
    return await this.postRespository.find();
  }

  async getPostById(id: number): Promise<Post> {
    const post = await this.postRespository.findOneBy({ id });
    if (post) {
      return post;
    }
    throw new HttpException('Post record not found', HttpStatus.NOT_FOUND);
  }

  async updatePost(id: number, post: UpdatePostDto): Promise<Post> {
    await this.postRespository.update(id, post);
    const updatedPost = await this.postRespository.findOneBy({ id });
    if (updatedPost) return updatedPost;
    throw new HttpException('Post record not found', HttpStatus.NOT_FOUND);
  }

  async createPost(post: CreatePostDto): Promise<Post> {
    const newPost = this.postRespository.create(post);
    await this.postRespository.save<Post>(newPost);
    return newPost;
  }

  async deletePost(id: number): Promise<void> {
    const deleteResponse = await this.postRespository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Post record not found', HttpStatus.NOT_FOUND);
    }
  }
}
