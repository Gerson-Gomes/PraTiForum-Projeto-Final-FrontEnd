import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const RotaProtegida = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("Token não encontrado, redirecionando para login");
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userIdFromToken = decodedToken.userId;

    console.log("Decoded Token:", decodedToken);

    if (!userIdFromToken) {
      console.log("User ID não encontrado no token, redirecionando para login");
      return <Navigate to="/login" replace />;
    }

    const { userId } = useParams();

    // Verifica se o userId da URL é o mesmo que o do token
    if (userId !== userIdFromToken) {
      console.log("IDs não coincidem, redirecionando para o perfil correto");
      return <Navigate to={`/perfil-usuario/${userIdFromToken}`} replace />;
    }

    return children; // Renderiza a página protegida se tudo estiver certo
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return <Navigate to="/login" replace />;
  }
};

export default RotaProtegida;

