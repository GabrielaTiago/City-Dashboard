import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Box, Button, CircularProgress, Grid, Paper, Typography } from '@mui/material';
import { useAuthContext } from '../../contexts';
import { IVFormErrors, VForm, VTextField } from '../../forms';
import { useForm } from '../../hooks';
import { loginValidationSchema } from '../../schemas';
import { AuthService, ILoginData } from '../../services/auth/authApi';
import { TChildrenProps } from '../../types';

export function Login({ children }: TChildrenProps) {
  const { isAuthenticaded, login } = useAuthContext();
  const { formRef, save } = useForm();
  const [teste, setTeste] = useState(false);
  const navigate = useNavigate();

  function validateLogin(data: ILoginData) {
    setTeste(true);
    console.log(teste)

    loginValidationSchema
      .validate(data, { abortEarly: false })
      .then((validData) => {
        handleLogin(validData);
      })
      .catch((err:  yup.ValidationError) => {
          setTeste(false);
          const validationErrors: IVFormErrors = {};
            
          err.inner.forEach(error => {
            if(!error.path) return;

            validationErrors[error.path] = error.message;
          });
            
          console.log(validationErrors);
          formRef.current?.setErrors(validationErrors);
      });
  }

  function handleLogin(data: ILoginData) {

    AuthService
      .signIn(data)
      .then(res => {
        setTeste(false);

        if(res instanceof Error) {
            alert(res.message);
        } else {
          login(data);
          navigate('/');
        }
      });
  }

  if (isAuthenticaded) {
    return (
      <>{children}</>
    );
  } else {
    return (
      <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>
        <VForm ref={formRef} onSubmit={(data) => validateLogin(data)}>
          <Box
            height='auto'
            component={Paper}
            variant='outlined'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            margin={1}
            padding={3.5}
            borderRadius={8}
          >
            <Grid container direction='column' padding={2} spacing={2}>

              <Grid item>
                <Typography variant='h5' align='center'>Login</Typography>
              </Grid>

              <Grid container item spacing={2}>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <VTextField 
                    fullWidth
                    label='Email'
                    type='email' 
                    name='email' 
                    disabled={teste}
                  />
                </Grid>

                <Grid item  xs={12} sm={12} md={12} lg={12} xl={12}>
                  <VTextField 
                    fullWidth
                    label='Senha'
                    type='password' 
                    name='password' 
                    disabled={teste}
                  />
                </Grid>

              </Grid>
            </Grid>

            <Button
              sx={{ m: 2 }}
              variant='contained'
              type='submit'
              size='large'
              disabled={teste}
              endIcon={teste ? <CircularProgress variant='indeterminate' color='primary' size={20}/> : <></>}
              
              onClick={() => save()}>
                Entrar
            </Button>
          </Box>
        </VForm>
      </Box>
    );
  }
    
}
