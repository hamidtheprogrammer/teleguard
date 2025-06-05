import jwt from "jsonwebtoken";
const createToken = ({ res, userId, isLoggedIn }) => {
    // secret key to verify integrity of hash
    const key = process.env.SECRET_KEY;
    //SIgn token using user's role and id
    const token = jwt.sign({ userId, isLoggedIn }, key, {
        expiresIn: "30d",
    });
    //attach token to response cookie header
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 84000000,
    });
};
export default createToken;
