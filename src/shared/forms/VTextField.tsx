import { useEffect, useState } from 'react';
import { useField } from '@unform/core';
import { TextField, TextFieldProps } from '@mui/material';

type TVTextFieldProps = TextFieldProps & {
  name: string;
}

export function VTextField({ name, ...props }: TVTextFieldProps): JSX.Element {
  const { fieldName, registerField, defaultValue, error, clearError } = useField(name);
  const [value, setValue] = useState(defaultValue || '');
  
  useEffect(() => {
    registerField({
        name: fieldName,
        getValue: () => value,
        setValue: (_, newValue) => setValue(newValue),
    });
  },[registerField, fieldName, value]);
  
  return (
    <TextField
      {...props}

      error={!!error}
      helperText={error}
      defaultValue={defaultValue}

      onKeyDown={() => error ? clearError() : undefined}

      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
}
