import React, { useEffect, useState } from 'react';
import 'react-modern-drawer/dist/index.css';
import Select from 'react-select';
import { fetchCollections } from '@/helpers/xhrs/fetch-collections';
import useSWR from 'swr';

interface Props<T> {
  field: T;
}

type Options = Array<{ value: string; label: string }>;

const SelectCollections = <
  T extends {
    name: string;
    ref: (i: any) => void;
    value: string;
    onChange: (e: Event) => void;
  },
>({
  field,
}: Props<T>) => {
  const [collections, setCollections] = useState<Options>([]);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR('/api/collections', fetcher);

  useEffect(() => {
    if (data && data.data) {
      let cList: Options = [];
      data.data.forEach((c) => {
        const item = {
          value: c.name,
          label: c.name,
        };
        cList.push(item);
      });
      setCollections(cList);
    }
  }, [data]);

  return (
    <Select
      name={field.name}
      classNamePrefix='addl-class'
      options={collections}
      value={collections.find((c) => c?.value === field.value)}
      onChange={(e) => field.onChange(e.value)}
    />
  );
};

export { SelectCollections };
