"use client"

import { Center } from "@repo/ui/Center";
import { TextInput } from "@repo/ui/TextInput";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export default function SendCard(){
    const [number,setNumber] = useState("");
    const [amount, setAmount] = useState("");
    return (
      
            <Center>
            <Card title="Send">
                <div className="min w-72 pt-2">
                    <TextInput placeholder={"Number"} label="Number" onChange={(e)=>{setNumber(e)}}/>
                    <TextInput placeholder="Amount" label="Amount" onChange={(e)=>{setAmount(e)}}/>
                <div className="flex justify-center pt-4">
                    <Button onClick={async ()=>{await p2pTransfer(number,Number(amount)* 100)}}>
                        Send
                    </Button>
                </div>
               </div>
            </Card>
            </Center>
  
    )
}