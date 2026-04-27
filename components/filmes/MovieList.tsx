'use client';

import { useMemo, useState } from 'react';
import { Filme } from '@/lib/types';
import MovieCard from './MovieCard';
import { Button } from '@/components/ui/button';

interface Props {
  filmes: Filme[];
  onRemover: (id: string) => void;
  onAlternar: (id: string) => void;
}

type Filtro = 'todos' | 'assistido' | 'pendente';

export default function MovieList({ filmes, onRemover, onAlternar }: Props) {
  const [filtro, setFiltro] = useState<Filtro>('todos');

  const filtrados = useMemo(() => {
    if (filtro === 'todos') return filmes;
    return filmes.filter(f => f.status === filtro);
  }, [filmes, filtro]);

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-2 items-center">
        <span className="text-sm text-muted-foreground">{filmes.length} filme(s)</span>
        {(['todos', 'assistido', 'pendente'] as Filtro[]).map(f => (
          <Button
            key={f}
            size="sm"
            variant={filtro === f ? 'default' : 'outline'}
            onClick={() => setFiltro(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>
      {filtrados.length === 0 ? (
        <p className="text-muted-foreground text-sm">Nenhum filme encontrado.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtrados.map(filme => (
            <MovieCard
              key={filme.id}
              filme={filme}
              onRemover={onRemover}
              onAlternar={onAlternar}
            />
          ))}
        </div>
      )}
    </div>
  );
}