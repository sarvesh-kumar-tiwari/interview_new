import React,{useState,useEffect} from 'react';
import './App.css';
function App() {
  const [data,setData]= useState([]);

  const deleteUser = async (id) => {
    console.log('delete ')
    try {
      const response = await fetch(`http://localhost:8080/delete/${id}`, {
        method: 'GET'
      });
      if (response.ok) {
          getAPIData();
      } else {
       console.error('Delete request failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  
  const getAPIData = async () => {
    try {
      const response = await fetch('http://localhost:8080/');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  
  useEffect(()=>{ 
     getAPIData();
  },[])

  return (
    <div className="App">
     <h1>User List</h1>
     <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {data.map((user)=>{
        return(
          <tr key={user._id}>
             <td>{user._id}</td>
             <td>{user.name}</td>
             <td>{user.email}</td>
             <td>
                  <a href="">Edit</a>
                  &nbsp;
                  <a onClick={()=>deleteUser(user._id)}>Delete</a>
             </td>
         </tr>
        )
        
      })}
      </tbody>
    </table>
    </div>
  );
}

export default App;
