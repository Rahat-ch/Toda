export const createTodo = async ({ description, segment }) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description: `${description}`, segment: `${segment}` })
  };
  const response = await fetch('/api/v1/items', requestOptions);
  const data = await response.json();
  return data
}

export const getTodos = async (key, id) => {
  const response = await fetch(`/api/v1/items/?user=${id}`)
  const data = await response.json();
  return data
}

export const deleteTodo = async ({ id }) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };
  console.log(`delete: ${id}`)
  const response = await fetch(`/api/v1/items/${id}`, requestOptions)
  const data = await response.json();
  return data;
}

export const updateTodo = async ({ body, id }) => {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
  const response = await fetch(`/api/v1/items/${id}`, requestOptions)
  const data = await response.json();
  return data;
}