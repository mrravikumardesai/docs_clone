import { AccountCircle, MailOutlineRounded, PasswordRounded } from '@mui/icons-material'
import { Box, Button, Chip, Container, TextField, Typography } from '@mui/material'
import { ErrorMessage, Form, Formik } from 'formik'


function LoginPage() {
    return (
        <Box
            role="div"
            className="loginHero"
            sx={{
            }}>
            <Box
                role='div'
                sx={{
                    backdropFilter: 'blur(10px)',
                    width: "100vw",
                    height: "100vh",
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                }}
            >
                <Container

                    sx={{
                        height: "50vh", width: "80%", borderRadius: 1, color: "#0F2C59", display: 'flex', justifyContent: 'center', alignItems: 'center',
                        // border:"10px solid white",
                        background:"#EADBC8"
                    }}>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validate={values => {
                            const errors: any = {};
                            if (!values.email) {
                                errors.email = 'Required';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address';
                            }
                            else if (
                                !values.password
                            ) {
                                errors.password = 'Please enter password';
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            // setTimeout(() => {
                            //     alert(JSON.stringify(values, null, 2));
                            //     setSubmitting(false);
                            // }, 400);

                            console.log(values)
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */
                        }) => (
                            <Form>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1 }}>

                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <MailOutlineRounded sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField
                                            id="input-with-sx"
                                            label="Email"
                                            variant="standard"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name='email'
                                            value={values.email}
                                        />
                                    </Box>
                                    <ErrorMessage name="email" component="div" />

                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <PasswordRounded sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField
                                            id="input-with-sx"
                                            label="Password"
                                            variant="standard"
                                            type='password'
                                            sx={{ borderColor: "#0F2C59", color: "#0F2C59", }}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            name='password'
                                        />
                                    </Box>

                                    <ErrorMessage name="password" component="div" />
                                    {/* <Chip 
                                        label="Login" 
                                        variant="outlined" 
                                        sx={{ borderColor: "#0F2C59" }} 
                                        onClick={() => { console.log("DSAJKd") }}
                                        
                                        
                                        /> */}
                                    <Button
                                        type='submit'
                                        variant='text'
                                        color='inherit'
                                    >
                                        Login
                                    </Button>

                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Container>
            </Box>


        </Box>
    )
}

export default LoginPage