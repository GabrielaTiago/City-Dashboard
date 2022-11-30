import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from '@unform/web';

import { DetailTool } from '../../shared/components';
import { usePeopleContext } from '../../shared/contexts';
import { LayoutPageBase } from '../../shared/layouts';
import { PeopleService } from '../../shared/services/personApi';
import { VTextField } from '../../shared/forms';


export function DetailPeople(): JSX.Element {
  const { id = 'nova' } = useParams<'id'>();
  const personId= Number(id);
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = usePeopleContext();
  const [name, setName] = useState('');
  
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
          }
        })
    }
  }, [id]);

  function handleSave() {
    // to do
  }

  function handleDelete(id: number) {
    if(confirm('Realmente deseja apagar?')){
        PeopleService.deleteById(id)
          .then( res => {
            console.log(res);
            
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

          clickInSave={() => handleSave()}
          clickInSaveAndClose={() => handleSave()}
          clickInDelete={() => handleDelete(personId)}
          clickInNew={() => navigate('/pessoas/detalhe/nova')}
          clickInReturn={() => navigate('/pessoas')}
        />
      }
    >
      <Form onSubmit={(data) => console.log(data)}>
        <VTextField name='Nome Completo' />
        <VTextField name='email' />
        <button type='submit'>manda lá</button>
      </Form>
    </LayoutPageBase>
  );
}
