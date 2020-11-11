
import { Request, Response } from 'express';

import Post from '../models/Post'; //mongoDB Post database
import { File } from '../config/upload';

export default {

  async index (request: Request, response: Response) {
    try {
      const posts = await Post.find();

      return response.json(posts);
    }
    catch(error) {
      return response.status(500).json({ error: 'Error to list files' });
    }
  },

  async show (request: Request, response: Response) {
    // empty
    return response.json({ _text: 'show especific image' });
  },

  async create (request: Request, response: Response) {
    try {
      const { originalname: name, size, key, location: url = "" } = <File>request.file;

      const post = await Post.create({
        name,
        size,
        key,
        url
      });

      return response.status(201).json(post);
    }
    catch (error) {
      return response.status(400).json({ error: 'Erro to create a new file' });
    }
  },

  async update (request: Request, response: Response) {
    // empty
    return response.json({ _text: 'update an image' });
  },

  async delete (request: Request, response: Response) {
    try {
      const id = request.params.id;
      const post = await Post.findById(id);

      if (!post) {
        return response.status(400).json({ error: 'This file doesn\'t exist' })
      }

      await post.remove();

      return response.sendStatus(200).json({ deleted_id: id });
    } catch (error) {
      return response.status(400).json({ error: 'Error to delete file' });
    }
  },

}
