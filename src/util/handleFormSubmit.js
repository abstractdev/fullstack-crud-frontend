async function handleFormSubmit(values, navigate, apiPath) {
  const res = await fetch(apiPath, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(values),
  });
  const resData = await res.json();
  if ("200" in resData) {
    navigate("/dashboard");
  }
}

export default handleFormSubmit;
