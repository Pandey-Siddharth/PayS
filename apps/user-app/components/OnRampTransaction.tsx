import { Card } from "@repo/ui/card"

export default function OnRampTransaction({transactions} : {
    transactions : {
        amount : number,
        time : Date,
        status : string,
        provider : string
    }[]
}){
    if(!transactions.length){
        return (
            <Card title="Recent Transactions">
                <div className="p-20 text-center">
                    No recent ransactions found 
                </div>
            </Card>
        )
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        Received INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className={t.status === "Pending" ? "text-gray-500" : "text-green-500"}>
                    + Rs {t.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
}