import React,{useState,useEffect} from 'react';
import './App.css';
function App() {
  const [data,setData]= useState([]);
  const [name,setName]= useState('');
  const [email,setEmail]= useState('');
 const [error,setError]= useState('')

  const deleteUser = async (id) => {
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

  const submitButton= async (e)=>{
    e.preventDefault();
    try {
      const data = {
        name:name,
        email:email
      };
      const response = await fetch('http://localhost:8080/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
          setName('');
          setEmail('');
          getAPIData();
      } else {
        return response.json().then(data => {
            setError(data.message);
        })
      }
    } catch (error) {
     // console.error('Error deleting user:', error);
      console.log(error);
    }
  }
  
  useEffect(()=>{ 
     getAPIData();
  },[])

  return (
    <div className="App">
     <h1>User List</h1>
    <span className="error-message"> {error}</span>
     <form className="form">
       <div className="input">
        <label>Name</label>
          <input type="text" name="name"  placeholder="Enter name.." value={name} onChange={(e)=>setName(e.target.value)}/>
       </div>
       <div className="input">
       <label>Email</label>
          <input type="text" name="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
       </div>
       <div className="input">
         <button onClick={submitButton}>Save</button>
       </div>
     </form>
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
