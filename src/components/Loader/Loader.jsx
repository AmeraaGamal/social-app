import React from "react";
import {ThreeCircles} from "react-loader-spinner"

export default function Loader (){
    return(
   <div className=" min-h-screen flex justify-center items-center">
    <ThreeCircles
  height={50}
  width={50}
  color="#4fa94d"
  ariaLabel="three-circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
   </div>
    )
}