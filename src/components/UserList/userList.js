import React, { useContext, useEffect } from "react";

import Loader from "../Loader/Loader";
import DisplayUser from "./DisplayUser";
import UserContext from "../../context/userContext";
const UserList = () => {
    const { fetchUsers, loader, users } = useContext(UserContext);
    
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            {loader ? <Loader /> : <DisplayUser userList={users} />}
        </div>
    );
}

export default UserList;