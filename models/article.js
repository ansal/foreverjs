// an article saved by user

var mongoose = require('mongoose')
  ,Schema = mongoose.Schema
  ,ObjectId = Schema.ObjectId;
 
var ArticleSchema = new Schema({
  user: ObjectId,
  title: String,
  url: String,
  article: String,
  tags: [String],
  date: { type: Date, default: Date.now }
});
 
module.exports.Article = mongoose.model('Article', ArticleSchema);