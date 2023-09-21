import { MongoClient } from "mongodb";

const credentials = "X509-cert-4340260801975597652.pem";
const mongo = new MongoClient(
  "mongodb+srv://geo.cuj0ztx.mongodb.net/healthcare_map?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority",
  {
    tls: true,
    tlsCertificateKeyFile: credentials,
    authMechanism: "MONGODB-X509",
  }
);

export const client = await mongo.connect();

export const db = client.db();
