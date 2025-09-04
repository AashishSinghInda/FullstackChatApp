import jwt from "jsonwebtoken";




export const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY , (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Access token expired" });
      }
      return res.status(403).json({ message: "Invalid access token" });
    }

    req.token = token;
    req.user = decoded;
    next();
  });
};



  /*  export const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access Admin only" });
  }
  next();
    };  */ 




















/* export  const authMiddleware = async (req, res, next) =>{
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(401).json({message : "NO token provided!"})
        }

        const  token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)


          const user =  await userModel.findOne({ _id: decoded.id, token });
        if (!user) {
      return res.status(401).json({ message: "Invalid or expired token" });
          }

        req.user = decoded
        next()
    }
    catch(error){
        res.status(401).json({message : "Invalid or expired token"})
    }
}   */