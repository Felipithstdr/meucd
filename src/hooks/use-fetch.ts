import useSWR from "swr";

export function useFetch<Data>(url: string) {
  const { data, error, mutate, isLoading } = useSWR<Data>(
    url,
    async (url: string): Promise<Data> => {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_API}`,
        },
      });

      // Verifica se a resposta foi bem-sucedida
      if (!res.ok) {
        const errorMessage = `Erro na requisição: ${res.status} ${res.statusText}`;
        throw new Error(errorMessage);
      }

      const data = await res.json();

      return data;
    },
  );

  return { data, error, mutate, isLoading };
}
