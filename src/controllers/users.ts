import { Elysia } from "elysia";
import {
  CreateUserDTO,
  SigninDTO,
  UpdateUserDTO,
  // CreateAppointmentRequest,
} from "../models";
// import { UserResponse, AppointmentResponse } from "../responses/users";
import { Prisma, PrismaClient, users } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { ObjectId } from "bson";
import { auth } from "../db";
import { LuciaError } from "lucia";

export const UsersController = (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
) =>
  new Elysia()
    .decorate("userQuery", {
      include: {
        appointments: {
          select: {
            person_to_meet_info: {
              select: {
                id: true,
                email: true,
                phone: true,
                info: {
                  select: {
                    first_name: true,
                    last_name: true,
                  },
                },
              },
            },
            begin_at: true,
            end_at: true,
          },
        },
        people_to_meet: {
          select: {
            appointment_person_info: {
              select: {
                id: true,
                email: true,
                phone: true,
                info: {
                  select: {
                    first_name: true,
                    last_name: true,
                  },
                },
              },
            },
            begin_at: true,
            end_at: true,
          },
        },
      },
    })
    // .decorate(
    //   "modifyUserResponse",
    //   async (userResponse: users): Promise<UserResponse> => {
    //     return {
    //       id: userResponse.id,
    //       username: userResponse.username,
    //       phone: userResponse.phone,
    //       email: userResponse.email,
    //       info: userResponse.info,
    //       notifications: userResponse.notifications,
    //       appointments: await Promise.all(
    //         userResponse.appointments.map(async (appointment) => {
    //           const appointmentsPopulated: AppointmentResponse = {
    //             id: appointment.id,
    //             user_info: await prisma.users.findFirst({
    //               select: {
    //                 id: true,
    //                 username: true,
    //                 info: {
    //                   select: {
    //                     first_name: true,
    //                     last_name: true,
    //                   },
    //                 },
    //               },
    //               where: {
    //                 id: appointment.user_id,
    //               },
    //             }),
    //             begin_at: appointment.begin_at,
    //             end_at: appointment.end_at,
    //           };
    //           return appointmentsPopulated;
    //         })
    //       ),
    //       created_at: userResponse.created_at,
    //       updated_at: userResponse.updated_at,
    //     };
    //   }
    // )
    .get("/currentUser", async ({ request, set }) => {
      const authRequest = auth.handleRequest({ request, set });
      const session = await authRequest.validate();
      if (!session) {
        // redirect to login page
        // return res.status(302).setHeader("Location", "/login").end();
        set.status = 401;
        return {
          code: set.status,
          logged_in: false,
        };
      }
      const user = session.user;
      const username = user.username;
      const email = user.email;
      return {
        code: set.status,
        logged_in: true,
        username,
        email,
      };
    })
    .get(
      "/users",
      async ({ userQuery }) => await prisma.users.findMany(userQuery)
    )
    .get("/users/:id", ({ params: { id }, userQuery }) =>
      prisma.users.findFirst({
        ...userQuery,
        where: {
          id: id,
        },
      })
    )
    .post(
      "/sign-up",
      async ({ body, request, set }) => {
        const {
          username,
          password,
          email,
          phone,
          info,
          appointments,
          people_to_meet,
          notifications,
        } = body;
        console.log(password.length);
        if (
          typeof username !== "string" ||
          username.length < 4 ||
          username.length > 31
        ) {
          set.status = "Length Required";
          return {
            code: set.status,
            message:
              "username must be at least 4 characters and do not exceed 31 characters",
          };
        }
        if (
          typeof password !== "string" ||
          password.length < 6 ||
          password.length > 255
        ) {
          set.status = "Length Required";
          return {
            code: set.status,
            message: "password must be at least 6 characters",
          };
        }
        try {
          // console.log(body);
          const userId = new ObjectId().toString();
          const user = await auth.createUser({
            userId,
            key: {
              providerId: "username", // auth method
              providerUserId: username.toLowerCase(), // unique id when using "username" auth method
              password, // hashed by Lucia
            },
            // key: null,
            attributes: {
              username,
              email,
              phone,
              info,
              // appointments,
              notifications,
            },
          });

          if (appointments !== undefined) {
            const appointmentCreateManyArray: Prisma.appointmentsCreateManyInput[] =
              appointments.map((item) => {
                return {
                  appointment_person: userId,
                  person_to_meet: item.person_to_meet,
                  begin_at: item.begin_at,
                  end_at: item.end_at,
                };
              });
            await prisma.appointments.createMany({
              data: appointmentCreateManyArray,
            });
          }

          if (people_to_meet !== undefined) {
            const poepleToMeetCreateManyArray: Prisma.appointmentsCreateManyInput[] =
              people_to_meet.map((item) => {
                return {
                  appointment_person: item.appointment_person,
                  person_to_meet: userId,
                  begin_at: item.begin_at,
                  end_at: item.end_at,
                };
              });
            await prisma.appointments.createMany({
              data: poepleToMeetCreateManyArray,
            });
          }

          const session = await auth.createSession({
            userId: user.userId,
            attributes: {},
          });
          const authRequest = auth.handleRequest({ request, set });
          authRequest.setSession(session);
          // redirect to profile page
          return body;
          // return res.status(302).setHeader("Location", "/").end();
        } catch (e: any) {
          // this part depends on the database you're using
          // check for unique constraint error in user table
          // console.log(e);
          if (
            e instanceof Prisma.PrismaClientKnownRequestError &&
            e.code === "P2002"
          ) {
            set.status = 400;
            return {
              code: set.status,
              message: "Username already taken",
            };
          }

          set.status = 500;
          return {
            code: set.status,
            message: e.message,
          };
        }
      },
      { body: CreateUserDTO }
    )
    .post(
      "/login",
      async ({ body, request, set }) => {
        const { username, password } = body;
        try {
          // find user by key
          // and validate password
          const key = await auth.useKey(
            "username",
            username.toLowerCase(),
            password
          );
          const session = await auth.createSession({
            userId: key.userId,
            attributes: {},
          });
          const authRequest = auth.handleRequest({ request, set });
          authRequest.setSession(session);
          return key;
          // redirect to profile page
          // return res.status(302).setHeader("Location", "/").end();
        } catch (e) {
          // check for unique constraint error in user table
          if (
            e instanceof LuciaError &&
            (e.message === "AUTH_INVALID_KEY_ID" ||
              e.message === "AUTH_INVALID_PASSWORD")
          ) {
            // user does not exist
            // or invalid password
            set.status = 401;
            return {
              code: set.status,
              message: "Incorrect username or password",
            };
          }
          set.status = 500;
          return {
            code: set.status,
            message: "An unknown error occurred",
          };
        }
      },
      { body: SigninDTO }
    )
    .post("/sign-out", async ({ request, set }) => {
      const authRequest = auth.handleRequest({ request, set });
      const session = await authRequest.validate(); // or `authRequest.validateBearerToken()`
      if (!session) {
        return (set.status = 401);
      }
      await auth.invalidateSession(session.sessionId);

      authRequest.setSession(null); // for session cookie

      // redirect back to login page
      // return res.status(302).setHeader("Location", "/login").end();
      return (set.status = 200);
    })
    // .post(
    //   "/users",
    //   async ({ body }) => {
    //     body.password = await Bun.password.hash(body.password);
    //     // const dob = new Date(body.info.dob);

    //     // if (isNaN(Date.parse(body.info.dob))) {
    //     //   console.log("Invalid format");
    //     // }

    //     if (!isNaN(Date.parse(body.info.dob))) {
    //       body.info.dob = new Date().toISOString();
    //     }

    //     // console.log(body.info.dob);
    //     return prisma.users.create({ data: body });
    //   },
    //   {
    //     body: CreateUserDTO,
    //   }
    // )
    .patch(
      "/users/:id",
      async ({ params: { id }, body }) => {
        if (body.password !== undefined) {
          body.password = await Bun.password.hash(body.password);
        }
        if (body.info !== undefined) {
          if (!isNaN(Date.parse(body.info.dob))) {
            body.info.dob = new Date().toISOString();
          }
        }
        return prisma.users.update({
          where: {
            id: id,
          },
          data: body,
        });
      },

      {
        body: UpdateUserDTO,
      }
    )
    .delete("/users/:id", ({ params: { id } }) =>
      prisma.users.delete({ where: { id: id } })
    );
