import { useEffect, useMemo, useState } from 'react';

export default function Filter() {
  const [value, setValue] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [words, setWords] = useState<string[]>([]);
  useEffect(() => {
    void fetch(import.meta.env.PUBLIC_API_URL, {
      headers: {
        'x-api-key': import.meta.env.PUBLIC_API_KEY,
      },
    })
      .then((res) => res.json())
      .then((words: string[]) => {
        setWords(words.sort().map((word: string) => word.toLowerCase()));
        setLoading(false);
      });
  }, []);

  const filteredWords = useMemo(
    () => words.filter((word) => word.includes(value)),
    [value, words],
  );

  return (
    <div className="flex flex-col items-center w-full">
      <input
        className="w-full max-w-xs mt-8 input"
        onChange={({ target }) => {
          setValue(target.value);
        }}
        placeholder="treat"
        type="text"
        value={value}
      />
      {!isLoading && filteredWords.length === 0 && (
        <p className="mt-8">No words found.</p>
      )}
      {isLoading ? (
        <span className="mt-8 loading loading-spinner" />
      ) : (
        <div className="grid w-full grid-cols-4 gap-8 mt-8">
          {filteredWords.slice(0, 20).map((word) => (
            <div
              className="py-4 text-center bg-white border-2 rounded-lg shadow-md"
              key={word}
            >
              {word}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
