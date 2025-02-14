import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/auth", // URL base do backend
});

// Serviço de usuários
const userService = {
  // POST: Realiza o login
  login: async (credentials) => {
    console.log("Enviando dados para login:", credentials);
    try {
      const response = await api.post("/login", credentials);
      return response.data;
    } catch (error) {
      console.error("Erro na requisição:", error.response ? error.response.data : error);
      throw error;
    }
  },

  // GET: Busca todos os usuários
  getAllUsers: async () => {
    const response = await api.get("/usuarios");
    return response.data;
  },

  // POST: Cadastra um novo usuário
  createUser: async (userData) => {
    const response = await api.post("/register", userData);
    return response.data;
  },

  // PATCH: Atualiza um usuário existente
  updateUser: async (userId, updatedData) => {
    const response = await api.patch(`/usuarios/${userId}`, updatedData);
    return response.data;
  },

  // DELETE: Remove um usuário
  deleteUser: async (userId) => {
    const response = await api.delete(`/usuarios/${userId}`);
    return response.data;
  },
};

export default userService;
