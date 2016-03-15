'use strict';

import { get as model } from '../models/blogs.server.model.blog';
import mongoose from 'mongoose';

function read(req, res) {
  return res.json(req.model);
}

function list(req, res) {
  let Blog = model();

  Blog.find().sort('-created').populate('user', 'displayName')
    .then(function (blogs) {
      return res.json(blogs);
    })
    .catch(function (err) {
      return res.status(400).send(err);
    });
}

function blogByID(req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Blog is invalid'
    });
  }

  let User = model();

  Blog.findById(id).populate('user', 'displayName')
    .then(function (blog) {
      if (!user) {
        return next(new Error('Failed to load user ' + id));
      }

      req.model = blog;
      next();
    })
    .catch(function (err) {
      return next(err);
    });
}

export {
  read,
  list,
  blogByID
};
