import { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';

export function useForm() {  
  const formRef = useRef<FormHandles>(null);

  const isSavingAndClose = useRef(false);
  const isSavingAndNew = useRef(false);
  

  const handleSave = useCallback(() => {
    isSavingAndClose.current = false;
    isSavingAndNew.current = false;

    formRef.current?.submitForm();
  }, []);

  const handleSaveAndClose = useCallback(() => {
    isSavingAndClose.current = true;
    isSavingAndNew.current = false;

    formRef.current?.submitForm();
  }, []);
  const handleSaveAndNew = useCallback(() => {
    isSavingAndClose.current = false;
    isSavingAndNew.current = true;

    formRef.current?.submitForm();
  }, []);


  const handleIsSaveAndClose = useCallback(() => {
    return isSavingAndClose.current;
  }, []);

  const handleIsSaveAndNew = useCallback(() => {
    return isSavingAndNew.current;
  }, []);


  return { 
    formRef,
    save: handleSave,
    saveAndClose: handleSaveAndClose,
    saveAndNew: handleSaveAndNew,
    
    isSaveAndClose: handleIsSaveAndClose,
    isSaveAndNew: handleIsSaveAndNew,
  };
}