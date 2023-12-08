import React, { useEffect, useState } from 'react'

function Home() {
    const[state,setstate]=useState([])
    useEffect(()=>{
      fetchdata();

    },[ ])
    const fetchdata =async()=>{
      const data =await fetch(`https://fakestoreapi.com/products`)
      const newData = await data.json()
      setstate(newData)
      //console.log(state)
      
    }
    console.log(state)
  return (
    <div style={{display:'grid',gridTemplateColumns:"1fr 1fr 1fr"}}>
    {state.map((e,i)=>{
      return<div style={{boxShadow:"0 0 10px black", height:"200px", margin:'10px',padding:"25px"}}>
      
        <h6>{e.title}</h6>
        <div>
        
          <img src={e.image} style={{width:"150px",height:"75px"}}/>
          
        </div>
        
        {/* <p>  {e.description}</p> */}
        <p> ₹  {e.price}</p>
        <button style={{backgroundColor:"red",borderRadius:'5px', color:"white"}}> click me</button>
      </div>
    })}


        
    </div>
  )
}

export default Home