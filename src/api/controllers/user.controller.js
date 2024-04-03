const User = require("../../db/index").models.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class Controller {
    async registration(req, res) {
        try {
            const { password, confirmPassword, name } = req.body;
            if (password !== confirmPassword) {
                res.status(400).json({ message: "Password mismatch" });
            }

            const rawEmail = req.body.email;
            const email = rawEmail.toLocaleLowerCase();

            const candidate = await User.findOne({ where: { email } });
            if (candidate) {
                res.status(400).json({
                    message: `User with email ${email} already exist`,
                });
            }
            const hashPassword = await bcrypt.hash(password, 3);
            const user = await User.create({
                email,
                name,
                password: hashPassword,
            });

            const token = jwt.sign(
                { email, name },
                process.env.JWT_ACCESS_SECRET,
                {
                    expiresIn: "1h",
                }
            );

            res.json({ token, status: 1 });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new Controller();
