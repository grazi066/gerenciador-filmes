import { Filme } from './types';

export async function buscarFilme(titulo: string): Promise<Filme | null> {
  try {
    const chave = process.env.NEXT_PUBLIC_OMDB_KEY;
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(titulo)}&apikey=${chave}`;
    const resposta = await fetch(url);
    const dados = await resposta.json();

    if (dados.Response === 'False') return null;

    return {
      id: dados.imdbID,
      title: dados.Title,
      year: dados.Year,
      poster: dados.Poster !== 'N/A' ? dados.Poster : '/no-poster.png',
      genre: dados.Genre,
      plot: dados.Plot,
      status: 'pendente',
      savedAt: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}