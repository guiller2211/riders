import { object, string } from 'yup';

import { Fields } from './EditPersonalDetailsForm.enums';
import type { PersonalDetailsFormState } from './EditPersonalDetailsForm.types';

enum Errors {
  PasswordMatch = 'Passwords do NOT match',
}

export const INITIAL_STATE: PersonalDetailsFormState = {
  [Fields.FirstName]: '',
  [Fields.LastName]: '',
  [Fields.Email]: '',
  [Fields.PhoneNumber]: '',
  [Fields.CurrentPassword]: '',
  [Fields.NewPassword]: '',
  [Fields.NewPasswordConfirm]: '',
};

export const VALIDATION_SCHEMA = object().shape({
  [Fields.Email]: string().email().required(),
  [Fields.NewPassword]: string().test(
    'PasswordMatch',
    Errors.PasswordMatch,
    function test(value) {
      return value === this.parent[Fields.NewPasswordConfirm];
    },
  ),
  [Fields.NewPasswordConfirm]: string().test(
    'PasswordMatch',
    Errors.PasswordMatch,
    function test(value) {
      return value === this.parent[Fields.NewPassword];
    },
  ),
});
