import { useEffect,useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { UserContext } from '../App';
export const LogOut = () => {
    const { state, dispatch } = useContext(UserContext)

    const history = useHistory();

    // Promises
    useEffect(() => {
        fetch('/logOut', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }, 
            credentials: 'include'
        }).then((response) => {
            dispatch({ type: "USER", payload: false});
            history.push('/signIn', { replace: true});
            if(response.status !== 200) {
                const error = new Error(response.error);
                throw error;
            }
        }).catch((error) => {
            console.error(error);
        })
    })

    return (
        <div>
            <h1>logOut page</h1>
        </div>
    )
}
