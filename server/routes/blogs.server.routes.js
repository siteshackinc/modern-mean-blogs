'use strict';

import passport from 'passport';
import express from 'express';
import * as blogs from '../controllers/blogs.server.controller';
import chalk from 'chalk';

function init(app) {
  return new Promise(function (resolve, reject) {
    console.log(chalk.bold.green('Blogs::Routes::Start'));

    try {
      let router = express.Router();

      router.route('/')
        .get(blogs.list)

      router.route('/:blogId')
        .get(blogs.read)

      router.param('blogId', blogs.blogByID);
      app.use('/api/blogs', router);

      console.log(chalk.bold.green('Blogs::Routes::Success'));

      resolve(app);
    }
    catch(err) {
      reject(err);
    }
  });
}

export default init;
