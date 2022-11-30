import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailTool } from '../../shared/components';
import { usePeopleContext } from '../../shared/contexts';
import { LayoutPageBase } from '../../shared/layouts';
import { PeopleService } from '../../shared/services/personApi';


export function DetailPeople(): JSX.Element {
  const { id = 'nova' } = useParams<'id'>();
  const personId= Number(id);
  const navigate = useNavigate();
  const { setIsLoading } = usePeopleContext();
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

  function handleDelete() {
    // to do
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
          clickInDelete={() => handleDelete()}
          clickInNew={() => navigate('/pessoas/detalhe/nova')}
          clickInReturn={() => navigate('/pessoas')}
        />
      }
    >
    </LayoutPageBase>
  );
}
