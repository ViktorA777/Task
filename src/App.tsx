import { useEffect, useState } from "react";

import "./App.css";
import { modelService } from "./api/modelService";

interface Param {
  id: number;
  name: string;
  type: "string";
}

export interface ParamValue {
  paramId: number;
  value: string;
}

export interface Model {
  paramValues: ParamValue[];
  colors: string[];
}

const params: Param[] = [
  { id: 1, name: "Назначение", type: "string" },
  { id: 2, name: "Длина", type: "string" },
];

const initialModel: Model = {
  paramValues: [
    { paramId: 1, value: "повседневное" },
    { paramId: 2, value: "макси" },
  ],
  colors: [],
};

export const App: React.FC = () => {
  const [paramValues, setParamValues] = useState<ParamValue[]>(
    initialModel.paramValues
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (paramId: number, newValue: string) => {
    setParamValues((prevState) =>
      prevState.map((paramValue) =>
        paramValue.paramId === paramId
          ? { ...paramValue, value: newValue }
          : paramValue
      )
    );
  };

  const fetchModel = async () => {
    setIsLoading(true);
    try {
      const model = await modelService.getModel(paramValues);
      console.log("Модель:", model);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchModel();
  }, [paramValues]);

  return (
    <>
      {isLoading ? (
        <div>Загрузка...</div>
      ) : (
        <div className="param">
          {params.map((param) => {
            const currentValue = paramValues.find(
              (value) => value.paramId === param.id
            )?.value;

            return (
              <div className="content" key={param.id}>
                <label>{param.name}</label>
                <input
                  type="text"
                  value={currentValue || ""}
                  onChange={(e) => handleChange(param.id, e.target.value)}
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
