"use client";

import React from "react";

import "src/app/globals.css";
import { loginUser, getCurrentID } from "../utils/dataQuery";
import { useReducer } from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Login = () => {
  //The currently logged in user's user_id
  const [localID, setLocalID] = useState("");

  //Gets the user id to put into url link before anything else
  const idFetcher = async () => {
    const hold = await getCurrentID();
    if (hold) {
      setLocalID(hold);
    }
  };

  useEffect(() => {
    idFetcher();
  }, []);

  const router = useRouter();

  function reducer(state, action) {
    switch (action.type) {
      case "email":
      case "password":
        return { ...state, [action.type]: action.value };
      case "loading":
        return { ...state, loading: action.value };
      case "response":
        return { ...state, response: action.value };
    }

    throw Error("Unknown action." + action.type);
  }

  const initialState = {
    email: "",
    password: "",
    response: "",
    loading: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { email, password, response, loading } = state;

  const login = async (e) => {
    dispatch({ type: "loading", value: true });
    dispatch({ type: "response", value: null });
    e.preventDefault();

    const response = await loginUser(email, password);

    dispatch({ type: "response", value: response });
    dispatch({ type: "loading", value: false });

    const hold = await getCurrentID();
    setLocalID(hold);

    if (!!response?.success) {
      console.log(response.data.user.id);
      setLocalID(response.data.user.id);
      setTimeout(() => {
        router.replace(`/user/${response.data.user.id}`);
      }, 1000);
    }

    //Jumps to user page
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {response && (
        <div
          className={`${
            response.success
              ? "bg-green-200 border-2 border-green-800 text-green-800"
              : "bg-red-200 border-2 border-red-800 text-red-800"
          } py-2 px-5 my-10 text-center`}
        >
          <span className="font-bold">
            {response.success
              ? `Success ${response.message ? `: ` : ``}`
              : `Failure: ${response.message}`}
          </span>
        </div>
      )}
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={login}
              >
                {Object.keys(initialState)
                  .filter((k) => !["response", "loading"].includes(k))
                  .map((key) => {
                    let type = "text";
                    if (key === "password") {
                      type = "password";
                    } else if (key === "email") {
                      type = "email";
                    }

                    return (
                      <p key={key} className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Enter {key}*
                        </label>
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                          name={key}
                          onChange={(e) => {
                            dispatch({
                              type: e.target.name,
                              value: e.target.value,
                            });
                          }}
                          value={state[key]}
                          type={type}
                        />
                      </p>
                    );
                  })}

                <button
                  type="submit"
                  className="text-white bg-stone-700 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-stone-600 dark:hover:bg-stone-700 dark:focus:ring-stone-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up!
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
