import axios from "axios";

const api = axios.create({
  baseURL: "https://parseapi.back4app.com",
  headers: {
    "X-Parse-Application-Id": "UtvEQJs7CunvfkxzP3yPlX4jbqZxA8Kej3vFRGF8",
    "X-Parse-REST-API-Key": "KdYdm1xRplRU8GkSl6Eofxs2xR7yEQZ0LgxnrvBJ",
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
  const response = await api.get(
    `/login?username=${username}&password=${password}`
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
