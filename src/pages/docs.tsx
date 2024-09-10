import React, {useState, useEffect} from 'react';
import {useQuery} from "umi";
const DocsPage = () => {
  const [value, setValue] = useState('loading....');

  const query = useQuery({
    queryKey: ["storageDirKey"],
    queryFn: async () => {
      var res = await fetch("/api/vcr/full_data");
      var data = await res.json();
      return data;
    }
  });

  useEffect(() => {

    // setValue('done')
  },[query.isLoading]);

  console.log('xxxxxxxx')
  return (
    <div>
      <p>{value}</p>
    </div>
  );
};

export default DocsPage;
