export async function register(formData) {
  try {
    // console.log(formData);

    const res = await fetch("http://localhost:8000/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data?.error) {
      return { success: null, error: data.error };
    }
    return { success: data, error: null };
  } catch (e) {
    console.log("Register error: ", e);
    return { success: null, error: "Something went wrong!" };
  }
}

export async function login(formData) {
  try {
    console.log("data: ", formData);
    const res = await fetch("http://localhost:8000/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data?.error) {
      return { success: null, error: data.error };
    }
    return { success: data, error: null };
  } catch (e) {
    console.log("Register error: ", e);
    return { success: null, error: "Something went wrong!" };
  }
}
