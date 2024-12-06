import { Model, ParamValue } from "../App";

export const modelService = {
  getModel: (paramValues: ParamValue[]): Promise<Model> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          paramValues,
          colors: [],
        });
      }, 1000);
    });
  },
};
