import { useMyGoalRouteData } from "@/app/api/databook/route-data";
import React from "react";


export default function MyGoals(){
    const {mygoal} = useMyGoalRouteData()
    return (
        <div className="grid grid-cols-3 2xl:grid-cols-4 gap-4 cursor-pointer">
          {mygoal.map((card, index) => (
            <GroupAccountCard
              key={index}
              id={card.id}
              name={card.name}
              email={card.email}
              contact={card.contact}
            />
          ))}
        </div>
    )
}