const bookObj=require("../models/bookModel")
exports.logRequests=(req, res , next) => {
    console.log(`request made to: ${req.url}`);
    next();
};

exports.getAllBooks=(req, res , next) => {
    bookObj.find({}, (error, books) => {
        if (error) next(error);
        req.data=books;
        next();
    });
};

exports.respondWithBookInfo=(req, res, next) => {
    let bookNum = req.params.bookNum;
    bookObj.findOne({ numId: bookNum }, (error, book) => {
        if (error) next(error);
        req.data=book;
        next();
    });
};

exports.bookAdder=(req,res, next) => {
    res.render("addbook")
}

exports.bookAdding=(req, res, next) => {
    let newBook=new bookObj({
        bookName:req.body.bookName,
        authorName:req.body.authorName,
        amazonLink:req.body.amazonLink
    });
    newBook.save((error, result) => {
        if (error) res.send(error);
        res.redirect('/home')
    })
}

exports.prepForDelete=(req, res , next) => {
    bookObj.find({}, (error, books) => {
        if (error) next(error);
        req.data=books;
        next();
    });
};

exports.delete=(req, res, next) => {
    let bookId=req.params.numId
    bookObj.findOneAndDelete({ numId: bookId })
    .then(() => {
        res.redirect('/home');
        console.log(`Book with ID: ${bookId} deleted`)
        next();
    })
    .catch(error => {
        console.log(`Error deleting book by ID: ${error.message}`);
        next();
    });
}