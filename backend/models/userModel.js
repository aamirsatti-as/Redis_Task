const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;

// Define Joi schema for validation
const userJoiSchema = Joi.object({
  _id: Joi.any(),
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email',
    'string.empty': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
  }),
  address: Joi.string().messages({
    'string.base': 'Address must be a string',
  }),
});

// Define the User schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  }
}, {
  timestamps: true
});

// Joi validation middleware for Mongoose
userSchema.pre('validate', function(next) {
  const { error } = userJoiSchema.validate(this.toObject(), { abortEarly: false });
  if (error) {
    // Handle Joi validation error
    const validationErrors = error.details.map(detail => ({
      message: detail.message.replace(/['"]/g, ''), // Remove quotes and double quotes
      path: detail.path.join('.'),
    }));
    
    next(new Error(JSON.stringify(validationErrors)));
  } else {
    next();
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // Define the User schema
// const userSchema = new Schema({
//   name: {
//     type: String,
//   },
//   email: {
//     type: String,
//     unique: true,
//   },
//   password: {
//     type: String,
//   },
//   address: {
//     type: String,
//   }
// }, {
//   timestamps: true
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;
