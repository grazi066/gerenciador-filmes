'use client';

import Image from 'next/image';
import { Filme } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  filme: Filme;
  onRemover: (id: string) => void;
  onAlternar: (id: string) => void;
}

export default function MovieCard({ filme, onRemover, onAlternar }: Props) {
  return (
    <Card className="flex flex-col">
      <CardContent className="p-3 flex flex-col gap-2">
        <Image
          src={filme.poster}
          alt={filme.title}
          width={200}
          height={300}
          className="rounded-lg object-cover w-full"
        />
        <h3 className="font-bold text-sm">{filme.title}</h3>
        <p className="text-xs text-muted-foreground">{filme.year}</p>
        <Badge variant={filme.status === 'assistido' ? 'default' : 'secondary'}>
          {filme.status}
        </Badge>
        <Button size="sm" variant="outline" onClick={() => onAlternar(filme.id)}>
          {filme.status === 'assistido' ? 'Marcar pendente' : 'Marcar assistido'}
        </Button>
        <Button size="sm" variant="destructive" onClick={() => onRemover(filme.id)}>
          Remover
        </Button>
      </CardContent>
    </Card>
  );
}