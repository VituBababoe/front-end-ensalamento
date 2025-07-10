import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Snackbar from '../components/Snackbar';
import api from '../http/api';

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
      className="w-screen h-screen flex justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage: `url('/img/senac.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="painel w-[30vw] h-[65vh] flex flex-col space-y-2 space-x-[3vw] bg-[#EF871E] rounded-[15px] justify-center items-start ">
        <div className="flex space-x-8 ml-[5.5vw]">
          <img src="/img/logo.png" alt="" className=" w-[8vw] h-[16vh] flex " />
          <div className="barra w-[3px] h-[110px] bg-white "></div>
          <span className="text-[20px] text-white font-chagaone h-[50x]">
            ÁREA <br />
            DE <br />
            LOGIN
          </span>
        </div>
        <h5 className=" top-[30%]  font-gillsans text-white">EMAIL</h5>
        <input
          type="text"
          placeholder="Informe seu email aqui..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-[80%] h-[5vh]  border-none rounded-[8px] pl-[8px] outline-none  "
        />
        <h4 className="  font-[20px] font-gillsans text-white ">SENHA</h4>
        <input
          type="password"
          placeholder="Informe sua senha aqui..."
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-[80%] h-[5vh] border-none rounded-[8px] pl-[8px] outline-none"
        />
        <a href="#" className="font-gillsans ">
          Esqueceu sua senha?
        </a>
        <div className="w-[35vw] h-[6vh] flex justify-center">
          <button
            onClick={login}
            className="flex w-[35%] h-[6vh] ml-[-10vw] pointer bg-[#00528F] border-none rounded-[10px] text-white text-[20px] justify-center items-center "
          >
            LOGAR
          </button>
        </div>
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          duration={snackbar.duration}
          onClose={() =>
            setSnackbar({ message: '', type: 'info', duration: 0 })
          }
        />
      </div>
    </div>
  );
}
