import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// TEMP database (we will upgrade later)
let users = {};

// Register or login user using Telegram ID
app.post("/auth", (req, res) => {
    const { id, first_name } = req.body;

    if (!users[id]) {
        users[id] = {
            id,
            name: first_name,
            balance: 0,
            energy: 1000,
            miningRate: 1,
            lastTap: Date.now()
        };
    }

    res.json(users[id]);
});

// Tap to earn PI
app.post("/tap", (req, res) => {
    const { id } = req.body;

    if (!users[id]) return res.json({ error: "User not found" });

    users[id].balance += users[id].miningRate;

    res.json(users[id]);
});

app.get("/", (req, res) => {
    res.send("PI Mining backend is running!");
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
