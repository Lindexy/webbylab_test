const User = require("../../db/index").models.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class Controller {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw new Error("User not found");
            }
            const isPassEquals = await bcrypt.compare(password, user.password);
            if (!isPassEquals) {
                throw new Error("Wrong password");
            }
            const payload = {
                id: user.id,
                email: user.email,
                name: user.name,
            };
            const token = jwt.sign({ payload }, process.env.JWT_ACCESS_SECRET, {
                expiresIn: "1h",
            });

            res.json({ token, status: 1 });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new Controller();
