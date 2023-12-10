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
  type: Object,
 },
 userType:{
    type: Object,
    default:{},
    
 },
 cloud:{
  type:String
 },
 dataSource:{
  type:String,
 },
 sourceCode:{
  type:String,
 },
 cloud_img:{
  type:String
 },
 dataSource_img:{
  type:String,
 },
 sourceCode_img:{
  type:String,
 },
 counted:{
  type:Number,
   default: 0 

 },
 infor:{
  type:Number,
  default:0,
  required: true

 }
});

module.exports = mongoose.model('User', UserSchema);
