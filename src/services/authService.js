import dripzoidApi from "./dripzoidApi";

export const loginUser = (
  email,
  password
) =>
  dripzoidApi.post(
    "/api/auth/login",
    {
      email,
      password,
    }
  );

export const getCurrentUser =
  () =>
    dripzoidApi.get(
      "/api/auth/me"
    );

export const logoutUser =
  () =>
    dripzoidApi.post(
      "/api/auth/logout"
    );