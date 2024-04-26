import React from 'react';
import axios from 'axios';

export default function App() {

  const buyFunction = async () => {
    let response = await axios.post("http://localhost:3000/payment");
    if(response && response.status === 200){
      window.location.href = response.data.url;
    }
  }

  return (
    <div className='main'>
    <img src="https://rukminim2.flixcart.com/image/850/1000/l37mtu80/t-shirt/g/g/n/s-amg-43-tshirt-fastb-original-imagedkgecxmfzmg.jpeg?q=90&crop=false" alt="tshirt" height={200} width={200}/>
    <p>Price: 50$</p>
      <button onClick={buyFunction}>Buy Now</button>
    </div>
  )
}
