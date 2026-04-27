import { Filme } from './types';

const STORAGE_KEY = 'gerenciador-filmes';

export function listarFilmes(): Filme[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function salvarFilme(filme: Filme): boolean {
  const lista = listarFilmes();
  const jaExiste = lista.find(f => f.id === filme.id);
  if (jaExiste) return false;
  const novaLista = [filme, ...lista];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
  return true;
}

export function removerFilme(id: string): void {
  const lista = listarFilmes();
  const novaLista = lista.filter(f => f.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
}

export function alternarStatus(id: string): void {
  const lista = listarFilmes();
  const novaLista = lista.map(f =>
    f.id === id
      ? { ...f, status: f.status === 'assistido' ? 'pendente' : 'assistido' as 'assistido' | 'pendente' }
      : f
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
}