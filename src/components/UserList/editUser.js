import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { TextField } from '@mui/material';
import { validateEmail, validateName, validateWebsite } from '../../validation';
import UserContext from '../../context/userContext';


function DialogHeaderTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

DialogHeaderTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

function EditUser({ user, open, onClose, isDelete }) {
    const { editUserById, deleteUserById } = useContext(UserContext);
    const [validForm,setValidForm]=useState(false);
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        phone: user.phone,
        website: user.website,
    });

    const [errors, setErrors] = React.useState({});

    const handleChange = (e) => {
            
       validationFunction();
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isDelete) {

            let editUser = user;
            editUser.name = formData.name;
            editUser.phone = formData.phone;
            editUser.website = formData.website;
            editUser.email = formData.email;
            editUserById(user.id, editUser);
        } else {
            deleteUserById(user.id);
        }
        onClose();

    };



    const handleClose = () => {
        onClose();
    };
    const validationFunction=()=>{
        const newErrors = {};
        if (!validateName(formData.name)) {
            newErrors.name = 'Name is required';
        }

        if (!validateEmail(formData.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (formData.phone==null || formData.phone.length<=0|| formData.phone==undefined) {
            newErrors.phone = 'Invalid Phone Number';
        }

        if (!validateWebsite(formData.website)) {
            newErrors.website = 'Invalid website address';
        }

        setErrors(newErrors);
        Object.keys(newErrors).length === 0 ?  setValidForm(true): setValidForm(false);

    }
    useEffect(()=>{
        validationFunction()
    },[])


    return (
        <div>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                {
                    !isDelete ?
                        <DialogHeaderTitle id="customized-dialog-title" onClose={handleClose}>
                            Edit User
                        </DialogHeaderTitle> : null
                }

                <DialogContent dividers>

                    {
                        !isDelete ?
                            <form>
                                <div className='p-5 pt-0 pb-1' >
                                    <div className='flex w-full'>
                                        <div className='p-3 font-bold'><h4 className="h4CSS"><span className='text-red-700'>*</span>Name</h4></div>
                                        <div className='pl-5'>
                                            <TextField
                                                name="name"
                                                value={formData.name}
                                                onKeyUp={handleChange}
                                                onChange={handleChange}
                                                error={Boolean(errors.name)}
                                                helperText={errors.name}
                                                fullWidth
                                                required
                                            /></div>
                                    </div>
                                    <div className='flex w-full mt-3'>
                                        <div className='p-3 font-bold'><h4 className="h4CSS"><span className='text-red-700'>*</span>Email</h4></div>
                                        <div className='pl-5'>
                                            <TextField
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                 onKeyUp={handleChange}
                                                error={Boolean(errors.email)}
                                                helperText={errors.email}
                                                fullWidth
                                                required
                                            /></div>
                                    </div>
                                    <div className='flex w-full  mt-3'>
                                        <div className='p-3 font-bold'><h4 className="h4CSS"><span className='text-red-700'>*</span>Phone</h4></div>
                                        <div className='pl-5'>
                                            <TextField
                                                name="phone"
                                                value={formData.phone}
                                                onKeyUp={handleChange}
                                                onChange={handleChange}
                                                error={Boolean(errors.phone)}
                                                helperText={errors.phone}
                                                fullWidth
                                                required
                                            /></div>
                                    </div>
                                    <div className='flex w-full  mt-3'>
                                        <div className='p-3 font-bold'><h4 className="h4CSS"><span className='text-red-700'>*</span>Webiste</h4></div>
                                        <div className='pl-5'>
                                            <TextField
                                                name="website"
                                                value={formData.website}
                                                onKeyUp={handleChange}
                                                onChange={handleChange}
                                                error={Boolean(errors.website)}
                                                helperText={errors.website}
                                                fullWidth
                                                required
                                            /></div>
                                    </div>
                                </div>
                            </form>
                            :
                            <div className='p-6 pb-2'>
                                <h3>Are you sure you want to delete?</h3>
                            </div>
                    }

                </DialogContent>
                <DialogActions>
                    <Button type="submit"variant="outlined" color="primary" onClick={handleClose} >
                        {!isDelete ? "Cancel" : "No"}
                    </Button>
                    <Button type="submit" disabled={!validForm} variant="contained" color="primary" onClick={handleSubmit} >
                        {!isDelete ? "Ok" : "Yes"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditUser;