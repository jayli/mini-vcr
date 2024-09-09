import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Button, DatePicker, Space, Divider, Input} from 'antd';
import {useQuery} from "umi";

export default function Page() {

  const [count, setCount] = useState(0);
  const vcrQuery = useQuery(["tttt"], () => {
    return axios.get('/api/vcr/info', {
      params: {id: 123}
    });
  });
  const [inputValue,setInputValue] = useState(vcrQuery.data?.data.storageDir);

  function handleClick() {
    setCount(count + 1)
  }

  if (vcrQuery.isLoading) return null;

  var storageDir = vcrQuery.data?.data.storageDir;

  return (
    <>
      <Button onClick={handleClick}>点击{count}次</Button>
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
                  defaultValue={storageDir}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)} />
          <Button type="default" onClick={() => {
            setInputValue(storageDir);
          }}>恢复</Button>
          <Button type="primary">提交</Button>
        </Space.Compact>
      </Space>
    </>
  );
}
