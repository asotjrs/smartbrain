import React from "react";

const FaceRecognition=({imgUrl})=>{
return <div className={'center ma'}>
    <div className={"mt2 absolute"}>
        <img id={'inputImage'} src={imgUrl} alt={"img not found"} width={'500'} height={'auto'}/>

    </div>
</div>


};
export default FaceRecognition;