import * as yup from 'yup';
import { ILoginData } from '../services/auth/authApi';

export const loginValidationSchema: yup.SchemaOf<ILoginData> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});
