import connectDB from "@/db/connectdb";
import User from "@/models/User";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const { handlers, auth } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      checks: ["none"], // fix PKCE issue
      authorization: {
        params: {
          prompt: "login", // always ask GitHub account
        },
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "github") {
        try {
          await connectDB();

          // ✅ handle missing email + make unique
          const email =
            user.email ||
            `${user.name}_${account.providerAccountId}@github.com`;

          let currentUser = await User.findOne({ email });

          if (!currentUser) {
            await User.create({
              email,
              username: user.name || "user",
            });
          }

          return true;
        } catch (error) {
          console.log("DB Error:", error);

          // ✅ IMPORTANT: still allow login even if DB fails
          return true;
        }
      }

      return true;
    },

    async session({ session }) {
      try {
        await connectDB();

        const dbUser = await User.findOne({
          email: session.user.email,
        });

        if (dbUser) {
          session.user.name = dbUser.username;
        }

        return session;
      } catch (error) {
        console.log("Session Error:", error);
        return session;
      }
    },
  },
});

export const { GET, POST } = handlers;

// import connectDB from "@/db/connectdb";
// import User from "@/models/User";
// import NextAuth from "next-auth";
// import GitHubProvider from "next-auth/providers/github";

// export const { handlers, auth } = NextAuth({
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//   ],

//   callbacks: {
//     async signIn({ user, account }) {
//       if (account.provider === "github") {
//         await connectDB();

//         let currentUser = await User.findOne({
//           email: user.email,
//         });

//         if (!currentUser) {
//           currentUser = await User.create({
//             email: user.email,
//             username: user.email.split("@")[0],
//           });
//         }

//         return true;
//       }
//       return false;
//     },

//     async session({ session }) {
//       await connectDB();

//       const dbUser = await User.findOne({
//         email: session.user.email,
//       });

//       console.log(dbUser);

//       if (dbUser) {
//         session.user.name = dbUser.username;
//       }

//       return session;
//     },
//   },
// });

// export const { GET, POST } = handlers;



