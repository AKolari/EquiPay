"use client";

import React from "react";

import "/src/app/globals.css";

import { registerUser } from "../utils/dataQuery";
import { useReducer } from "react";
import { useRouter } from "next/navigation";


const Register = () => {
  //useUserMustBeLogged("out", "/User");
  const router = useRouter();


  const keyText = (key, type) => {
    switch (key) {
      case "email":
        if (type === "placeholder") {
          return "name@company.com";
        } else {
          return "Enter your email";
        }

      case "first_name":
        if (type === "placeholder") {
          return "John";
        } else {
          return "Your First Name";
        }

      case "last_name":
        if (type === "placeholder") {
          return "Doe";
        } else {
          return "Your Last Name";
        }
      case "username":
        if (type === "placeholder") {
          return "John_Doe";
        } else {
          return "Your User Name";
        }
      case "password":
        if (type === "placeholder") {
          return "••••••••";
        } else {
          return "Your Password";
        }
      default:
        return key;
    }
  };

  function reducer(state, action) {
    switch (action.type) {
      case "email":
      case "first_name":
      case "last_name":
      case "username":
      case "password":
        return { ...state, [action.type]: action.value };
      case "loading":
        return { ...state, loading: action.loading };
      case "response":
        return { ...state, response: action.response };
    }

    throw Error("Unknown action." + action.type);
  }

  const initialState = {
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    response: "",
    loading: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    email,
    first_name,
    last_name,
    username,
    password,
    response,
    loading,
  } = state;

  const register = async (e) => {
    console.log("Submission started");
    dispatch({ type: "loading", loading: true });
    e.preventDefault();

    const response = await registerUser(
      email,
      first_name,
      last_name,
      username,
      password
    );
    dispatch({ type: "response", response });
    dispatch({ type: "loading", loading: false });
    if (!!response?.success) {
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
    console.log(response)
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
     

      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign Up for an account
              </h1>
              <form
               
                onSubmit={register}
                className={loading ? "space-y-4 md:space-y-6 opacity-[10%] pointer-events-none" : "space-y-4 md:space-y-6"}
                action="#"
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
                      <div key={key} className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          {keyText(key)}*
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
                          placeholder={keyText(key, "placeholder")}
                        />
                      </div>
                    );
                  })}


                <button
                  type="submit"
                  className="text-white bg-stone-700 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-stone-600 dark:hover:bg-stone-700 dark:focus:ring-stone-800"
                  href="/login"
                >
                  Sign Up
                </button>
              
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;