import { Elysia } from "elysia";
import {
  CreateDoctorDTO,
  DoctorResponse,
  UpdateDoctorDTO,
  WorkHistoryResponse,
} from "../models";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { generateObjectIdForSubdocumentList } from "../functions";

export const DoctorsController = (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
) =>
  new Elysia()
    .decorate("query", {
      id: true,
      npi: true,
      user_info: true,
      speciality: true,
      gallery: true,
      biography: true,
      work_history: true,
      certificates: true,
      created_at: true,
      updated_at: true,
    })
    .decorate(
      "modifyResponse",
      async (doctorResponse: DoctorResponse): Promise<DoctorResponse> => {
        return {
          id: doctorResponse.id,
          user_info: doctorResponse.user_info,
          npi: doctorResponse.npi,
          speciality: doctorResponse.speciality,
          gallery: doctorResponse.gallery,
          biography: doctorResponse.biography,
          work_history: await Promise.all(
            doctorResponse.work_history.map(async (work) => {
              const workHistoryPopulated: WorkHistoryResponse = {
                id: work.id,
                hospital: await prisma.hospitals.findFirst({
                  select: {
                    id: true,
                    name: true,
                    location: true,
                    contact_info: true,
                  },
                  where: {
                    id: work.hospital,
                  },
                }),
                salary: work.salary,
                start_date: work.start_date,
                end_date: work.end_date,
                created_at: work.created_at,
                updated_at: work.updated_at,
              };
              return workHistoryPopulated;
            })
          ),
          certificates: doctorResponse.certificates,
          created_at: doctorResponse.created_at,
          updated_at: doctorResponse.updated_at,
        };
      }
    )
    .get(
      "/doctors",
      async ({ query, modifyResponse }) =>
        await Promise.all(
          (
            await prisma.doctors.findMany({
              select: query,
            })
          ).map(async (doctorResponse) => {
            return modifyResponse(doctorResponse);
          })
        )
    )
    .get("/doctors/:id", async ({ params: { id }, query, modifyResponse }) => {
      const result = await prisma.doctors.findFirst({
        select: query,
        where: {
          id: id,
        },
      });
      if (result !== null) return modifyResponse(result);
    })
    .post(
      "/doctors",
      async ({ body }) => {
        generateObjectIdForSubdocumentList(body.certificates);
        if (body.gallery !== undefined) {
          generateObjectIdForSubdocumentList(body.gallery);
        }
        if (body.work_history !== undefined) {
          generateObjectIdForSubdocumentList(body.work_history);
        }
        return prisma.doctors.create({ data: body });
      },
      {
        body: CreateDoctorDTO,
      }
    )
    .patch(
      "/doctors/:id",
      async ({ params: { id }, body }) => {
        if (body.certificates !== undefined) {
          generateObjectIdForSubdocumentList(body.certificates);
        }
        if (body.gallery !== undefined) {
          generateObjectIdForSubdocumentList(body.gallery);
        }
        if (body.work_history !== undefined) {
          generateObjectIdForSubdocumentList(body.work_history);
        }
        return prisma.doctors.update({
          where: {
            id: id,
          },
          data: body,
        });
      },

      {
        body: UpdateDoctorDTO,
      }
    )
    .delete("/doctors/:id", ({ params: { id } }) =>
      prisma.doctors.delete({ where: { id: id } })
    );
