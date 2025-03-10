import React, { useState, useEffect } from "react";
import Button from "../../Atom/button/Button";
import Like from "../../Atom/icons/like.png";
import Messenge from "../../Atom/icons/messenger.png";
import View from "../../Atom/icons/eye.png";
import "./ListaDePosts.css";


function ListaDePosts() {
  const [posts, setPosts] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [respostaId, setRespostaId] = useState(null); // ID do post em que o formulário será exibido
  const [respostaTexto, setRespostaTexto] = useState(""); // Texto da resposta
  const [respostas, setRespostas] = useState({}); // Respostas associadas a cada post
  const [editando, setEditando] = useState({}); // Estado para rastrear respostas em edição
  const [exibirFormulario, setExibirFormulario] = useState(false);
  const [tituloPublicacao, setTituloPublicacao] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [conteudoPublicacao, setConteudoPublicacao] = useState("");



  const refreshToken = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/refresh", {
        method: "POST",
        credentials: "include", // Envia os cookies (caso o refresh token esteja armazenado como cookie)
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: localStorage.getItem("refreshToken"), // Se estiver armazenado no localStorage
        }),
      });
  
      if (!response.ok) {
        throw new Error("Falha ao renovar o token.");
      }
  
      const data = await response.json();
      localStorage.setItem("token", data.accessToken);
      return data.accessToken; // Retorna o novo token
    } catch (error) {
      console.error("Erro ao renovar token:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login"; // Redireciona para login caso o refresh falhe
    }
  };

  const fetchWithAuth = async (url, options = {}) => {
    let token = localStorage.getItem("token");
  
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  
    let response = await fetch(url, { ...options, headers });
  
    // Se o token estiver expirado, tenta renovar
    if (response.status === 401) {
      token = await refreshToken(); // Obtém um novo token
  
      if (!token) return; // Se não conseguir renovar, interrompe a requisição
  
      headers.Authorization = `Bearer ${token}`;
      response = await fetch(url, { ...options, headers }); // Refaz a requisição com o novo token
    }
  
    return response;
  };


// Alternar exibição do formulário
const handleNovaPublicacao = () => {
  setExibirFormulario(!exibirFormulario);
  setErro("");
  setSucesso("");
};

// Função para "enviar" a publicação
const handlePublicar = async () => {
  if (!tituloPublicacao.trim() || !conteudoPublicacao.trim()) {
    setErro("Preencha todos os campos!");
    return;
  }

  try {
    const token = localStorage.getItem("token"); // Pegando o token JWT armazenado

    if (!token) {
      throw new Error("Usuário não autenticado. Faça login novamente.");
    }

    const response = await fetch('http://localhost:8080/api/topics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Certifique-se de que o token está sendo enviado corretamente
      },
      body: JSON.stringify({
        title: tituloPublicacao,
        content: conteudoPublicacao,
        tagId: 1, // ou use o valor que você deseja para tagId
      }),
    });
    
    console.log("Cabeçalhos da requisição:", {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Verifique se o Authorization está correto
    });


