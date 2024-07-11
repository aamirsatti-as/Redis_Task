import API from "./api";

export const getAllUsers = async (page = 1, limit = 2, sortOrder = 'desc') => {
  const response = await API.get(`${process.env.REACT_APP_API_URL}/api/users`, {
    params: {
      page,
      limit,
      sortOrder
    },
  });
  return response
}

export const deleteUser = async (id: string) => {
  const response = API.delete(`/api/user/${id}`);
  return response;
}

export const updateUser = async (id: string, body: {}) => {
  const response = API.patch(`/api/user/${id}`, body);
  return response;
}