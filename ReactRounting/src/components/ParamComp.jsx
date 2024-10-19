import React from "react";
import { useParams } from "react-router-dom";

function ParamComp() {
  let { userId } = useParams();
  return (
    <div className="text-center w-full flex-col justify-center items-center">
      Myparams : {userId}
    </div>
  );
}

export default ParamComp;
