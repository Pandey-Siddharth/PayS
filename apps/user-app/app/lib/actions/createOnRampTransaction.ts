"use server";

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client"

export default async function(provider : string,amount : number){
    const session = await getServerSession(authOptions);
    if(!session?.user || !session?.user.id){
        return {
            message : "Unauthorized Messages"
        }
    }

    const token = (Math.random() * 1000).toString()

    await prisma.onRampTransaction.create({
        data : {
            token : token,
            provider,
            startTime : new Date(),
            userId : Number(session?.user?.id),
            amount :amount * 100,
            status : "Pending"
        }
    });
    return {
        message : "Done"
    }
}
