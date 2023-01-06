const mongoose = require('mongoose');

const URL = process.env.MONGODB_URI;

(function() {
  console.log(`connecting to ${URL}`);

  mongoose.connect(URL)
    .then(() => {
      console.log('connected to mongodb');
    }).catch((err) => {
      console.log(`failed to connect to mongodb: ${err.message}`);
    });
})();

const recordSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: (val) => /^\d{0,3}-{0,1}\d+$/.test(val),
      message: (props) => `(${props.value}) is not a valid phone number`,
    },
    required: true,
  },
});

recordSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Record', recordSchema);