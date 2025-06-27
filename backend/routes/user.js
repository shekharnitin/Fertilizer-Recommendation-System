require('dotenv').config();
const express = require("express");
const { Users } = require("../db");
const app = express.Router();
const z = require("zod");
const jwt = require("jsonwebtoken");
const JWT_TOKEN = process.env.TOKEN_AUTH;
// console.log(JWT_TOKEN);
const phoneP = z.string().regex(/^\d{10}$/);
const nameP = z.string();
const passP = z.string().min(6);

app.post("/signup", async (req, res) => {
    const nameValidation = nameP.safeParse(req.body.name);
    const phoneValidation = phoneP.safeParse(req.body.phone);
    const stateValidation = nameP.safeParse(req.body.state);
    const cityValidation = nameP.safeParse(req.body.city);
    const passcodeValidation = passP.safeParse(req.body.password);

    if (!phoneValidation.success) {
        return res.status(400).json({ message: "Phone number must be exactly 10 digits" });
    }

    if (!nameValidation.success || !stateValidation.success || !cityValidation.success) {
        return res.status(400).json({ message: "Input fields cannot be empty or invalid." });
    }

    if (!passcodeValidation.success) {
        return res.status(400).json({ message: "Password must be 6 or more characters long" });
    }

    const sameUser = await Users.findOne({ phone: req.body.phone });

    if (sameUser) {
        return res.status(400).json({ message: "Phone number already taken" });
    }
    try {
        const userCreate = await Users.create({
            name: req.body.name,
            phone: req.body.phone,
            state: req.body.state,
            city: req.body.city,
            password: req.body.password
        });
        const userId = userCreate._id;

        const token = jwt.sign({ phone: req.body.phone }, JWT_TOKEN);
        res.status(200).json({
            message: userId,
            user: req.body.phone,
            token: 'Bearer ' + token
        });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

const signinSchema = z.object({
    phone: z.string().regex(/^\d{10}$/),
    password: z.string().min(6)
});

app.post("/signin", async (req, res) => {
    try {
        const schemaCheck = signinSchema.safeParse(req.body);

        if (!schemaCheck.success) {
            return res.status(400).json({ message: "Incorrect inputs" });
        }

        const { phone, password } = req.body;
        const user = await Users.findOne({ phone, password });

        if (!user) {
            return res.status(401).json({ message: "Invalid phone number or password" });
        }

        const token = jwt.sign({ userID: user._id }, JWT_TOKEN);
        res.status(200).json({
            token: 'Bearer ' + token,
            user: req.body.phone,
        });
    } catch (error) {
        console.error("Signin error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/*Under Work
const updateSchema = z.object({
    password: z.string().optional(),
    lastName: z.string().optional(),
    firstName: z.string().optional()
});

app.put("/", authMiddleware, async (req, res) => {
    const updateSuccess = updateSchema.safeParse(req.body);

    if (updateSuccess.success) {
        await Users.updateOne({ _id: req.userId }, req.body);
        res.status(200).json({ message: "Updated successfully" });
    } else {
        res.status(400).json({ message: "Error while updating information" });
    }
});
*/
module.exports = app;
