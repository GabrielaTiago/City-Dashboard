import * as yup from 'yup';
import { IFormData } from '../../pages';

export const personValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  fullName: yup.string().min(3).required('Campo "Nome Completo" é obrigatótio'),
  email: yup.string().email('Digite um email válido').required('Campo "Email" é obrigatótio'),
  cityId: yup.number().positive().integer().required('Campo "Cidade" é obrigatótio')
});
