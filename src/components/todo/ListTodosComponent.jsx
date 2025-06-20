import { useEffect, useState } from "react"
import { deleteTodoApi, retrieveAllTodosForUsernameApi } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useNavigate } from "react-router-dom"
import React from "react"
import { 
    Paper, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow,
    IconButton,
    Button,
    Typography,
    Box,
    Fab,
    Alert,
    Fade,
    Tooltip
} from '@mui/material'
import { 
    Delete as DeleteIcon, 
    Edit as EditIcon,
    Add as AddIcon,
    CheckCircle as CheckCircleIcon,
    RadioButtonUnchecked as UncheckedIcon
} from '@mui/icons-material'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

function ListTodosComponent() {
    const today = new Date()
    const targetDate = new Date()
    targetDate.setFullYear(today.getFullYear() + 5)
    targetDate.setMonth(today.getMonth())
    targetDate.setDate(today.getDate())

    const [todos, setTodos] = useState([])
    const [message, setMessage] = useState(null)

    const authContext = useAuth()
    const username = authContext.username
    const navigate = useNavigate()

    useEffect(() => refreshTodos(), [])

    function refreshTodos() {
        retrieveAllTodosForUsernameApi(username)
            .then((response) => {
                setTodos(response.data);
            })
            .catch((error) => {
                toast.error('Failed to load todos')
                console.log(error)
            });
    }

    function deleteTodo(id) {
        deleteTodoApi(username, id)
            .then(() => {
                refreshTodos()
                toast.success('Todo deleted successfully')
            })
            .catch(() => {
                toast.error('Failed to delete todo')
            });
    }

    function updateTodo(id) {
        navigate(`/todo/${id}`)
    }

    function addNewTodo() {
        navigate('/todo/-1')
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Your Todos
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                    Manage your tasks effectively
                </Typography>
            </Box>

            {message && (
                <Fade in={Boolean(message)}>
                    <Alert 
                        severity="success" 
                        sx={{ mb: 2 }}
                        onClose={() => setMessage(null)}
                    >
                        {message}
                    </Alert>
                </Fade>
            )}

            <Paper elevation={2} sx={{ overflow: 'hidden', mb: 4 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>Target Date</TableCell>
                                <TableCell align="center">Done</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {todos.map((todo) => (
                                <TableRow
                                    key={todo.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        '&:hover': { bgcolor: 'action.hover' },
                                        transition: 'background-color 0.2s'
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {todo.description}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(todo.targetDate).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell align="center">
                                        {todo.done ? 
                                            <CheckCircleIcon color="success" /> : 
                                            <UncheckedIcon color="action" />
                                        }
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Edit">
                                            <IconButton 
                                                onClick={() => updateTodo(todo.id)}
                                                color="primary"
                                                size="small"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton
                                                onClick={() => deleteTodo(todo.id)}
                                                color="error"
                                                size="small"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <Fab 
                color="primary" 
                aria-label="add"
                onClick={addNewTodo}
                sx={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32,
                }}
            >
                <AddIcon />
            </Fab>
        </motion.div>
    )
}

export default ListTodosComponent