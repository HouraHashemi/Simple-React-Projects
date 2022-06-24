import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import ReactLoading from "react-loading";



function User({id=-1, name="Someone", email="Someone@email.com", phone="000-000", website="Someone.com" }) {
  const info = [id,name,email,phone,website];
  return info.map((i) => <td>{i}</td>)
}


// function User({id, name, email, phone, website }) {
//   const info = [id,name,email,phone,website];
//   return info.map((i) => <td>{i}</td>)
// }

// User.propTypes = {
//   id: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   email: PropTypes.string,
//   phone: PropTypes.string,
//   website:PropTypes.string
// };

// User.defaultProps = {
//   id: -1,
//   name:"Someone",
//   email:"Someone@email.com",
//   phone:"000-000",
//   website:"Someone.com"
// };

function UserList(){

  const [userArray,setUserArray] = useState([]);
  const [load, setLoad] = useState();
  
  useEffect(()=>{

    setTimeout(() => {  
      axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
        var dataArray = response["data"];
        console.log(dataArray);
        for (let i = 0; i < dataArray.length; i++) {
          const data = dataArray[i];
          const user = <User id={data["id"]} name={data["name"]} email={data["email"]} phone={data["phone"]} website={data["website"]} /> 

          setUserArray(userArray => [...userArray, user]);
        }
        setLoad(true);      
      })
      .catch((error) => {
        console.log(error);
      });
    }, 2000);

  },[]);


  
  return(
    <>
    {!load ? (
      <div className="loadingio-spinner-ellipsis-mdv6j69werm">
        <div className="ldio-bt9xc1fgkrt">
        <div></div><div></div><div></div><div></div><div></div>
        </div>
      </div>
      // // Loading by useing library
      // <ReactLoading type={"bars" color={"blue"} height={100} width={100}/>
      ):(
      userArray.map((usr) => <tr key={usr.id}>{usr}</tr>)
      )
    }
    </>
  );
}


// ------------------------------------------
function App(){

  const userList = <UserList />;
  const tableHeaders = ["ID","NAME","EMAIL","PHONE","WEBSITE"]

  return(
      <div className='user-list'>
        <h1>Users</h1>
        <hr></hr>
        <table>
          <tr>
          {tableHeaders.map((head) => <th>{head}</th>)}
          </tr>
          {userList}
        </table>
      </div>
  );
}



export default App;
