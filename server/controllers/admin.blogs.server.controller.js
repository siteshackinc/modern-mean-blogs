'use strict';

import { get as model } from '../models/blogs.server.model.blog';
import mongoose from 'mongoose';

function read(req, res) {
  return res.json(req.model);
}

function create(req, res) {
  let blog = new Blog(req.body);
  
  blog.user = req.user;
  blog.slug = blog.title.toLowerCase().replace(/ /g, '-');
  
  blog.save()
    .then(function (blog) {
    return res.json(blog);
  })
    .catch(function (err) {
    return res.status(400).send(err);
  });
}

function update(req, res) {
  let blog = req.model;
  
  //For security purposes only merge these parameters
  blog.title = req.body.title;
  blog.intro = req.body.intro;
  blog.content = req.body.content;
  blog.image = req.body.image;
  blog.slug = blog.title.toLowerCase().replace(/ /g, '-');
  blog.description = req.body.description;
  blog.keywords = req.body.keywords;
  blog.created = req.body.created;
  
  blog.save()
    .then(function (blog) {
    return res.json(blog);
  })
    .catch(function (err) {
    return res.status(400).send(err);
  });
}

function remove(req, res) {
  let blog = req.model;
  
  blog.remove()
    .then(function (blog) {
    return res.json(blog);
  })
    .catch(function (err) {
    return res.status(400).send(err);
  });
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
  create,
  update,
  remove,
  list,
  blogByID
};