"use client";
import React, { useActionState } from "react";
import { submitEmail, submitFullName, submitPassword } from "./actions";
const initialState = {
  message: "",
  error: "",
};
const formsPage = () => {
  const [emailState, emailAction] =useActionState(submitEmail, initialState);
  const [passwordState, passwordAction] =useActionState(submitPassword, initialState);
  const [fullNameState, fullNameAction] =useActionState(submitFullName,initialState);
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
      {/* emailform */}
      <form action={emailAction} className="max-w-md flex flex-col gap-2">
        <h1>email form</h1>
        <input
          type="text"
          name="email"
          placeholder="enter email"
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          eamil Submit
        </button>
        {emailState.message && (
          <p className="text-blue-500">{emailState.message}</p>
        )}
        {emailState.error && (
          <p className="text-red-500">{emailState.error}</p>
        )}
      </form>
      {/* paaswordform */}
      <form action={passwordAction} className="max-w-md flex flex-col gap-2">
        <h1>password form</h1>
        <input
          type="text"
          name="password"
          placeholder="enter password"
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          password Submit
        </button>
        {passwordState.message && (
          <p className="text-blue-500">{passwordState.message}</p>
        )}
        {passwordState.error && (
          <p className="text-red-500">{passwordState.error}</p>
        )}
      </form>
      {/* fullnameform */}
      <form action={fullNameAction} className="max-w-md flex flex-col gap-2">
        <h1>fullName form</h1>
        <input
          type="text"
          name="firstName"
          placeholder="enter firstname"
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="lastName"
          placeholder="enter lastName"
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          fullName Submit
        </button>
        {fullNameState.message && (
          <p className="text-blue-500">{fullNameState.message}</p>
        )}
        {fullNameState.error && (
          <p className="text-red-500">{fullNameState.error}</p>
        )}
      </form>
    </div>
  );
};

export default formsPage;
