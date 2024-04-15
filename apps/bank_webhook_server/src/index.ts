import express from "express";
import db from "@repo/db/client"


const app = express();
app.use(express.json())

app.post("/bankwebhook",async (req,res)=>{
    const paymentInformation: {
        token: string;
        userId: string;
        amount: number
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    try{
        await db.$transaction([
                 db.balance.updateMany({
                    where:{
                        userId :Number( paymentInformation.userId)
                    },
                    data : {
                        amount:{
                            increment : paymentInformation.amount
                        }
                    }
                }),
                db.onRampTransaction.updateMany({
                where : {
                    token : paymentInformation.token
                },
                data : {
                    status : "Success"
                }
            })
        ]);
    
        res.status(200).json({
            message : "captured"
        })
    } catch(e){
        console.log(e);
        res.status(411).json({
            message : 'Error while processing request'
        })
    }
})

app.listen(3000);