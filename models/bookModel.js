const mongoose= require("mongoose");
const bookSchema = mongoose.Schema({
    numId: String,
    bookName: String,
    authorName: String,
    amazonLink: String
});
module.exports=mongoose.model("books",bookSchema);
// exports.bookObj = new book({
//     bookName:"",
//     authorName:"",
//     amazonLink:""
// });

