import { useQuery } from '@tanstack/react-query';

export default function useWordDefinition(word?: string) {
  return useQuery(
    ['word', 'definition', word],
    async () => {
      const data = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      ).then((res) => {
        if (res.status === 404) {
          return Promise.resolve(null);
        } else if (res.status !== 200) {
          return Promise.reject();
        }

        return res.json();
      });

      if (!data || data.length === 0) return null;

      return data[0].meanings[0].definitions[0].definition as string;
    },
    {
      enabled: !!word,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  );
}
