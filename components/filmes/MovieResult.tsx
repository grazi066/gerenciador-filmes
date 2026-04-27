'use client';

import Image from 'next/image';
import { Filme } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  filme: Filme;
  onSalvar: (filme: Filme) => void;
}

export default function MovieResult({ filme, onSalvar }: Props) {
  return (
    <Card className="w-full max-w-xl mx-auto mt-4">
      <CardContent className="flex gap-4 p-4">
        {filme.poster && (
          <Image
            src={filme.poster}
            alt={filme.title}
            width={100}
            height={150}
            className="rounded-lg object-cover"
          />
        )}
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">{filme.title}</h2>
          <p className="text-sm text-muted-foreground">{filme.year}</p>
          <div className="flex flex-wrap gap-1">
            {filme.genre.split(', ').map(g => (
              <Badge key={g} variant="secondary">{g}</Badge>
            ))}
          </div>
          <p className="text-sm line-clamp-3">{filme.plot}</p>
          <Button className="mt-2 w-fit" onClick={() => onSalvar(filme)}>
            Salvar na lista
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}