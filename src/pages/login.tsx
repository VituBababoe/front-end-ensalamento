import React from 'react';

export default function App() {
  return (
    <div className="container">
      <div className="painel">
        <input type="text" placeholder="Informe seu email aqui..." />
        {/* <h5>SENHA</h5> */}
        <input type="password" placeholder="Informe sua senha aqui..." />
        <button>LOGAR</button>
        <img src="img/logo.png" alt="" />
        <div className="barra"></div>
        <p>
          ÁREA {'\n'}DE {'\n'}LOGIN
        </p>
        <a href="#">Esqueceu sua senha?</a>
        <h5>EMAIL</h5>
        <h4>SENHA</h4>
      </div>
    </div>
  );
}
