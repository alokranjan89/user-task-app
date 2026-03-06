import { useEffect, useState } from "react";
import API from "../services/api";

function Admin() {

  const [users,setUsers] = useState([]);

  useEffect(()=>{

    fetchUsers();

  },[]);

  const fetchUsers = async () => {

    const res = await API.get("/users");

    setUsers(res.data);

  };

  const deleteUser = async (id) => {

    await API.delete(`/users/${id}`);

    fetchUsers();

  };

  return (

    <div className="p-10">

      <h1 className="text-xl mb-6">
        Admin Panel
      </h1>

      {users.map(user => (

        <div key={user.id} className="flex gap-4 mb-2">

          <p>{user.email}</p>

          <button
            onClick={()=>deleteUser(user.id)}
            className="text-red-500"
          >
            Delete
          </button>

        </div>

      ))}

    </div>

  );

}

export default Admin;