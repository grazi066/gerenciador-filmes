'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { buscarFilme } from '@/lib/omdb';
import { Filme } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  onResult: (filme: Filme | null) => void;
}

export default function SearchBar({ onResult }: Props) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  async function handleBuscar() {
    if (!query.trim()) return;
    setLoading(true);
    setErro('');
    const filme = await buscarFilme(query);
    if (!filme) setErro('Filme não encontrado. Tente outro título.');
    onResult(filme);
    setLoading(false);
  }

  return (
    <div className="w-full max-w-xl mx-auto space-y-3">
      <div className="flex gap-2">
        <Input
          placeholder="Digite o nome do filme..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleBuscar()}
        />
        <Button onClick={handleBuscar} disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </Button>
      </div>
      {loading && <Skeleton className="h-48 w-full rounded-xl" />}
      {erro && <p className="text-red-500 text-sm">{erro}</p>}
    </div>
  );
}