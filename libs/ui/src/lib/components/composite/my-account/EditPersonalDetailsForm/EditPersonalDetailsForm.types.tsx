import type { FormikConfig } from 'formik';

import type { ViewProps } from '../../../atomic';
import type { Fields } from './EditPersonalDetailsForm.enums';

export type EditPersonalDetailsFormProps = ViewProps & {
  initialValues?: PersonalDetailsFormState;
  onSubmit?: FormikConfig<PersonalDetailsFormState>['onSubmit'];
};

export type PersonalDetailsFormState = {
  [Fields.FirstName]: string;
  [Fields.LastName]: string;
  [Fields.Email]: string;
  [Fields.PhoneNumber]: string;
  [Fields.CurrentPassword]: string;
  [Fields.NewPassword]: string;
  [Fields.NewPasswordConfirm]: string;
};
