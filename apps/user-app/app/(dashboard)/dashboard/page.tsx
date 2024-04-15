import AddMoney from "../../../components/AddMoneyCard";
import Balance from "../../../components/Balance";
import OnRampTransaction from "../../../components/OnRampTransaction";

export default function(){
    return (
        <div className="w-screen text-center text-4xl text-[#6a51a6] pt-8 mb-8 font-bold"> Dashboard
            {/* <AddMoney/>
            <Balance amount={1000} locked={500}/>
            <OnRampTransaction transactions={[]}/> */}
        </div>
    )
}
