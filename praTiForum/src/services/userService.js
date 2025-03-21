import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/", // URL base do backend
});

// Serviço de usuários
const userService = {
  // POST: Realiza o login
  login: async (credentials) => {
    console.log("Enviando dados para login:", credentials);
    try {
      const response = await api.post("auth/login", credentials);
      return response.data;
    } catch (error) {
      console.error("Erro na requisição:", error.response ? error.response.data : error);
      throw error;
    }
  },

  // GET: Busca as informações do usuário pelo userId, enviando o token JWT para autenticação
  getUser: async (userId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.get(`users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
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
    const response = await api.post("auth/register", userData);
    return response.data;
  },

  // PUT: Atualiza um usuário existente
  updateUser: async (userId, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.put(`/users/${userId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error.response ? error.response.data : error);
      throw error;
    }
  },


  // DELETE: Remove um usuário
  deleteUser: async (userId) => {
    const response = await api.delete(`/usuarios/${userId}`);
    return response.data;
  },
};

export default userService;
