import { useState, useEffect } from 'react';
import axios from 'axios';
import { IconButton, Modal, Box, Checkbox, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Pagination, Grid, Avatar, createTheme, ThemeProvider, } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UserForm from './UserForm';
import "../styles/userForm.css";
import AppBars from "../Components/AppBars";


function UserTable() {

    const [open, setOpen] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [data, setData] = useState([]);
    const [isChecked, SetIsChecked] = useState(false);
    const [page, setPage] = useState(1);
    const [userIdDelete, setUserIdDelete] = useState([]);

    const rowsPerPage = 10;
   

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
            alert(error + "Sorry, we are getting an error , please refresh the page and wait.Thank you for your understandingg.")
            // Hata işleme
        }

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
            alert('Something went wrong!');
            // Hata işleme
        }

    }


    return (
        <ThemeProvider theme={theme}>
            <Box className='container'>
                <Grid container >
                    <Grid item md={12}>
                        <AppBars fetchData={fetchData} setOpen={setOpen} setData={data} setSearchValue={setSearchValue} searchValue={searchValue} userIdDelete={userIdDelete} />
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