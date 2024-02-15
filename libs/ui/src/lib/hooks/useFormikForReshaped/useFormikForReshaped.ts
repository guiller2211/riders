import { useCallback } from 'react';
import { useFormik } from 'formik';
import type { FormikConfig, FormikValues } from 'formik';

import { mapEventKeyToParam } from './useFormikForReshaped.utils';

export const useFormikForReshaped = <
  Values extends FormikValues = FormikValues,
>(
  options: FormikConfig<Values>,
) => {
  const { handleChange, ...rest } = useFormik<Values>(options);

  const onChangeReshapedHandler = useCallback(
    mapEventKeyToParam(handleChange),
    [handleChange],
  );

  return {
    ...rest,
    onChangeReshapedHandler,
  };
};
