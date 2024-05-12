const { verifyToken } = require('../services/authentication');

async function restrictToLogin(req, res, next) {
        try {
                const token = req.cookies?.token;
                if (!token) return res.json({ error: "Unauthorized, Access Denied" });
                const user = verifyToken(token);
                if (!user) return res.json({ error: "Unauthorized" });
                req.user = user;
                next();
        } catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
        }
}

async function checkAuth(req, res, next) {
        try {
                const token = req.cookies?.token;
                const user = verifyToken(token);
                req.user = user;
                next();
        } catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
        }
}

module.exports = {
        restrictToLogin,
        checkAuth
};
