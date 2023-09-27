import { Elysia } from "elysia";
import { CreateUserDTO, UpdateUserDTO } from "../models";
import { UserResponse, AppointmentResponse } from "../responses/users";
import { Prisma, PrismaClient, users } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const UsersController = (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
) =>
  new Elysia()
    .decorate(
      "modifyUserResponse",
      async (userResponse: users): Promise<UserResponse> => {
        return {
          id: userResponse.id,
          username: userResponse.username,
          phone: userResponse.phone,
          email: userResponse.email,
          info: userResponse.info,
          notifications: userResponse.notifications,
          appointments: await Promise.all(
            userResponse.appointments.map(async (appointment) => {
              const appointmentsPopulated: AppointmentResponse = {
                id: appointment.id,
                user_info: await prisma.users.findFirst({
                  select: {
                    id: true,
                    username: true,
                    info: {
                      select: {
                        first_name: true,
                        last_name: true,
                      },
                    },
                  },
                  where: {
                    id: appointment.user_id,
                  },
                }),
                begin_at: appointment.begin_at,
                end_at: appointment.end_at,
              };
              return appointmentsPopulated;
            })
          ),
          created_at: userResponse.created_at,
          updated_at: userResponse.updated_at,
        };
      }
    )
    .get(
      "/users",
      async ({ modifyUserResponse }) =>
        await Promise.all(
          (
            await prisma.users.findMany()
          ).map(async (userResponse) => {
            return modifyUserResponse(userResponse);
          })
        )
    )
    .get("/users/:id", ({ params: { id } }) =>
      prisma.users.findFirst({
        where: {
          id: id,
        },
      })
    )
    .post(
      "/users",
      async ({ body }) => {
        body.password = await Bun.password.hash(body.password);
        // const dob = new Date(body.info.dob);

        // if (isNaN(Date.parse(body.info.dob))) {
        //   console.log("Invalid format");
        // }

        if (!isNaN(Date.parse(body.info.dob))) {
          body.info.dob = new Date().toISOString();
        }

        // console.log(body.info.dob);
        return prisma.users.create({ data: body });
      },
      {
        body: CreateUserDTO,
      }
    )
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
