import * as yup from 'yup';
import { IFormData } from '../../pages';

export const personValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  fullName: yup.string().min(3).required(),
  email: yup.string().email().required(),
  cityId: yup.number().positive().integer().required().typeError('O campo precisa ser um valor numérico')
});