if (!response.ok) {
  const errorText = await response.text(); // Captura o erro como texto
  console.log("Erro ao criar o tópico:", errorText); // Adicione um log para entender a resposta
  throw new Error(errorText || 'Erro desconhecido ao criar o tópico.');
}

    // Se a publicação for bem-sucedida
    setSucesso("Publicação criada com sucesso!");
    setErro(""); // Limpa qualquer erro anterior
    setTituloPublicacao(""); // Limpa o campo de título
    setConteudoPublicacao(""); // Limpa o campo de conteúdo
    setExibirFormulario(false); // Fecha o formulário
    fetchPosts(); // Atualiza a lista de posts

  } catch (error) {
    setErro(error.message); // Mostra a mensagem de erro no frontend
  }
};
const fetchPosts = async () => {
  setCarregando(true);
  setErro("");

  try {
    const token = localStorage.getItem("token"); // Pegue o token armazenado
    const response = await fetch("http://localhost:8080/api/topics", {
      headers: {
        "Authorization": `Bearer ${token}`, // Enviando o token JWT
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Falha ao carregar os dados");
    }
    
    const data = await response.json();

    // Ajuste para pegar apenas os posts dentro de "content"
    const postsOrdenados = data.content || [];

    console.log("Posts antes da ordenação:", postsOrdenados);  // Verifique os posts recebidos

    // Ordena os posts pelo id em ordem decrescente (maior id primeiro)
    postsOrdenados.sort((a, b) => b.id - a.id); 

    console.log("Posts após a ordenação:", postsOrdenados);  // Verifique a ordenação

    setPosts(postsOrdenados); // Atualiza o estado com os posts ordenados
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
    setRespostaId(null);
    setRespostaTexto("");
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
    {/* <h1 style={styles.mainContentTitle}>Todas as Discussões</h1> */}
    {/* <h1 style={styles.totalNumberPosts}>Total de visualizações (placeholder)</h1> */}

    <div style={styles.postButtonContainer}>
    <Button
  text={    <span style={{ fontWeight: "bold", fontSize: "1.0rem", display: "flex", alignItems: "center", gap: "8px" }}>
   Nova Publicação &#43;
</span>}
  onClick={handleNovaPublicacao}
  className="postButton"
/>   </div>

    {erro && <p style={{ color: "red" }}>{erro}</p>}
    {sucesso && <p style={{ color: "green" }}>{sucesso}</p>}

    {/* Exibir formulário apenas se exibirFormulario for true */}
    {exibirFormulario && (
      <div style={styles.formulario}>
        <input
          type="text"
          placeholder="Título da Publicação"
          value={tituloPublicacao}
          onChange={(e) => setTituloPublicacao(e.target.value)}
          style={styles.titlepubilcação}
        />
        <textarea
          placeholder="Conteúdo da Publicação"
          value={conteudoPublicacao}
          onChange={(e) => setConteudoPublicacao(e.target.value)}
          style={styles.textarea}
        />
        <div style={styles.botoes}>
          <Button text="Publicar" onClick={handlePublicar} className="enviarButton" />
          <Button text="Cancelar" onClick={() => setExibirFormulario(false)} className="cancelarButton" />
        </div>
      </div>
    )}
      {erro && <p style={styles.erro}>{erro}</p>}

      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <div>
          <ul className="lista">
            {posts.map((post) => (
              <li key={post.id} className="item">
                <div className="post-info">
                  <div className="icon-container">
                    <img src={Like} className="icon" />
                    <p>Like</p>
                  </div>
                  <div className="icon-container">
                    <img src={Messenge} className="icon" />
                    <p>Coments</p>
                  </div>
                  <div className="icon-container">
                    <img src={View} className="icon" />
                    <p>Views</p>
                  </div>
                </div>
                <div>

                  <h2 style={styles.postTitulo}>{post.title}</h2>
                  <p style={styles.postConteudo}>{post.content}</p>
                  <div style={styles.postComplement} >
                    {/* <div style={styles.postTypeContainer} >
                      <p style={styles.postType}>Backend</p>
                    </div> */}
                    {/* <div>
                      Perfil
                    </div> */}
                  </div>

                  {respostas[post.id] && (
                    <div className="respostas">
                      <h3>Respostas:</h3>
                      <ul>
                        {respostas[post.id].map((resposta, index) => (
                          <li key={index} className="resposta-item">
                            {editando.postId === post.id && editando.index === index ? (
                              <div className="formulario">
                                <textarea
                                  value={respostaTexto}
                                  onChange={(e) => setRespostaTexto(e.target.value)}
                                  className="textarea"
                                />

                                <div className="botoes">
                                  <Button text="Salvar" onClick={handleSalvarEdicao} className="enviar-button" />
                                  <Button text="Cancelar" onClick={() => setEditando({})} className="cancelar-button" />

                                </div>
                              </div>
                            ) : (
                              <>
                                <p>{resposta}</p>
                                <div className="acoes">
                                  <Button
                                    text="Editar"
                                    onClick={() => handleEditarResposta(post.id, index, resposta)}
                                    className="editar-button"
                                  />
                                  <Button
                                    text="Excluir"
                                    onClick={() => handleExcluirResposta(post.id, index)}
                                    className="excluir-button"
                                  />
                                </div>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}


                  <Button text="Responder" onClick={() => handleResponder(post.id)} className="responder-button" />

                  {respostaId === post.id && (
                    <div className="formulario">
                      <textarea
                        value={respostaTexto}
                        onChange={(e) => setRespostaTexto(e.target.value)}
                        placeholder="Digite sua resposta aqui..."
                        className="textarea"
                      />

                      <div className="botoes">
                        <Button text="Enviar" onClick={handleEnviarResposta} className="enviar-button" />
                        <Button text="Cancelar" onClick={handleCancelarResposta} className="cancelar-button" />

                      </div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <Button text="Recarregar Posts" onClick={fetchPosts} className="button" />
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
    display: "flex",
   
    
  },

  postTitulo: {
    color: "rgba(0, 58, 119, 1)",
    fontSize: "18px",
    fontFamily: "Poppins",
    fontWeight: "500",
    textAlign: "justify"
  },
  postConteudo: {
    fontSize: "16px",
    fontFamily: "Poppins",
    fontWeight: "300",
    textAlign: "justify",
    height:"max-content",
    padding: "10px 0px",
    minHeight:'90px' 
       
  },

  mainContentTitle: {
    textAlign: "center",
    fontSize: "1.25em",
    marginBottom:"30px",
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
    height: '11vh',
    textAlign: "justify",
    paddingRight:'5px',
    width:'max-content',
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between'
    
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    marginRight: 20, // Adiciona 20px de espaço à direita
  },
  icon:{
    height:'20px',
  },
  postComplement:{
    display:"flex",
    justifyContent:"space-between",
  },
  postTypeContainer:{
    width:"115px",
    backgroundColor:"rgba(253, 139, 104, 1)",
    height:"36px",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
  },
  postType:{
    color:"#ffffff",
    fontFamily:"Poppins"
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

  titlepubilcação:{    
    width: "90%",
    
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