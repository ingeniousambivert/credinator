import React, { Fragment, useEffect, useState } from "react";
import client from "../utils/client";
import GenerateForm from "./forms/generate";
import VerifyForm from "./forms/verify";
import GenerateResult from "./results/generate";

export default function HomeComponent() {
  const [brands, setBrands] = useState(null);
  const [countries, setCountries] = useState(null);

  const [showGenerateResult, setShowGenerateResult] = useState(false);
  const [generateResultData, setGenerateResultData] = useState(null);

  const [showVerify, setShowVerify] = useState(false);

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
          {showGenerateResult ? (
            <GenerateResult
              resultData={generateResultData}
              setShowResult={setShowGenerateResult}
              setResultData={setGenerateResultData}
            />
          ) : showVerify ? (
            <VerifyForm setShowVerify={setShowVerify} />
          ) : (
            <Fragment>
              <GenerateForm
                setShowResult={setShowGenerateResult}
                setResultData={setGenerateResultData}
                brands={brands}
                countries={countries}
              />
              <div className="max-w-md mx-auto text-center">
                <p className="mb-8 text-gray-500 text-xs"> OR</p>
                <button
                  onClick={() => {
                    setShowVerify(true);
                  }}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Verify
                </button>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
}
