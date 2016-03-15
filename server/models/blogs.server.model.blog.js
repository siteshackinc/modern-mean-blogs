'use strict';

import mongoose from 'mongoose';
import chalk from 'chalk';

let Schema = mongoose.Schema;

// User Schema
let BlogSchema = new Schema({
  created: {
      type: Date,
      default: Date.now
    },
    updated: {
      type: Date,
      default: Date.now
    },
    slug: {
      type: String,
      default: '',
      trim: true
    },
    title: {
      type: String,
      default: '',
      trim: true,
      required: 'Title cannot be blank'
    },
    intro: {
      type: String,
      trim: true,
      default: ''
    },
    content: {
      type: String,
      default: '',
      trim: true
    },
    image: {
      type: String,
      trim: true,
      default: ''
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    keywords: {
      type: String,
      trim: true,
      default: ''
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User'
    }
});


function init() {
  return new Promise(function (resolve, reject) {
    let model = mongoose.model('Blog', BlogSchema);
    resolve(model);
  });
}

function get() {
  return mongoose.model('Blog');
}


let blogModel = { init: init, get: get, schema: BlogSchema };

export default blogModel;
export { init, get, BlogSchema as schema };
