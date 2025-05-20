import { NextAuthConfig } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

export const defaultAuth: NextAuthConfig = {
  providers: [],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30일
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30일
  },
  callbacks: {
    async jwt({ token, user }) {
      // 최초 로그인시 user 객체가 있음
      if (user) {
        token.id = user.id;
        if ("role" in user) {
          token.role = user.role;
        }
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      // session에 JWT 토큰의 데이터를 추가

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          role: token.role as string,
        },
      };
    },
  },
  trustHost: true,
};
