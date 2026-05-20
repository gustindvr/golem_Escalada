"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleSubmit } from '@/services/login';
import { useAuth } from '@/app/context/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setAuthenticated } = useAuth();

  const submit = async (e: React.FormEvent) => {
    const success = await handleSubmit(e, setError, username, password);
    if (success) {
      setAuthenticated(true);
      router.push('/');
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={submit} className="w-full max-w-md p-6 bg-white rounded shadow">
        <h2 className="text-2xl mb-4">Iniciar sesión</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <div className="mb-3">
          <label className="block mb-1">Usuario</label>
          <input value={username} onChange={e => setUsername(e.target.value)} className="w-full border px-2 py-1" />
        </div>
        <div className="mb-3">
          <label className="block mb-1">Contraseña</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border px-2 py-1" />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Entrar</button>
      </form>
    </div>
  );
}
