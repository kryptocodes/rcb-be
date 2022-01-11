import { Router, Response } from "express";
import { check, validationResult } from "express-validator/check";
import jwt from "jsonwebtoken";
import Request from "../types/Request";
import User, { IUser } from "../models/User";
import { sendEmail } from "../middleware/mailer";

import { getStatus } from "../controllers/Status";
import { getUserByEmail } from "../controllers/Status";

const router: Router = Router();

router.post(
    "/enter",[
        check("email").isEmail(),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email } = req.body;
        try {
            let user: IUser = await User.findOne({ email });
    

            const userFields = {
                email: email,
            }


            user = new User(userFields);
            await user.save()
            console.log(email)
            const payload = {
              email: user.email,
            };
           res.status(200).json({
            msg: "User created",
           })
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
)



router.post(
    "/status",
    [
        check("email").isEmail(),
    ],
    async (req: Request, res: Response) => {
         // print the user object
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email } = req.body;
        try {
            let user: IUser = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ msg: "User not found" });
            }
            const payload = {
                email: user.email,
            };
            res.status(200).json({
                user
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
)

export default router;