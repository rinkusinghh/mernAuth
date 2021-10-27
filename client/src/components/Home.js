import { useEffect, useState } from 'react'
import './home.css';

export const Home = () => {

    const [userData, setUserData] = useState({});
    const [ show, setShow ] = useState(false);
    
        const userHome = async () => {
          try {
            const response = await fetch('/dynamicData', {
              method: 'GET',
              headers: { 'Content-Type' : 'application/json'},
            })
    
            const getData = await response.json();
            // console.log(getData);
            setUserData(getData);
            setShow(true);
    
            if(!response.status === 200) {
              const err = new Error(response.err);
              throw err
            }
    
          } catch (err) {
            console.error(err)
          }
        }
    
        useEffect(() => {
          userHome();
        }, [])

    return (
        <div className="container">
            <h1 className="text-center my-4">Welcome</h1>
            {/* <h1 className="text-center"> {userData}, </h1> */}
            <h2 className="text-center text_capital" > {userData.name} { show ? ' Good morning' : 'MERN development'}</h2>
        </div>
    )
}
