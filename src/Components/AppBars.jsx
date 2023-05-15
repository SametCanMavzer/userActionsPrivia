import { AppBar, Toolbar, IconButton, Typography, Tabs, Tab, TextField, Box, Button, Avatar, createTheme, ThemeProvider, } from '@mui/material';
import { useState } from 'react';
import InputAdornment from "@mui/material/InputAdornment"
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import logo from '../assets/Image/logo.png';
import addUserButton from '../assets/Image/button.png';
import axios from 'axios';
import "../styles/userForm.css";

const AppBars = ({ fetchData, setOpen, setData, searchValue, setSearchValue, userIdDelete }) => {

    const [value, setValue] = useState(0);
    const tabNames = ['All Users', 'Contributor', 'Author', 'Administrator', 'Subscriber'];

    const theme = createTheme({
        palette: {
            primary: {
                main: '#2940D3', // burada istediğiniz renk kodunu girin
            },
        },
    });

    const handleTabChange = (event, newValue) => {
        setValue(newValue);

        // Yeni verileri çekme fonksiyonu
        fetchData(tabNames[newValue]);
    }

    const handleDeleteClick = async () => {

        // Liste ve API'den verileri silme işlemleri
        try {
            for (const user of userIdDelete) {
                await axios.delete(`http://localhost:3000/users/${user}`);
            }
            setData([]);

        } catch (error) {
            console.error(error);
            alert('Please refresh the page!!!');
            // Hata işleme
        }
    }



    return (
        <ThemeProvider theme={theme}>
            <Box>
                <AppBar className='appbar' position="static"  >
                    <Toolbar>
                        <Typography className='logo' variant="h6" >
                            <Avatar alt="logo" src={logo} variant="rounded" />
                            Users
                        </Typography>
                        <Tabs className='tabs' value={value} onChange={handleTabChange}>
                            {tabNames.map((name, index) => (
                                <Tab className='tab' sx={{ '&:focus': { outline: 'none' } }} key={index} label={name} />
                            ))}
                        </Tabs>
                        <Button sx={{ '&:focus': { outline: 'none' } }} color="inherit" onClick={() => setOpen(true)}>
                            <Avatar className='avatar2' alt="addUser" src={addUserButton} variant="rounded" />

                        </Button>

                    </Toolbar>
                </AppBar>
                <AppBar className='appbar' position="static" >
                    <Toolbar >

                        <TextField
                            className='search'
                            placeholder='Search'
                            value={searchValue}
                            variant="standard"
                            sx={{

                                '& .MuiInput-underline:before': { borderBottom: 'none' },
                                '& .MuiInput-underline:after': { borderBottom: 'none' },
                                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                    borderBottom: 'none',
                                },
                            }}
                            onChange={(e) => setSearchValue(e.target.value)}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <IconButton   >
                            <DeleteIcon sx={{ marginLeft: 2 }} onClick={handleDeleteClick} />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    )
}

export default AppBars