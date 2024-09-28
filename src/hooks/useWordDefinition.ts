import { useQuery } from '@tanstack/react-query';

export default function useWordDefinition(word?: string) {
  return useQuery({
    enabled: !!word,
    queryFn: async () => {
      const data:
        | { meanings: { definitions: { definition: string }[] }[] }[]
        | null = await fetch(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word!}`,
      ).then((res) => {
        if (res.status === 404) {
          return Promise.resolve(null);
        } else if (res.status !== 200) {
          // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
          return Promise.reject();
        }

        return res.json() as Promise<
          { meanings: { definitions: { definition: string }[] }[] }[]
        >;
      });

      if (!data || data.length === 0) return null;

      return data[0].meanings[0].definitions[0].definition;
    },
    queryKey: ['word', 'definition', word],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
