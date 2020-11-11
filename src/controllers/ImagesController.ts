
import { Request, Response } from 'express';

import Post from '../models/Post';
import { File } from '../config/upload';

export default {

  async index (request: Request, response: Response) {
    const posts = await Post.find();

    return response.json(posts);
  },

  async show (request: Request, response: Response) {
    // empty
    return response.json({ _text: 'especific list' });
  },

  async create (request: Request, response: Response) {
    const { originalname: name, size, key, location: url = "" } = <File>request.file;

    const post = await Post.create({
      name,
      size,
      key,
      url
    });

    return response.json(request.file);
  },

  async update (request: Request, response: Response) {
    // empty
    return response.json({ _text: 'update' });
  },

  async delete (request: Request, response: Response) {
    const id = request.params.id;
    const post = await Post.findById(id);

    if (post) {
      await post.remove();
    }

    return response.json({ deleted_id: id });
  },

}
