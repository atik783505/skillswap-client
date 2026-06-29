import { betterAuth,} from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('skillswap');

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        // Optional: if you don't provide a client, database transactions won't be enabled.
        client
    }),
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6,
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: true,
                defaultValue: "client",
            },
            isBlocked: {
                type: "boolean",
                required: true,
                defaultValue: false,
            },
            bio: {
                type: "string",
                required: false,
                defaultValue: "",
                input: true
            },
            skills: {
                type: "array",
                required: false,
                defaultValue: [],
                input: true
            },
            hourlyRate: {
                type: "number",
                required: false,
                defaultValue: 0,
                input: true
            },
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
    session:{
        cookieCache:{
            enabled:true,
            strategy: 'jwt',
            maxAge:60*24*30,
        }
    },
    plugins:[
        jwt()
    ]
});