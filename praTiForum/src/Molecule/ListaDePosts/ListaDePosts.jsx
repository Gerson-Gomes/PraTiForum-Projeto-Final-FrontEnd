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
  const [respostaId, setRespostaId] = useState(null);
  const [respostaTexto, setRespostaTexto] = useState("");
  const [respostas, setRespostas] = useState({});
  const [editando, setEditando] = useState({});

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
    <div className="container-posts">
      <h1 className="main-content-title">Todas as Discussões</h1>
      <h1 className="total-number-posts">Total de visualizações (placeholder)</h1>
      <div className="post-button-container">
        <Button text="Nova Publicação" className="postButton" />
      </div>

      {erro && <p className="erro">{erro}</p>}

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
                  <h2 className="post-titulo">{post.title}</h2>
                  <p className="post-conteudo">{post.body}</p>
                  <div className="post-complement">
                    <div className="post-type-container">
                      <p className="post-type">Backend</p>
                    </div>
                    {/* /* <div>Perfil</div> */ }
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

export default ListaDePosts;