import {useState, useEffect} from 'react';
import {Button, DatePicker, Space, Divider, Input, message} from 'antd';
import {useQuery} from "umi";

export default function Page() {

  const [inputValue, setInputValue] = useState('loading..');
  const [defaultInputValue, setDefaultInputValue] = useState("");

  const storageDirQuery = useQuery({
    queryKey: ["storageDirKey"],
    queryFn: async () => {
      var res = await fetch("/api/vcr/full_data");
      var data = await res.json();
      return data;
    },
    onSuccess: (data:any) => {
      resetStorageDir(data.storageDir);
    }
  });

  const resetStorageDir = (val:string) => {
    setInputValue(val);
    setDefaultInputValue(val);
  };

  const storageDirButtonHandler = async (e:any) => {
    e.preventDefault();

    var response = await fetch("/api/vcr/save_storagedir", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        storageDir: inputValue,
      })
    });
    if(response.ok) {
      message.success('修改成功');
      storageDirQuery.refetch();
    } else {
      message.error('请求失败');
    }
  };

  return (
    <>
      <Divider orientation="left">Mount 目录</Divider>
      <Space direction="vertical">
        <Space  wrap>

          <Button type="primary">PRESS ME</Button>
          <Button type="primary">PRESS ME</Button>
          <Button type="primary">PRESS ME</Button>

          <DatePicker placeholder="select date" />

        </Space>
        <Space.Compact block>
          <Input style={{ width: 'calc(100%)' }} type="text"
                  value={inputValue}
                  onChange={(e:any) => setInputValue(e.target.value)}
                  />
          <Button type="default" onClick={() => {
            setInputValue(defaultInputValue);
          }}>恢复</Button>
          <Button type="primary" onClick={storageDirButtonHandler}>提交</Button>
        </Space.Compact>
      </Space>
      <Divider orientation="left">Cam 列表</Divider>
      <Space direction="vertical">
        oooo
      </Space>
    </>
  );
}
