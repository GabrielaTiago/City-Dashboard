import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { DetailTool } from '../../shared/components';
import { usePeopleContext } from '../../shared/contexts';
import { LayoutPageBase } from '../../shared/layouts';
import { PeopleService } from '../../shared/services/personApi';
import { VTextField } from '../../shared/forms';

interface IFormData {
  fullName: string;
  email: string;
  cityId: number;
}

export function DetailPeople(): JSX.Element {
  const { id = 'nova' } = useParams<'id'>();
  const personId= Number(id);
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = usePeopleContext();
  const [name, setName] = useState('');
  const formRef = useRef<FormHandles>(null);
  
  useEffect(() => { 
    setIsLoading(true);

    if( id !== 'nova') {
      PeopleService.getById(personId)
        .then(res => {
          setIsLoading(false);

          if(res instanceof Error) {
            alert(res.message);
            navigate('/pessoas');
          } else {
            setName(res.fullName);
            formRef.current?.setData(res);
          }
        });
    } else {
        setIsLoading(false);

        formRef.current?.setData({
          fullName: '',
          email: '',
          cityId: ''
        });
    }
  }, [id]);

  function handleSave(data: IFormData) {
    setIsLoading(true);

    const city = Number(data.cityId);

    if(id === 'nova') {
      PeopleService
        .create({...data, cityId: city})
        .then(res => {
          setIsLoading(false);
          
          if(res instanceof Error) {
            alert(res.message);
          } else {
            navigate(`/pessoas/detalhe/${res}`);
          }
        });
    } else {
      PeopleService
        .updateById(personId, { id: personId, ...data, cityId: city })
        .then(res => {
          setIsLoading(false);
          
          if(res instanceof Error) {
            alert(res.message);
          } else {
            alert('Usuário atualizado com sucesso');
          }
        });
    }
  }

  function handleDelete(id: number) {
    setIsLoading(true);

    if(confirm('Realmente deseja apagar?')){
      PeopleService.deleteById(id)
        .then( res => {        
          setIsLoading(false);

          if(res instanceof Error) {
            alert(res.message);
          } else {
            alert('Registro apagado com sucesso');
            navigate('/pessoas');
          }
        });
    }
  }

  return (
    <LayoutPageBase
      title={id === 'nova' ? 'Nova Pessoa' : name }
      taskBar={
        <DetailTool
          textNewButton='nova'
          displaySaveAndCloseButton
          displayNewButton={id !== 'nova'}
          displayDeleteButton={id !== 'nova'}

          clickInSave={() => formRef.current?.submitForm()}
          clickInSaveAndClose={() => formRef.current?.submitForm()}
          clickInDelete={() => handleDelete(personId)}
          clickInNew={() => navigate('/pessoas/detalhe/nova')}
          clickInReturn={() => navigate('/pessoas')}
        />
      }
    >
      <Form ref={formRef} onSubmit={(data) => handleSave(data)}>
        <Box
          height='auto'
          component={Paper}
          variant='outlined'
          display='flex'
          flexDirection='column'
          margin={1}
        >
          <Grid container direction='column' padding={2} spacing={2}>

            {isLoading && (
              <Grid item>
                 <LinearProgress variant='indeterminate'></LinearProgress>
              </Grid>
            )}
            
            <Grid item>
              <Typography variant='h6'>Geral</Typography>
            </Grid>
            
            <Grid container item>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Nome Completo'
                  type='text' 
                  name='fullName' 
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Email'
                  type='email'
                  name='email'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Cidade'
                  type='text'
                  name='cityId'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>
            
          </Grid>
        </Box>
      </Form>
    </LayoutPageBase>
  );
}
