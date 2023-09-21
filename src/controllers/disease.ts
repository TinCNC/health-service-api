import { Elysia, t } from "elysia";
import { db } from "../db";
import { Collection, Document, ObjectId } from "mongodb";

const diseases = db.collection("diseases");

export const DiseaseController = new Elysia()
  .get("/diseases", () => diseases.find().toArray())
  .get("/diseases/:id", ({ params: { id } }) =>
    diseases.findOne({ _id: new ObjectId(id) })
  )
  .post("/diseases", ({ body }) => diseases.insertOne(body), {
    body: t.Object({
      name: t.String(),
      description: t.String(),
      scientific_name: t.String(),
      classification: t.String(),
      severity: t.String(),
    }),
  });

// export class Disease {
//   @Prop({ required: true, unique: true })
//   @ApiProperty({ default: 'Disease 123' })
//   name: string;

//   @Prop({ required: false, index: 'text' })
//   @ApiProperty({ required: false })
//   description: string;

//   @Prop({ required: true, unique: true })
//   @ApiProperty({ default: 'Disease In Science' })
//   scientific_name: string;

//   @Prop()
//   @ApiProperty({ default: 'Class' })
//   classification: string;

//   @Prop({
//     type: String,
//     enum: ['Low', 'Medium', 'High', 'Extreme'],
//     required: true,
//   })
//   @ApiProperty({ default: 'Medium' })
//   severity: string;
// }
