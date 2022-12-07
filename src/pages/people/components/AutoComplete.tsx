import { useEffect, useMemo, useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useField } from '@unform/core';
import { usePeopleContext } from '../../../shared/contexts';
import { useDebounce } from '../../../shared/hooks';
import { CitiesService } from '../../../shared/services/citiesApi';

type TAutoCompleOption = {
  id: number;
  label: string;
}

export function AutoComplete(): JSX.Element {
  const delay: number = 500;
  const { debounce } = useDebounce(delay, true);
  const {isLoading, setIsLoading } =  usePeopleContext();
  const { fieldName, registerField, defaultValue, error, clearError } = useField('cityId');
  
  const [options, setOptions] = useState<TAutoCompleOption[]>([]);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId)
    });
  }, [registerField, fieldName, selectedId]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CitiesService.getAll(1, search ).then((res) => {
        setIsLoading(false);
        
        if(res instanceof Error){

        } else {
          const optionsData = res.data.map((city) => ({ id: city.id, label: city.name }));
          setOptions(optionsData);
        }
      });
    });
  }, [search]);

  const autoCompleteSelectedOption = useMemo(() => {
    if(!selectedId) return null;

    const selectedOption = options.find(option => option.id === selectedId);
    if(!selectedOption) return null;

    return selectedOption;
  }, [selectedId, options]);

  return (
    <Autocomplete
      openText='Abrir'
      closeText='Fechar'
      noOptionsText='Sem opções'
      loadingText='Carregando...'

      disablePortal

      options={options}
      value={autoCompleteSelectedOption}

      loading={isLoading}
      popupIcon={isLoading ? <CircularProgress size={22}/> :  undefined}

      onInputChange={(_, value) => setSearch(value)}
      onChange={(_, value) => {
        setSelectedId(value?.id);
        setSearch('oi');
        clearError();
      }}
      renderInput={(params) => (
        <TextField 
          { ...params }

          label='Cidade'

          error={!!error}
          helperText={error}
        />
      )}
    />
  );
}