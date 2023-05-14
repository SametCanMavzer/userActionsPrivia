
import { useState } from 'react';
import {
    createTheme, ThemeProvider, FormGroup, TextField, Button,
    FormControl, Stack, InputLabel, MenuItem, Select, FormLabel, RadioGroup, Grid, FormControlLabel, Alert, Radio, Avatar
} from '@mui/material';
import "../styles/userForm.css"
import axios from "axios";
import Icon1 from '../assets/Image/resim1.png'
import Icon2 from '../assets/Image/resim2.png'
import Icon3 from '../assets/Image/resim3.png'
import Icon4 from '../assets/Image/resim4.jpg'
import Icon5 from '../assets/Image/resim5.png'
import Icon6 from '../assets/Image/resim6.jpg'


export default function UserForm() {

    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [labelVisible, setLabelVisible] = useState(true);
    const [avatar, setAvatar] = useState(false);
    const [error, setError] = useState(false);

    const options = [
        { value: 'icon1', label: 'Female', icon: Icon1 },
        { value: 'icon2', label: 'Male', icon: Icon2 },
        { value: 'icon3', label: 'Other', icon: Icon3 },
        { value: 'icon4', label: 'F1', icon: Icon4 },
        { value: 'icon5', label: 'M1', icon: Icon5 },
        { value: 'icon6', label: 'O1', icon: Icon6 },
    ];

    const theme = createTheme({
        palette: {
            primary: {
                main: '#2940D3',
            },
        },
    });
    const handleSubmit = (event) => {
        event.preventDefault();
        if (avatar == false) {
            setError(true);
        } else {
            setError(false);
            const data = {
                fullName: fullName.trim(),
                userName: userName.trim(),
                email: email.trim(),
                role: role.trim(),
                avatar: avatar
            };
            axios.post('http://localhost:3000/users', data)
                .then(res => {

                    console.log(res.data);
                })
                .catch(error => {
                    console.error(error);
                });

            resetForm();
        }

    };

    const resetForm = () => {
        setFullName("");
        setUserName("");
        setEmail("");
        setRole("");
        setLabelVisible(true);
        setAvatar(false);
    };


    const handleChange = (e) => {
        e.preventDefault();
        setRole(e.target.value);
        setLabelVisible(false);

    }

    return (
        <ThemeProvider theme={theme}>
            <Stack className='form' component="form" onSubmit={handleSubmit}  >
                <FormGroup className='formGroup' >
                    <Grid container spacing={2} direction="column"
                        justifyContent="center"
                        alignItems="center"
                        gap={2}

                    >
                        <Grid item xs={12}  >
                            <TextField className='input'
                                required
                                type="text"
                                placeholder='Full Name'
                                value={fullName}
                                onChange={(event) => setFullName(event.target.value)}

                            />
                        </Grid>
                        <Grid item xs={12}  >
                            <TextField

                                className='input'
                                required
                                type="text"
                                placeholder='Username'
                                value={userName}
                                onChange={(event) => setUserName(event.target.value)}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className='input'
                                required
                                type="email"
                                placeholder='Email Address'
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}



                            />
                        </Grid>
                        <Grid item xs={12} >
                            <FormControl className='input' >

                                {labelVisible && (
                                    <InputLabel shrink={false} id="demo-simple-select-label">
                                        Role
                                    </InputLabel>
                                )}

                                <Select

                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    displayEmpty
                                    value={role}
                                    required

                                    onChange={handleChange}
                                    sx={{

                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            border: 2, borderColor: 'primary.main',
                                        },
                                    }}

                                >
                                    <MenuItem value="Contributor">Contributor</MenuItem>
                                    <MenuItem value="Subscriber">Subscriber</MenuItem>
                                    <MenuItem value="Author">Author</MenuItem>
                                    <MenuItem value="Administrator">Administrator</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        < Grid item xs={12} >
                            <FormControl required error={error} sx={{ gap: '20px' }} >
                                <FormLabel className='radioLabel' id="demo-row-radio-buttons-group-label">Select Avatar</FormLabel>
                                <RadioGroup

                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={avatar}
                                    required
                                    sx={{ marginLeft: 4 }}

                                >
                                    {options.map((option) => (
                                        <FormControlLabel
                                            key={option.value}
                                            value={option.value}
                                            control={<Radio sx={{ display: 'none' }} />}

                                            label={
                                                <Avatar
                                                    variant='rounded'
                                                    sx={{ width: 56, height: 56, }}
                                                    className={`${"avatar"} ${avatar == option.icon ? "selectedImage" : ''}`}
                                                    src={option.icon}
                                                    alt={option.label}
                                                    onClick={() => { setAvatar(option.icon) }}
                                                />
                                            }
                                        />
                                    ))}
                                </RadioGroup>

                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            {error && <Alert className='alert' severity="error">Selecting an avatar is mandatory!</Alert>}
                        </Grid>
                        <Button size='large' variant='contained' type="submit" color='primary'>Create User</Button>
                    </Grid>
                </FormGroup >
            </Stack >
        </ThemeProvider>

    );
}


