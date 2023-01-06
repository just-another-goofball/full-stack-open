const mongoose = require('mongoose');

const URL = process.env.MONGODB_URI;

(function() {
  console.log(`connecting to ${URL}`);

  mongoose.connect(URL)
    .then((res) => {
      console.log('done');
    }).catch((err) => {
      console.log(`failed to connect to mongodb: ${err.message}`);
    });
})();

const recordSchema = new mongoose.Schema({
  name: String,
  number: String,
});

recordSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Record', recordSchema)