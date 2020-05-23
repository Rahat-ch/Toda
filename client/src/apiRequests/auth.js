export const login = async (email, password, history) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: `${email}`, password: `${password}` })
  };
  const response = await fetch('/api/v1/auth/login', requestOptions);
  const data = await response.json();
  if (data.success) {
    history.push("/dashboard")
  }
}

export const logout = () => {
  fetch('/api/v1/auth/logout');
}

export const getMe = async () => {
  const response = await fetch('/api/v1/auth/me');
  const data = await response.json()
  return data;
}

export const register = async (name, email, password, history) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: `${name}`, email: `${email}`, password: `${password}` })
  };
  const response = await fetch('/api/v1/auth/register', requestOptions);
  const data = await response.json();
  if (data.success) {
    history.push("/dashboard")
  }
}