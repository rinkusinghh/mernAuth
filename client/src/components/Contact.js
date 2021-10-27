import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';

export const Contact = () => {
    const history = useHistory();

    const [userData, setUserData] = useState({
      name: "",
      email: "",
      phone: "",
      message: ""
    });
  
      const userContact = async () => {
        try {
          const response = await fetch('/dynamicData', {
            method: 'GET',
            headers: { 'Content-Type' : 'application/json'},
          })
  
          const getData = await response.json();
          // console.log(getData);
          setUserData({
            ...userData, 
            name: getData.name, 
            email: getData.email,
            phone: getData.phone
          });
  
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
        userContact();
      }, [])

      // Storing Data In State;
      const eventHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData({...userData, [name]: value});
      }

      const messageSend = async (e) =>{
        e.preventDefault();

        const { name, email, phone, message } = userData;

        try{
          const response = await fetch('/contact', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({ name, email, phone, message})
          })
          
          await response.json();
          // console.log(getData);

          if( !response === 201 ){
            alert('could not send message')
          } else {
            alert('message send success');
            setUserData({...userData, message: ""});
          }

        } catch(error) {
          console.log(error)
        }

      }
    return (

        <>
          <div className="container">
              <div className="row">
                  <div className="col-lg-10 offset-lg-1">
                      <h1>Get In Touch</h1>
                      <form method="POST">
                          <input 
                          type="text" 
                          name="name"
                          value={userData.name}
                          onChange={eventHandler} 
                          placeholder="Your name" 
                          className="form-control" 
                          required="true" />
                          
                          <input 
                          type="email" 
                          name="email" 
                          value={userData.email} 
                          onChange={eventHandler} 
                          placeholder="Your email" 
                          className="form-control" 
                          required="true" />

                          <input 
                          type="phone" 
                          name="phone" 
                          value={userData.phone} 
                          onChange={eventHandler}
                          placeholder="Your number" 
                          className="form-control" 
                          required="true" />

                      <textarea 
                      name="textarea" 
                      id="" 
                      name="message"
                      value={userData.message}
                      onChange={eventHandler}
                      cols="30" 
                      rows="10" 
                      placeholder="msg...">
                      </textarea>
                          <button 
                          type="submit" 
                          onClick={messageSend} 
                          >
                              Send message
                          </button>
                      </form>

                  </div>
              </div>
          </div>
        </>
    )
}
