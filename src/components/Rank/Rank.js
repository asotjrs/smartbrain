import React from "react";


const Rank  =({entries,name})=>{


        return <div>
            <div className='white f3'>
                {`${name}, your current entry count is...`}
            </div>
            <div className='white f1'>
                {entries}
            </div>
            <p>Register to start your count ! </p>

        </div>;


};
export default Rank;