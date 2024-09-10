import React, {useState, useEffect} from 'react';
import {Button, DatePicker, Space, Divider, Input, message} from 'antd';
import {useQuery} from "umi";

export default function Page() {

  const [inputValue, setInputValue] = useState('loading..');
  const [defaultInputValue, setDefaultInputValue] = useState(null);

  const storageDirQuery = useQuery({
    queryKey: ["storageDirKey"],
    queryFn: async () => {
      var res = await fetch("/api/vcr/full_data");
      var data = await res.json();
      return data;
    },
    onSuccess: (data) => {
      console.log('success')
      setInputValue(data.storageDir);
      setDefaultInputValue(data.storageDir);
    }
  });

  const storageDirButtonHandler = async (e:any) => {//{{{
    e.preventDefault();

    var response = await fetch<any>("/api/vcr/save_storagedir", {
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
  };//}}}

  return (
    <>
      <Divider style={{  borderColor: '#7cb305' }}>Mount 目录</Divider>
      <Space direction="vertical">
        <Space size={[8, 16]} wrap>

          <Button type="primary">PRESS ME</Button>
          <Button type="primary">PRESS ME</Button>
          <Button type="primary">PRESS ME</Button>

          <DatePicker placeholder="select date" />

        </Space>
        <Space.Compact block>
          <Input style={{ width: 'calc(100% - 100px)' }} type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  />
          <Button type="default" onClick={() => {
            setInputValue(defaultInputValue);
          }}>恢复</Button>
          <Button type="primary" onClick={storageDirButtonHandler}>提交</Button>
        </Space.Compact>
      </Space>
    </>
  );
}
