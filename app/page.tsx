'use client';

import { useState, useEffect, useCallback } from 'react';
import { Filme } from '@/lib/types';
import { listarFilmes, salvarFilme, removerFilme, alternarStatus } from '@/lib/storage';
import SearchBar from '@/components/filmes/SearchBar';
import MovieResult from '@/components/filmes/MovieResult';
import MovieList from '@/components/filmes/MovieList';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Home() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [resultadoBusca, setResultadoBusca] = useState<Filme | null>(null);
  const [mensagem, setMensagem] = useState('');

  const recarregar = useCallback(() => {
    setFilmes(listarFilmes());
  }, []);

  useEffect(() => {
    recarregar();
  }, [recarregar]);

  function handleSalvar(filme: Filme) {
    const salvo = salvarFilme(filme);
    if (salvo) {
      setMensagem(`"${filme.title}" salvo com sucesso!`);
      recarregar();
    } else {
      setMensagem(`"${filme.title}" já está na sua lista.`);
    }
    setTimeout(() => setMensagem(''), 3000);
  }

  function handleRemover(id: string) {
    removerFilme(id);
    recarregar();
  }

  function handleAlternar(id: string) {
    alternarStatus(id);
    recarregar();
  }

  return (
    <div className="space-y-8">
      <SearchBar onResult={setResultadoBusca} />
      {mensagem && (
        <Alert>
          <AlertDescription>{mensagem}</AlertDescription>
        </Alert>
      )}
      {resultadoBusca && (
        <MovieResult filme={resultadoBusca} onSalvar={handleSalvar} />
      )}
      <MovieList
        filmes={filmes}
        onRemover={handleRemover}
        onAlternar={handleAlternar}
      />
    </div>
  );
}