import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Snackbar from '../components/Snackbar';
import api from '../http/api';
git config --global init.defaultBranch main

interface SnackbarState {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info'; // Torna o tipo opcional
  duration: number;
}

export default function Login() {
  const [email, setEmail] = useState<string>(''); // Tipagem explícita como string
  const [senha, setSenha] = useState<string>(''); // Tipagem explícita como string
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    message: '',
    type: 'success',
    duration: 0,
  });
  const navigate = useNavigate();

  const login = async () => {
    const duration = 10000;
    try {
      const response = await api.post<{
        token: string;
        refreshToken: string;
        message: string;
      }>('/login', {
        email,
        senha,
      });

      const { token, refreshToken, message } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      setSnackbar({
        message: message || 'Sucesso ao logar.',
        type: 'success',
        duration,
      });
      setTimeout(() => {
        navigate('/home');
      }, duration);
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      setSnackbar({
        message:
          axiosError.response?.data?.message || 'Erro ao realizar login.',
        type: 'error',
        duration: 10000,
      });
    }
  };

  return (
    <div
      className="w-screen h-screen"
      style={{
        backgroundImage: `url('/img/senac.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="painel top-[50%] left-[36.5%] transform -translate-x-[10%] -translate-y-[50%] w-[30%] h-[65vh] flex bg-[#EF871E] rounded-[15px] justify-center items-center relative">
        <input
          type="text"
          placeholder="Informe seu email aqui..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-[80%] h-[5vh] top-[34%] left-[10%] border-none rounded-[8px] pl-[8px] absolute "
        />
        <input
          type="password"
          placeholder="Informe sua senha aqui..."
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-[80%] h-[5vh] top-[49%] left-[10%] border-none rounded-[8px] pl-[8px] absolute"
        />
        <button
          onClick={login}
          className="w-[35%] h-[6vh] top-[70%] left-[33%] pointer bg-[#00528F] border-none rounded-[10px] text-white text-[20px] absolute "
        >
          LOGAR
        </button>
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          duration={snackbar.duration}
          onClose={() =>
            setSnackbar({ message: '', type: 'info', duration: 0 })
          }
        />
        <img
          src="/img/logo.png"
          alt=""
          className="w-[30%] h-[30%] absolute top-[-0.5%] left-[20%]"
        />
        <div className="barra w-[3px] h-[110px] bg-white absolute top-[5%] left-[52%]"></div>
        <span className="text-[20px] text-white absolute top-[7%] left-[55%] font-chagaone h-[50x]">
          ÁREA <br />
          DE <br />
          LOGIN
        </span>
        <a href="#" className="absolute top-[58%] left-[11%] font-gillsans ">
          Esqueceu sua senha?
        </a>
        <h5 className="absolute top-[30%] left-[11%] font-[20px] font-gillsans text-white">
          EMAIL
        </h5>
        <h4 className="absolute top-[45%] left-[11%] font-[20px] font-gillsans text-white ">
          SENHA
        </h4>
      </div>
    </div>
  );
}
