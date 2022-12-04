import * as yup from 'yup';
import { IFormCityData } from '../../pages';

export const cityValidationSchema: yup.SchemaOf<IFormCityData> = yup.object().shape({
  name: yup.string().min(3).required(),
  state: yup.string().min(2).required()
});
