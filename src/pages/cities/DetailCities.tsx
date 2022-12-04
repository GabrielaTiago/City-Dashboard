import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import * as yup from 'yup';

import { DetailTool } from '../../shared/components';
import { useCitiesContext } from '../../shared/contexts';
import { LayoutPageBase } from '../../shared/layouts';
import { CitiesService } from '../../shared/services/citiesApi';
import { IVFormErrors, VForm, VTextField } from '../../shared/forms';
import { useForm } from '../../shared/hooks';
import { cityValidationSchema } from '../../shared/schemas';

export interface IFormCityData {
  name: string;
  state: string;
}

export function DetailCities(): JSX.Element {
  const { id = 'nova' } = useParams<'id'>();
  const cityId= Number(id);
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useCitiesContext();
  const [name, setName] = useState('');
  const { formRef, save, saveAndClose, isSaveAndClose } = useForm();
  
  useEffect(() => { 
    setIsLoading(true);

    if( id !== 'nova') {
      CitiesService.getById(cityId)
        .then(res => {
          setIsLoading(false);

          if(res instanceof Error) {
            alert(res.message);
            navigate('/cidades');
          } else {
            setName(res.name);
            formRef.current?.setData(res);
          }
        });
    } else {
        setIsLoading(false);

        formRef.current?.setData({
          name: '',
        });
    }
  }, [id]);

  function handleSave(data: IFormCityData) {
    cityValidationSchema
      .validate(data, { abortEarly: false })
      .then((validData) => {
        saveOrUpdate(validData);
      })
      .catch((err:  yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};

        err.inner.forEach(error => {
          if(!error.path) return;

          validationErrors[error.path] = error.message;
        });

        console.log(validationErrors);
        formRef.current?.setErrors(validationErrors);
      });
  }

  function saveOrUpdate(data: IFormCityData) {
    setIsLoading(true);
      

    if(id === 'nova') {
      CitiesService
        .create({ ...data })
        .then(res => {
          setIsLoading(false);
          
          if(res instanceof Error) {
            alert(res.message);
          } else {
            if (isSaveAndClose()) {
              navigate('/cidades');
            } else {
              navigate(`/cidades/detalhe/${res}`);  
            }
          }
        });
    } else {
      CitiesService
        .updateById(cityId, { id: cityId, ...data })
        .then(res => {
          setIsLoading(false);
          
          if(res instanceof Error) {
            alert(res.message);
          } else {
            if (isSaveAndClose()) {
              alert('Usuário atualizado com sucesso');
              navigate('/cidades');
            } 
          }
        });
    }
  }

  function handleDelete(id: number) {
    setIsLoading(true);

    if(confirm('Realmente deseja apagar?')){
      CitiesService.deleteById(id)
        .then( res => {        
          setIsLoading(false);

          if(res instanceof Error) {
            alert(res.message);
          } else {
            alert('Registro apagado com sucesso');
            navigate('/cidades');
          }
        });
    }
  }

  return (
    <LayoutPageBase
      title={id === 'nova' ? 'Nova cidade' : name }
      taskBar={
        <DetailTool
          textNewButton='nova'
          displaySaveAndCloseButton
          displayNewButton={id !== 'nova'}
          displayDeleteButton={id !== 'nova'}

          clickInSave={() => save()}
          clickInSaveAndClose={() => saveAndClose()}
          clickInDelete={() => handleDelete(cityId)}
          clickInNew={() => navigate('/cidades/detalhe/nova')}
          clickInReturn={() => navigate('/cidades')}
        />
      }
    >
      <VForm ref={formRef} onSubmit={(data) => handleSave(data)}>
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
                  label='Cidade'
                  type='text' 
                  name='name' 
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Estado'
                  type='text' 
                  name='state' 
                  disabled={isLoading}
                />
              </Grid>
            </Grid>
            
          </Grid>
        </Box>
      </VForm>
    </LayoutPageBase>
  );
}
