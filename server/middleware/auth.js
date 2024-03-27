import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const JWT_SECRET = 'alobrother'
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({msg:"Authentication Invalid"});
    }

    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = { userName: payload?.userName, userId: payload?.userId};
        next();
    } catch (error) {
        next(error);
    }
};

export default userAuth;