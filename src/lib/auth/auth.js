import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { betterAuth } from "better-auth";

import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("roktoneer");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 7 * 24 * 60 * 60,
      strategy: "jwt",
    },
  },
  plugins: [jwt()],
  user: {
  additionalFields: {

    status:{
      type:"string",
      default:"active"
    },
    role: {
      default: "donor",
    },
    phoneNumber: {
      type: "string",
      required: true,
    },
    bloodGroup: {
      type: "string",
      required: true,
    },
    district: {
      type: "string",
      required: true,
    },
    upazila: {
      type: "string",
      required: true,
    },
    image: {
      type: "string",
      required: false,
    },
  },
},
});


