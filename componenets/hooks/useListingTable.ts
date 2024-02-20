import * as yup from 'yup';

const tableSchema = yup.object({
    page: yup.number(),
    count: yup.number(),
    limit: yup.number().nullable(),
    columns: yup.lazy((obj:any) => {
      if (typeof obj === "object" && !Array.isArray(obj) && obj !== null) {
        const validationObject = {
          label: yup.string().notRequired(),
          is_primary: yup
            .number()
            .default(1)
            .test(
              "is_primary check",
              "is_primary should be 0 or 1 only",
              (val:any) => val === 1 || val === 0
            ),
        };
        const newEntries = Object.keys(obj).reduce(
          (acc, val) => ({
            ...acc,
            [val]: yup.object(validationObject),
          }),
          {}
        );
        return yup.object().shape(newEntries);
      } else return yup.mixed().nullable().required();
    }),
    results: yup.array().required(),
    search_fields: yup.object().nullable(),
    filter_fields: yup.array().nullable(),
    active_tab: yup.string().nullable(),
  });