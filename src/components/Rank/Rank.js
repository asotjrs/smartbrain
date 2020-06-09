import React from "react";


const Rank=({actualUser})=>{
    return <div>
        <div className={'white f3'}>
            {actualUser.name+" your current rank is......"}
        </div>

        <label className={'white f1'}>
            {actualUser.entries}
        </label>

    </div>;


};
export default Rank;