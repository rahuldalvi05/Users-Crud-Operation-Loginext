import { createContext, useState } from 'react';
import userApi from '../api/userApi'

const UserContext = createContext();

function Provider({ children }) {
  const [users, setUsers] = useState([]);
  const [loader, setLoader]=useState(true);

  const fetchUsers = async () => {
    const response = await userApi.get('/users');
   response.data.forEach(el=>{
      el["heartToggle"]=false;
    })
    setUsers(response.data);
    setLoader(false)
    return response;
  };
  const editUserById = async (id, editUserData) => {

    const updatedUsers = users.map((user) => {
      if (user.id === id) {
        return { ...user, ...editUserData};
      }

      return user;
    });

    setUsers(updatedUsers);
  };

  const deleteUserById = async (id) => {
  

    const updatedUsers = users.filter((user) => {
      return user.id !== id;
    });

    setUsers(updatedUsers);
  };



  const valueToShare = {
    users,
    loader,
    deleteUserById,
    editUserById,
    fetchUsers,
  };

  return (
    <UserContext.Provider value={valueToShare}>
      {children}
    </UserContext.Provider>
  );
}

export { Provider };
export default UserContext;
