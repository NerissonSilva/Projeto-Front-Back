import axios from "axios";

const api = axios.create({
  baseURL: "https://parseapi.back4app.com",
  headers: {
    "X-Parse-Application-Id": process.env.NEXT_PUBLIC_BACK4APP_APP_ID || "",
    "X-Parse-REST-API-Key": process.env.NEXT_PUBLIC_BACK4APP_REST_KEY || "",
    "Content-Type": "application/json",
  },
});

export async function getTasks() {
  const response = await api.get("/classes/Task");
  return response.data;
}

export async function addTask(task) {
  const response = await api.post("/classes/Task", task);
  return response.data;
}

export async function deleteTask(objectId) {
  const response = await api.delete(`/classes/Task/${objectId}`);
  return response.data;
}

export async function updateTask({ objectId, done }) {
  const response = await api.put(`/classes/Task/${objectId}`, {
    done: !done,
  });

  return response.data;
}

export async function registerUser(user) {
  const response = await api.post("/users", user);
  return response.data;
}

export async function loginUser({ username, password }) {
  const response = await api.post(
    "/login",
    {
      username,
      password,
    }
  );

  localStorage.setItem("sessionToken", response.data.sessionToken);

  return response.data;
}

export async function logoutUser() {
  const sessionToken = localStorage.getItem("sessionToken");

  await api.post(
    "/logout",
    {},
    {
      headers: {
        "X-Parse-Session-Token": sessionToken,
      },
    }
  );

  localStorage.removeItem("sessionToken");
}

export async function forgotPassword(email) {
  return await api.post("/requestPasswordReset", {
    email,
  });
}
