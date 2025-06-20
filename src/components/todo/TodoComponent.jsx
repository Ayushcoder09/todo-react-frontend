import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { retrieveTodoApi, updateTodoApi, createTodoApi } from './api/TodoApiService'
import { useAuth } from './security/AuthContext'
import React from "react"
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import {
    TextField,
    Button,
    Paper,
    Typography,
    Box,
    Stack,
    Alert
} from '@mui/material'
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

const validationSchema = Yup.object({
    description: Yup.string()
        .required('Description is required')
        .min(3, 'Description must be at least 3 characters'),
    targetDate: Yup.date()
        .required('Target date is required')
        .min(new Date(), 'Target date must be in the future')
});

export default function TodoComponent() {
    const { id } = useParams()
    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState('')
    const [error, setError] = useState('')

    const authContext = useAuth()
    const navigate = useNavigate()
    const username = authContext.username

    useEffect(() => {
        retrieveTodos();
    }, [retrieveTodos]);

    function retrieveTodos() {
        if (id !== -1) {
            retrieveTodoApi(username, id)
                .then(response => {
                    setDescription(response.data.description)
                    setTargetDate(response.data.targetDate)
                })
                .catch(error => {
                    setError('Failed to load todo')
                    console.log(error)
                })
        }
    }

    function onSubmit(values) {
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }

        const promise = id === -1 
            ? createTodoApi(username, todo)
            : updateTodoApi(username, id, todo)

        promise
            .then(() => {
                toast.success(id === -1 ? 'Todo created successfully' : 'Todo updated successfully')
                navigate('/todos')
            })
            .catch(error => {
                toast.error('Failed to save todo')
                console.log(error)
            })
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Box sx={{ mb: 4 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/todos')}
                    sx={{ mb: 2 }}
                >
                    Back to Todos
                </Button>
                <Typography variant="h4" component="h1" gutterBottom>
                    {id === -1 ? 'Create Todo' : 'Edit Todo'}
                </Typography>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Paper elevation={2} sx={{ p: 4 }}>
                <Formik
                    initialValues={{
                        description: description,
                        targetDate: targetDate ? moment(targetDate).format('YYYY-MM-DD') : ''
                    }}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ values, setFieldValue, errors, touched, handleChange, handleBlur }) => (
                        <Form>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    id="description"
                                    name="description"
                                    label="Description"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.description && Boolean(errors.description)}
                                    helperText={touched.description && errors.description}
                                    multiline
                                    rows={3}
                                />

                                <TextField
                                    fullWidth
                                    id="targetDate"
                                    name="targetDate"
                                    label="Target Date"
                                    type="date"
                                    value={values.targetDate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.targetDate && Boolean(errors.targetDate)}
                                    helperText={touched.targetDate && errors.targetDate}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                    <Button
                                        variant="outlined"
                                        onClick={() => navigate('/todos')}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        {id === -1 ? 'Create' : 'Save'}
                                    </Button>
                                </Box>
                            </Stack>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </motion.div>
    )
}
