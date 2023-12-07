const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
 firstName: {
   type: String,
   required: true
 },
 lastName: {
   type: String,
   required: true
 },
 email: {
   type: String,
   required: true,
   unique: true
 },
 password: {
   type: String,
   required: true
 },
 hosting:{
     type:String
 },
 userType:{
  type: [String],
 },
 cloud:{
  type:String
 },
 dataSource:{
  type:String,
 },
 sourceCode:{
  type:String,
 }
});

module.exports = mongoose.model('User', UserSchema);
