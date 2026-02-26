



import connectDB from "@/db/connectdb";
import User from "@/models/User";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const { handlers, auth } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "github") {
        await connectDB();

        let currentUser = await User.findOne({
          email: user.email,
        });

        if (!currentUser) {
          currentUser = await User.create({
            email: user.email,
            username: user.email.split("@")[0],
          });
        }

        return true;
      }
      return false;
    },

    async session({ session }) {
      await connectDB();

      const dbUser = await User.findOne({
        email: session.user.email,
      });

      console.log(dbUser);

      if (dbUser) {
        session.user.name = dbUser.username;
      }

      return session;
    },
  },
});

export const { GET, POST } = handlers;



