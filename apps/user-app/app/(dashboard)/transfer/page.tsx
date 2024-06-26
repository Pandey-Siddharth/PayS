import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import AddMoney from "../../../components/AddMoneyCard";
import Balance from "../../../components/Balance";
import OnRampTransaction from "../../../components/OnRampTransaction";


async function getBalance(){
    const session  = await getServerSession(authOptions);
    const balance =  await prisma.balance.findFirst({
        where : {
            userId : Number(session?.user?.id)
        }
    });
    return ({
        amount : balance?.amount || 0,
        locked : balance?.locked || 0
    })
}

async function getOnRampTransaction(){
    const session = await getServerSession(authOptions);
    const transaction = await prisma.onRampTransaction.findMany({
        where : {
            userId : Number(session?.user?.id)
        }
    });
    return transaction.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    })) 
}

export default async function() {
    const balance = await getBalance();
    const transactions = await getOnRampTransaction();
    console.log(transactions);

    return (<div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold text-center">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 pt-7">
            <div>
                <AddMoney />
            </div>
            <div>
                <Balance amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                    <OnRampTransaction transactions={transactions} />
                </div>
            </div>
        </div>
    </div>)
    
}