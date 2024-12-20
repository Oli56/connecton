import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import authConfig from "./auth.config"

const prisma = new PrismaClient()
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    callbacks: {
        async jwt({ token}) {
            console.log('Generating JWT token', token)
            return token           
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
             session.user.id = token.sub
            }
            console.log('Generating session', session)
            return session
        }
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
    
})