import React, { useState, useEffect } from "react";
import Button from "../../Atom/button/Button";
import Like from "../../Atom/icons/like.png";
import Messenge from "../../Atom/icons/messenger.png";
import View from "../../Atom/icons/eye.png"


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
      <h1 style={styles.mainContentTitle}>Todas as Discussões</h1>
      <h1 style={styles.totalNumberPosts}>Total de visualizações (placeholder)</h1>
      <div style={styles.postButtonContainer}>
        <Button text="Nova Publicação" className="postButton" />
      </div>

      {erro && <p style={styles.erro}>{erro}</p>}

      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <div>
          <ul style={styles.lista}>
            {posts.map((post) => (
              <li key={post.id} style={styles.item}>
                <div style={styles.postInfo}>
                  <div style={styles.iconContainer}>
                    <img src={Like} style={styles.icon}/>
                    <p>Like</p>
                    
                  </div>
                  <div style={styles.iconContainer}>
                    <img src={Messenge} style={styles.icon}/>
                    <p>Coments</p>
                    
                  </div>
                  <div style={styles.iconContainer}>
                    <img src={View} style={styles.icon}/>
                    <p>Views</p>
                    
                  </div>

                  
                  

                </div>
                <div>
                  <h2 style={styles.postTitulo}>{post.title}</h2>
                  <p style={styles.postConteudo}>{post.body}</p>
                  <p></p>
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
                </div>
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
    borderRadius: "8px",
    position: "relative",
  },
  postButtonContainer: {
    display: "flex"
  },
  postTitulo: {
    color: "rgba(0, 58, 119, 1)",
    fontSize: "14px",
    fontFamily: "Poppins",
    fontWeight: "500",
    textAlign: "justify"
  },
  postConteudo: {
    fontSize: "13px",
    fontFamily: "Poppins",
    fontWeight: "300",
    textAlign: "justify"
  },

  mainContentTitle: {
    textAlign: "left",
    fontSize: "1.25em",
  },
  totalNumberPosts: {
    fontSize: "1em",
    textAlign: "left",
  },
  erro: {
    color: "red",
  },
  item: {
    backgroundColor: "#fff",
    padding: "15px 0px",
    marginBottom: "10px",
    borderRadius: "5px",
    listStyleType: "none",
    display: 'flex',
  },
  postInfo: {
    height: '100%',
    minWidth: '10%',
    maxWidth: '60px',
    textAlign: "justify",
    paddingRight:'20px',
  },
  iconContainer:{
    display:"flex",
    alignItems:"center",
    justifyContent:"space-evenly",
  },
  icon:{
    height:'20px',
  },
  lista: {
    backgroundColor: 'rgb(255,255,255)',
    padding: "0px"
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

<script src="https://kit.fontawesome.com/69173ff800.js" crossorigin="anonymous"></script>

export default ListaDePosts;
