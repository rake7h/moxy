'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button className='btn btn-primary' onClick={() => reset()}>
          Try again
        </button>
      </body>
    </html>
  );
}
