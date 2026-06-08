import axios from "axios";

const api = axios.create({
  baseURL: "https://parseapi.back4app.com",
  headers: {
    "X-Parse-Application-Id": process.env.NEXT_PUBLIC_BACK4APP_APP_ID || "UtvEQJs7CunvfkxzP3yPlX4jbqZxA8Kej3vFRGF8",
    "X-Parse-REST-API-Key": process.env.NEXT_PUBLIC_BACK4APP_REST_KEY || "KdYdm1xRplRU8GkSl6Eofxs2xR7yEQZ0LgxnrvBJ",
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use((config) => {
  const sessionToken = localStorage.getItem("sessionToken");
  if (sessionToken) {
    config.headers["X-Parse-Session-Token"] = sessionToken;
  }
  return config;
});


function getCurrentUser() {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
}

export async function getTasks() {
  const user = getCurrentUser();

 
  const where = encodeURIComponent(
    JSON.stringify({
      owner: {
        __type: "Pointer",
        className: "_User",
        objectId: user.objectId,
      },
    })
  );

  const response = await api.get(`/classes/Task?where=${where}`);
  return response.data;
}

export async function addTask(task) {
  const user = getCurrentUser();

  const response = await api.post("/classes/Task", {
    ...task,
    owner: {
      __type: "Pointer",
      className: "_User",
      objectId: user.objectId,
    },
   
    ACL: {
      [user.objectId]: { read: true, write: true },
    },
  });
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
  localStorage.setItem("currentUser", JSON.stringify(response.data));
  return response.data;
}

export async function logoutUser() {
  const sessionToken = localStorage.getItem("sessionToken");
  await api.post(
    "/logout",
    {},
    {
      headers: { "X-Parse-Session-Token": sessionToken },
    }
  );
  localStorage.removeItem("sessionToken");
  localStorage.removeItem("currentUser");
}

export async function forgotPassword(email) {
  return await api.post("/requestPasswordReset", { email });
}
export async function updateTask({ objectId, done, description }) {
  const body = {};

  if (description !== undefined) body.description = description;  
  if (done !== undefined) body.done = !done;                       

  const response = await api.put(`/classes/Task/${objectId}`, body);
  return response.data;
}
export async function updateTask({ objectId, done, description, favorite }) {
  const body = {};
  if (description !== undefined) body.description = description;
  if (done !== undefined) body.done = !done;
  if (favorite !== undefined) body.favorite = favorite;

  const response = await api.put(`/classes/Task/${objectId}`, body);
  return response.data;
}
