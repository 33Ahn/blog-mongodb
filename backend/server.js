const express = require("express")
const app = express()

const port = process.env.PORT || 5000



app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/posts", require("./routes/postRoutes"))

app.listen(port, () => {
    console.log(`Server started on ${port}`)
})