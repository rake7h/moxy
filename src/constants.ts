export const recordTypes = [
    {
      name: 'HTML',
      ext: 'html'
    },
    {
      name: 'JSON',
      ext: 'json'
    }
  ] as const
  
export type RecordTypes =  'html' | 'json'
