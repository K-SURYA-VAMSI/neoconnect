const Counter = require("../models/Counter");

const generateTrackingId = async () => {

 const year = new Date().getFullYear();

 const key = `complaint:${year}`;

 const counter = await Counter.findByIdAndUpdate(
  key,
  { $inc: { seq: 1 } },
  {
   new: true,
   upsert: true,
   setDefaultsOnInsert: true
  }
 );

 const number = String(counter.seq).padStart(3, "0");

 return `NEO-${year}-${number}`;
};

module.exports = generateTrackingId;