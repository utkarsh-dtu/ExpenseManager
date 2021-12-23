const mongoose = require("mongoose");

const sampleSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  rollNumber: {
    type: Number,
    require: true,
  },

  Age: {
    type: Number,
    require: true,
  },
});

const Sample = mongoose.model("Sample", sampleSchema);
module.exports = Sample;
