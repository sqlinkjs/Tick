import QueryAPI from "./queries";

export const BASE_URL = "http://localhost:3001";
export const AUTH_URL = `${BASE_URL}/auth`;
export const TABLE_URL = `${BASE_URL}/table`;
export const PROCEDURE_URL = `${BASE_URL}/procedure`;

export function loginUser({
  data,
}: {
  data: { email: string; password: string };
}) {
  return fetch(AUTH_URL + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function registerUser({
  data,
}: {
  data: { email: string; password: string };
}) {
  let res = await fetch(AUTH_URL + "/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.status === 201) {
      return {sucess:true,message:"User registered successfully"}
    }else{
      return {sucess:false,message:"Unable to register user, users table insertion failed"}
    }
  }
