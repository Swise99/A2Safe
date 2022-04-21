const mongoose= require("mongoose");
express = require("express");
layouts = require("express-ejs-layouts");
const methodOverride = require("method-override");


app = express();
homeController = require("./controllers/homeController");

require("dotenv").config();

const uri = process.env.ATLAS_URI;

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(layouts)
app.use(express.static("public"));
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());
app.use(homeController.logRequests);
app.use(
    methodOverride("_method", {
        methods: ["POST", "GET"]
    })
);

console.log(uri);

mongoose.connect(uri, { useUnifiedTopology: true });

const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose");
});

app.get(
    "/home", 
    homeController.getAllBooks,
    (req, res, next) => {
        console.log(req.data),
        res.render("homePage", { "books": req.data });
    }
);
app.get(
    "/books/:bookNum",
    homeController.respondWithBookInfo,
    (req, res, next) => {
        console.log(req.data),
        res.render("books", { "book": req.data });
    }
);


app.get(
    "/AddNewBook",
    homeController.bookAdder
)

app.post(
    "/AddNewBookSend",
    homeController.bookAdding
)

app.get(
    "/DeleteABook",
    homeController.prepForDelete,
    (req, res, next) => {
        console.log(req.data),
        res.render("delbook", { "books": req.data });
    }
)
app.delete(
    "/DeleteABook/:numId/delete",
    homeController.delete
)
app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});
