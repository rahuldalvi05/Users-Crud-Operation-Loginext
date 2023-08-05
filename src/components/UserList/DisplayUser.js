import { faEnvelope, faGlobe, faPencil, faPhone, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import UserContext from '../../context/userContext';
import EditUser from './editUser';

export default function DisplayUser({ userList }) {
    const { editUserById } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [openDeleteModal, setDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const onClose = () => {
        setOpen(false);
        setDeleteModal(false);
        setSelectedUser(null)
    }
    const handleClick = (item) => {
        setSelectedUser(item);
        setOpen(true);
        setDeleteModal(false);
    }

    const deleteUser = (item) => {
        setSelectedUser(item);
        setOpen(true);
        setDeleteModal(true);
    }
    const heartToggleForUser = (item) => {
        let updateIte = item;
        updateIte.heartToggle = !updateIte.heartToggle;
        editUserById(item.id, item)

    }
    const renderuserList = userList.map((item, index) => (
        <div className="card border-gray-400" key={item.id}>
            <div className='bg-gray-200'>
                <img src={`https://avatars.dicebear.com/v2/avataaars/${item.username}.svg?options[mood][]=happy`} alt="Avatar" />
            </div>
            <div className='p-3 mt-4 text-gray-600 '>
                <h4 className='text-gray-800 mb-2'><b>{item.name}</b></h4>
                <div  style={{ wordWrap: "break-word" }}> <FontAwesomeIcon icon={faEnvelope} /> &nbsp; {item.email}</div>
                <div style={{ wordWrap: "break-word" }}> <FontAwesomeIcon icon={faPhone} />&nbsp; {item.phone}</div>
                <div style={{ wordWrap: "break-word" }}> <FontAwesomeIcon icon={faGlobe} /> &nbsp;{item.website}</div>
            </div>
            <div className='pb-4 pt-4 mt-4 grid gap-3 grid-cols-3 bg-gray-200'>
                <div className='text-center cursor-pointer' onClick={() => heartToggleForUser(item)} > {item.heartToggle ? <FavoriteIcon style={{ color: "red" }} /> : <FavoriteBorderIcon style={{ color: "red" }} />} </div>
                <div className='text-center cursor-pointer text-gray-600 ' onClick={() => handleClick(item)} > <FontAwesomeIcon icon={faPencil} /></div>
                <div className='text-center cursor-pointer text-gray-600 ' onClick={() => deleteUser(item)}> <FontAwesomeIcon icon={faTrash} /></div>
            </div>

        </div>
    ))
    return (
        <div>
            <div className='grid gap-5 grid-cols-4 container mx-auto'>

                {renderuserList}

            </div>
            {open ?
                <EditUser
                    user={selectedUser}
                    open={open}
                    onClose={onClose}
                    isDelete={openDeleteModal}
                /> : null}
        </div>

    )
}
