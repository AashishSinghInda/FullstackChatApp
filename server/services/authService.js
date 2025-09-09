import jwt from "jsonwebtoken";



export const generateAccessToken = (user)=>{
   
    
    return jwt.sign(
        {userId : user._id.toString(), 
        email : user.email},
        process.env.JWT_SECRET_KEY,
        {expiresIn : "1m"} 
    )
}   


export const generateRefreshToken = (user)=>{
    return jwt.sign(
        {userId : user._id.toString(), email : user.email},
        process.env.JWT_REFRESH_SECRET_KEY ,
        {expiresIn : "5d"}  // yaha per bhi update kiya hai 
        
       
    )                                           
}





























































/* export const generateAccessToken = (user)=>{
    return jwt.sign(
        {id : user._id, email : user.email},
        process.env.JWT_SECRET_KEY,
        {expiresIn : "1m"}
    )
}   


export const generateRefreshToken = (user)=>{
    return jwt.sign(
        {id : user._id, email : user.email},
        process.env.JWT_REFRESH_SECRET_KEY ,
        {expiresIn : "2m"}
       
    )                                           
}


export const refreshAccessTokenService = async (refreshToken,userModel) =>{
    if(!refreshToken){
        throw new Error ("Refresh token required!")
    }
    try{
        const decoded = jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET_KEY)

        const  user = await userModel.findById(decoded.id)
        if(!user || user.refreshToken !== refreshToken){
            throw new Error("Invalid refresh token")
        }

        const newAccessToken = generateAccessToken(user)
        const newRefreshToken = generateRefreshToken(user)

      
        
        user.refreshToken  = newRefreshToken
        await user.save();

        return {accessToken : newAccessToken , refreshToken : newRefreshToken}
    }

    catch(error){
        throw new Error("Invalid or expired refresh token")
    }
    

}  */




  /*  const decoded = jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET_KEY)

    const user = await userModel.findById(decoded.id)
    if(!user || user.refreshToken !== refreshToken){
        throw new Error ("Invalid Refresh token")
    }

    const newAccessToken = generateAccessToken(user)

    return {accessToken : newAccessToken}  */ 