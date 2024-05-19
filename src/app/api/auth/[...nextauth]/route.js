import nextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Admin from "@/app/models/admin";
import connectToDB from "@/app/database";
import bcrypt from "bcrypt"

async function login(credentials){
    try {
        await connectToDB();
        const admin = await Admin.findOne({username: credentials.username});
        if(!admin){
          console.log("Wrond credentials")
          return
        }
        const isCorrect = await bcrypt.compare(credentials.password,admin.password);
         if(!isCorrect){
         console.log("Wrong Password")
         return
        }

        return {username: admin.username , id : admin._id}


    } catch (error) {
         console.log(error);
    
        return
    }
}



export const authOptions = {
    pages:{
        signIn: "/loginAsAdmin"
       },

    providers: [
        CredentialsProvider({
          name: "credentials",
          credentials: {},
          async authorize(credentials){
            try {
                 const user = await login(credentials);
                 if(user){
                  return user
                 }
                 else{
                    return
                 }
            } catch (error) {
                console.log(error)
                return
            }
          }
        })
    ],

    callbacks:{
        async jwt({token,user}){
            if(user){
                token.id = user.id,
                token.username = user.username
            }
            return token;
        },
        async session({session,token}){
            if(token){
                session.user.username = token.username,
                session.user.id = token.id
            }
            return session;
        }
    }
    }


const handler = nextAuth(authOptions);

export { handler as GET, handler as POST }