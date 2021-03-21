import React, { useRef } from 'react'

function DataComp() {

    const dataRef = useRef();

    window.onscroll = () => {
        console.log(dataRef.current);
        console.log(dataRef.current.getBoundingClientRect().y);
        
        // if(dataRef.current.getBoundingClientRect().y < 200){
        //   setNav(true);
        // } else{
        //   setNav(false);
        // }
      }
    return (
        <div id="data" ref={dataRef}>
            
        </div>
    )
}

export default DataComp
