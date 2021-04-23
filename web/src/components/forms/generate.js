import React, { useState } from "react";
import { useForm } from "react-hook-form";
import client from "../../utils/client";
import { sanitizeString } from "../../utils/";

export default function GenerateForm(props) {
  const { setShowResult, setResultData, brands, countries } = props;
  const [error, setError] = useState(false);
  const { register, handleSubmit } = useForm();
  const money = [
    "$500-$1000",
    "$1000-$5000",
    "$5000-$10000",
    "$10000-$50000",
    "$50000-$100000",
  ];
  const months = ["Random", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const years = [
    "Random",
    2021,
    2022,
    2023,
    2024,
    2025,
    2026,
    2027,
    2028,
    2029,
    2030,
  ];

  const onSubmit = (data) => {
    const { brand, country, cvv, pin, month, year, money, quantity } = data;
    const params = {};

    params["brand"] = brand;
    params["country"] = country;
    if (quantity.length > 0) params["quantity"] = quantity;
    if (cvv.length > 0) params["cvv"] = cvv;
    if (pin.length > 0) params["pin"] = pin;
    if (month !== "Random") params["month"] = month;
    if (year !== "Random") params["year"] = year;
    if (money) {
      const limits = [];
      const amounts = money.split("-");
      amounts.map((amount) => {
        return limits.push(sanitizeString(amount));
      });
      params["minMoney"] = limits[0];
      params["maxMoney"] = limits[1];
    }
    client
      .post("/generator/generate", params)
      .then((cards) => {
        setResultData(cards.data);
        setShowResult(true);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  return (
    <div className="max-w-md mx-auto text-center">
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">
            Something went wrong. Please try again later.
          </span>
        </div>
      )}
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="container mx-auto">
          <div className="grid grid-cols-2 grid-flow-row gap-4 mb-4">
            <div>
              <label
                className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                htmlFor="brand"
              >
                Issuing Authority
              </label>
              <select
                {...register("brand")}
                id="brand"
                name="brand"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                {brands ? (
                  brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))
                ) : (
                  <option key="visa" value="VISA">
                    VISA
                  </option>
                )}
              </select>
            </div>

            <div>
              <label
                className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                htmlFor="country"
              >
                Country
              </label>
              <select
                {...register("country")}
                id="country"
                name="country"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                {countries ? (
                  countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))
                ) : (
                  <option key="afghanistan" value="Afghanistan">
                    Afghanistan
                  </option>
                )}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 grid-flow-row gap-4 mb-4">
            <div className="grid grid-cols-2 grid-flow-row gap-4">
              <div>
                <label
                  className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                  htmlFor="cvv"
                >
                  CVV/CVV2
                </label>
                <input
                  {...register("cvv")}
                  type="number"
                  id="cvv"
                  name="cvv"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Random"
                />
              </div>
              <div>
                <label
                  className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                  htmlFor="cvv"
                >
                  PIN
                </label>
                <input
                  {...register("pin")}
                  type="number"
                  id="pin"
                  name="pin"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Random"
                />
              </div>
            </div>
            <div>
              <label
                className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                htmlFor="brand"
              >
                Money ($)
              </label>
              <select
                {...register("money")}
                id="money"
                name="money"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                {money ? (
                  money.map((amount) => (
                    <option key={amount} value={amount}>
                      {amount}
                    </option>
                  ))
                ) : (
                  <option key="loading" value="loading">
                    Loading
                  </option>
                )}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 grid-flow-row gap-4 mb-4">
            <div>
              <div>
                <label
                  className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                  htmlFor="country"
                >
                  Quantity
                </label>
                <input
                  {...register("quantity")}
                  type="number"
                  id="quantity"
                  name="quantity"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="1"
                />
              </div>
            </div>

            <div>
              <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                Date (MM)
              </label>
              <select
                {...register("month")}
                id="month"
                name="month"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                Date (YYYY)
              </label>
              <select
                {...register("year")}
                id="year"
                name="year"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Generate
          </button>
        </div>
      </form>
    </div>
  );
}
