const baseUrl = process.env.BASE_URL

export const getData = async (url: string, token: string = '') => {
  const response = await fetch(`${baseUrl}/api/${url}`, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  })

  const data = await response.json()

  return data
}

export const postData = async (url: string, data: any, token: string = '') => {
  const response = await fetch(`${baseUrl}/api/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(data),
  })

  const result = await response.json()

  return result
}

export const putData = async (url: string, data: any, token: string) => {
  const response = await fetch(`${baseUrl}/api/${url}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(data),
  })
  const result = await response.json()
  return result
}

export const patchData = async (url: string, data: any, token: string) => {
  const response = await fetch(`${baseUrl}/api/${url}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(data),
  })
  const result = await response.json()
  return result
}

export const deleteData = async (url: string, token: string) => {
  const response = await fetch(`${baseUrl}/api/${url}`, {
    method: 'DELETE',
    headers: {
      Authorization: token,
    },
  })
  const result = await response.json()
  return result
}
