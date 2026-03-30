import apiRequest from "./apiRequest";

function login(payload: { login: string; password: string }) {
  const formData = new FormData();
  formData.append("login", payload.login);
  formData.append("password", payload.password);

  return apiRequest<string>("/login", { method: "POST", body: formData });
}

export default {
  login,
};
