import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';

export const About = () => {
  const history = useHistory();

  const [userData, setUserData] = useState({});

    const userAbout = async () => {
      try {
        const response = await fetch('/about', {
          method: 'GET',
          headers: { Accept: 'application/json', 'Content-Type' : 'application/json'},
          credentials: 'include'
        })

        const getData = await response.json();
        // console.log(getData);
        setUserData(getData);

        if(!response.status === 200) {
          const err = new Error(response.err);
          throw err
        }

      } catch (err) {
        console.error(err)
        history.push('/signIn');
      }
    }

    useEffect(() => {
      userAbout();
    }, [])

    return (
        <>
        <div className="row">
        <h1 className="my-5 text-center bg-success">This is about page</h1>
           <form method="GET">
           <h1 className="text-center"> Name: {userData.name} </h1>
           <p className="text-center"> Email: {userData.email} </p>
           <p className="text-center"> Phone: {userData.phone} </p>
           <p className="text-center"> Profession: {userData.work} </p>
           </form>
        </div>
        </>
    )
}
