import React, { useState, useEffect } from "react";
import Button from "../../Atom/button/Button";

function ListaDePosts() {
  const [posts, setPosts] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [respostaId, setRespostaId] = useState(null); // ID do post em que o formulário será exibido
  const [respostaTexto, setRespostaTexto] = useState(""); // Texto da resposta
  const [respostas, setRespostas] = useState({}); // Respostas associadas a cada post
  const [editando, setEditando] = useState({}); // Estado para rastrear respostas em edição

  const fetchPosts = async () => {
    setCarregando(true);
    setErro("");

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!response.ok) {
        throw new Error("Falha ao carregar os dados");
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  };

  const handleResponder = (postId) => {
    setRespostaId(postId);
    setRespostaTexto("");
  };

  const handleEnviarResposta = () => {
    if (!respostaTexto.trim()) {
      alert("Por favor, insira uma resposta antes de enviar.");
      return;
    }

    setRespostas((prevRespostas) => ({
      ...prevRespostas,
      [respostaId]: [...(prevRespostas[respostaId] || []), respostaTexto],
    }));

    setRespostaId(null);
  };

  const handleCancelarResposta = () => {
    setRespostaId(null); // Fecha o formulário sem enviar
    setRespostaTexto(""); // Limpa o campo de texto
  };

  const handleExcluirResposta = (postId, index) => {
    setRespostas((prevRespostas) => {
      const novasRespostas = { ...prevRespostas };
      novasRespostas[postId].splice(index, 1);
      if (novasRespostas[postId].length === 0) delete novasRespostas[postId];
      return novasRespostas;
    });
  };

  const handleEditarResposta = (postId, index, texto) => {
    setEditando({ postId, index });
    setRespostaTexto(texto);
  };

  const handleSalvarEdicao = () => {
    const { postId, index } = editando;

    setRespostas((prevRespostas) => {
      const novasRespostas = { ...prevRespostas };
      novasRespostas[postId][index] = respostaTexto;
      return novasRespostas;
    });

    setEditando({});
    setRespostaTexto("");
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div style={styles.container}>
      <h1>Lista de Posts</h1>
      {erro && <p style={styles.erro}>{erro}</p>}

      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <div>
          <ul style={styles.lista}>
            {posts.map((post) => (
              <li key={post.id} style={styles.item}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                {respostas[post.id] && (
                  <div style={styles.respostas}>
                    <h3>Respostas:</h3>
                    <ul>
                      {respostas[post.id].map((resposta, index) => (
                        <li key={index} style={styles.respostaItem}>
                          {editando.postId === post.id && editando.index === index ? (
                            <div style={styles.formulario}>
                              <textarea
                                value={respostaTexto}
                                onChange={(e) => setRespostaTexto(e.target.value)}
                                style={styles.textarea}
                              />
                              <div style={styles.botoes}>
                                <Button text="Salvar" onClick={handleSalvarEdicao} style={styles.enviarButton} />
                                <Button text="Cancelar" onClick={() => setEditando({})} style={styles.cancelarButton} />
                              </div>
                            </div>
                          ) : (
                            <>
                              <p>{resposta}</p>
                              <div style={styles.acoes}>
                                <Button
                                  text="Editar"
                                  onClick={() => handleEditarResposta(post.id, index, resposta)}
                                  style={styles.editarButton}
                                />
                                <Button
                                  text="Excluir"
                                  onClick={() => handleExcluirResposta(post.id, index)}
                                  style={styles.excluirButton}
                                />
                              </div>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <Button text="Responder" onClick={() => handleResponder(post.id)} style={styles.responderButton} />
                {respostaId === post.id && (
                  <div style={styles.formulario}>
                    <textarea
                      value={respostaTexto}
                      onChange={(e) => setRespostaTexto(e.target.value)}
                      placeholder="Digite sua resposta aqui..."
                      style={styles.textarea}
                    />
                    <div style={styles.botoes}>
                      <Button text="Enviar" onClick={handleEnviarResposta} style={styles.enviarButton} />
                      <Button text="Cancelar" onClick={handleCancelarResposta} style={styles.cancelarButton} />
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <Button text="Recarregar Posts" onClick={fetchPosts} style={styles.button} />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    width: "50%",
    margin: "0 auto",
    backgroundColor: "#f7f7f7",
    borderRadius: "8px",
    position: "relative",
  },
  erro: {
    color: "red",
  },
  item: {
    backgroundColor: "#fff",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    listStyleType: "none",
  },
  respostas: {
    marginTop: "15px",
    textAlign: "left",
  },
  respostaItem: {
    backgroundColor: "#f1f1f1",
    padding: "10px",
    marginBottom: "5px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    wordWrap: "break-word",
    wordBreak: "break-word",
    listStyleType: "none",
  },
  responderButton: {
    padding: "10px 15px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  editarButton: {
    padding: "5px 10px",
    backgroundColor: "#ffc107",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "5px",
  },
  excluirButton: {
    padding: "5px 10px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  formulario: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textarea: {
    width: "90%",
    minHeight: "100px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "10px",
    resize: "none",
  },
  botoes: {
    display: "flex",
    gap: "10px",
  },
  enviarButton: {
    padding: "10px 15px",
    backgroundColor: "#0056D2",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  cancelarButton: {
    padding: "10px 15px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  acoes: {
    marginTop: "5px",
    display: "flex",
    gap: "10px",
  },
};

export default ListaDePosts;
