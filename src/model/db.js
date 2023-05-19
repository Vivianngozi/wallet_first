import mongoose from "mongoose";
export default {
    connect() {
        mongoose.connect('mongodb://localhost/wallet1', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error: "));
        db.once("open", function () {
            console.log("Connected Successfully");
        });
    }
}