import { useState, useEffect } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, Typography, Tabs, Tab, IconButton, Modal, Box, Checkbox, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Pagination, Grid, Avatar, createTheme, ThemeProvider, Button, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UserForm from './UserForm';
import InputAdornment from "@mui/material/InputAdornment"
import SearchIcon from '@mui/icons-material/Search';
import "../styles/userForm.css";
// import AppBars from "../Components/AppBars";


function UserTable() {

    const [open, setOpen] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [data, setData] = useState([]);
    const [isChecked, SetIsChecked] = useState(false);
    const [page, setPage] = useState(1);
    const [userIdDelete, setUserIdDelete] = useState([]);
    const [value, setValue] = useState(0);
    const tabNames = ['All Users', 'Contributor', 'Author', 'Administrator', 'Subscriber'];

    const rowsPerPage = 10;
    console.log(setData)

    const theme = createTheme({
        palette: {
            primary: {
                main: '#2940D3', // burada istediğiniz renk kodunu girin
            },
        },
    });

    const fetchData = async (role) => {
        try {
            const response = await axios.get(`http://localhost:3000/users`);
            setData(response.data)
            { role !== "All Users" ? setData((await axios.get(`http://localhost:3000/users?role=${role}`)).data) : "" }
            const filteredData = await response.data.filter(user => user.userName.includes(searchValue) || user.email.includes(searchValue))
            { searchValue ? setData(filteredData) : "" }
        }

        catch (error) {
            console.error(error);
            alert(error + "Maalef hatası alıyoruz , lütfen sayfayı yenileyip bekleyiniz.Anlayışınız için teşekkür ederiz.")
            // Hata işleme
        }

    }
    const handleTabChange = (event, newValue) => {
        setValue(newValue);

        // Yeni verileri çekme fonksiyonu
        fetchData(tabNames[newValue]);
    }

    useEffect(() => {
        // Bileşen yüklendiğinde verileri çekme fonksiyonu
        fetchData('All Users');

    }, [searchValue, open, page, setData]);


    const handleOneDelete = async (e) => {
        try {

            if (isChecked) {
                await axios.delete(`http://localhost:3000/users/${e}`);
            }

        } catch (error) {
            console.error(error);
            alert('Bir hata oluştu!');
            // Hata işleme
        }

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
            <Box className='container'>
                <Grid container >
                    <Grid item md={12}>
                        <Box>
                            <AppBar className='appbar' position="static"  >
                                <Toolbar>
                                    <Typography className='logo' variant="h6" >
                                        <Avatar alt="logo" src="../assets/Image/resim1.png" variant="rounded" />
                                        Users
                                    </Typography>
                                    <Tabs className='tabs' value={value} onChange={handleTabChange}>
                                        {tabNames.map((name, index) => (
                                            <Tab className='tab' sx={{ '&:focus': { outline: 'none' } }} key={index} label={name} />
                                        ))}
                                    </Tabs>
                                    <Button sx={{ '&:focus': { outline: 'none' } }} color="inherit" onClick={() => setOpen(true)}>
                                        <Avatar className='avatar2' alt="addUser" src="../assets/Image/resim3.png" variant="rounded" />

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
                        {/* <AppBars fetchData={fetchData} setOpen={setOpen} setData={data} setSearchValue={setSearchValue} searchValue={searchValue} userIdDelete={userIdDelete} /> */}
                        {/* Verileri tabloda görüntüleme */}

                        <Modal
                            open={open}
                            onClose={() => setOpen(false)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'

                            }}
                        >
                            <UserForm />
                        </Modal>
                        < TableContainer component={Paper}  >
                            <Table  >
                                <TableHead>
                                    <TableRow >
                                        <TableCell padding="checkbox" >
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell >Avatar</TableCell>
                                        <TableCell >Name</TableCell>
                                        <TableCell >Username</TableCell>
                                        <TableCell >Email</TableCell>
                                        <TableCell >Role</TableCell>
                                        <TableCell >Edit</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {data
                                        .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                                        .map(user => (
                                            <TableRow className='tableRow' key={user.id} >
                                                <TableCell padding="checkbox">
                                                    <Checkbox onChange={() => {
                                                        SetIsChecked(true)
                                                        setUserIdDelete([...userIdDelete, Number(user.id)])
                                                    }} />
                                                </TableCell>
                                                <TableCell >
                                                    <Avatar className='image' src={user.avatar} alt="Avatar" />
                                                </TableCell>
                                                <TableCell >{user.fullName}</TableCell>
                                                <TableCell >{user.userName}</TableCell>
                                                <TableCell >{user.email}</TableCell>
                                                <TableCell >{user.role}</TableCell>
                                                <TableCell >
                                                    <IconButton  >
                                                        <EditIcon onClick={() => setOpen(true)} />
                                                    </IconButton>
                                                    <IconButton  >
                                                        <DeleteIcon onClick={() => handleOneDelete(user.id)} />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>

                            </Table>
                            <Pagination
                                count={Math.ceil(data.length / rowsPerPage)}
                                page={page}
                                onChange={(e, value) => setPage(value)}
                                color='primary'
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: "center",
                                    padding: 4,

                                    '& .MuiPaginationItem-root': {
                                        opacity: 0.5
                                    },
                                    '& .Mui-selected': {
                                        opacity: 1
                                    }
                                }}
                            />
                        </TableContainer>
                    </Grid>
                </Grid>

            </Box >
        </ThemeProvider>
    );
}

export default UserTable;