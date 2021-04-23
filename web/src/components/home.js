import React, { useEffect, useState } from "react";
import FormComponent from "./form";
import client from "../utils/client";
import ResultComponent from "./result";

export default function HomeComponent() {
  const [brands, setBrands] = useState(null);
  const [countries, setCountries] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    client.get("/generator/brands").then((data) => {
      setBrands(data.data);
    });

    client.get("/generator/countries").then((data) => {
      setCountries(data.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-gray-50">
      <div className="mx-auto min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Credinator
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Generate valid credit cards
            </p>
          </div>
          {showResult ? (
            <ResultComponent
              resultData={resultData}
              setShowResult={setShowResult}
              setResultData={setResultData}
            />
          ) : (
            <FormComponent
              setShowResult={setShowResult}
              setResultData={setResultData}
              brands={brands}
              countries={countries}
            />
          )}
        </div>
      </div>
    </div>
  );
}
