import React, { useState } from "react";
import { useForm } from "react-hook-form";
import client from "../../utils/client";

export default function VerifyForm(props) {
  const { setShowVerify } = props;
  const [error, setError] = useState(false);
  const [result, setResult] = useState(null);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    client
      .post("/generator/verify", data)
      .then((result) => {
        setResult(result.data);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-10 max-w-md mx-auto">
        <button
          className="group relative w-full flex justify-center py-2 px-4 text-center border-transparent text-sm font-medium rounded-md bg-indigo-100 border border-indigo-400 text-indigo-700"
          onClick={() => {
            setShowVerify(false);
          }}
        >
          Go Back
        </button>
      </div>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 text-center rounded relative"
          role="alert"
        >
          <span className="block sm:inline">
            Something went wrong. Please try again later.
          </span>
        </div>
      )}
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="container mx-auto">
          <div>
            <label
              className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
              htmlFor="country"
            >
              Card Number
            </label>
            <input
              required
              {...register("number")}
              type="number"
              id="number"
              name="number"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Enter Card Number"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Verify
          </button>
        </div>
        {result &&
          (result.result ? (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center relative"
              role="alert"
            >
              <span className="block sm:inline">The card number is valid</span>
            </div>
          ) : (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center relative"
              role="alert"
            >
              <span className="block sm:inline">
                The card number is invalid
              </span>
            </div>
          ))}
      </form>
    </div>
  );
}
