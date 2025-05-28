import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { cookies as getCookies, headers } from "next/headers";
import { AUTH_COOKIE } from "../constant";
import { loginSchema, registerSchema } from "../schema";

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const h = await headers();

    const session = await ctx.db.auth({ headers: h });

    return session;
  }),

  register: baseProcedure
    .input(registerSchema)
    .mutation(async ({ input, ctx }) => {
      const existingUser = await ctx.db.find({
        collection: "users",
        limit: 1,
        where: {
          username: {
            equals: input.username,
          },
        },
      });

      if (existingUser?.docs?.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username already taken",
        });
      }

      await ctx.db.create({
        collection: "users",
        data: {
          email: input.email,
          username: input.username,
          password: input.password,
        },
      });
    }),

  login: baseProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    const data = await ctx.db.login({
      collection: "users",
      data: {
        email: input.email,
        password: input.password,
      },
    });

    if (!data.token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Failed to login",
      });
    }

    const cookies = await getCookies();
    cookies.set({
      name: AUTH_COOKIE,
      value: data.token,
      httpOnly: true,
      path: "/",
      // sameSite: "none",
      // domain: ""
    });

    return data;
  }),

  logout: baseProcedure.mutation(async () => {
    const cookies = await getCookies();
    cookies.delete(AUTH_COOKIE);
  }),
});
