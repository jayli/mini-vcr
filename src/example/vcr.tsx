import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Button, DatePicker, Space, Divider, Input} from 'antd';
import {useQuery} from "umi";

export default function Page() {

  const [initValue, setInitValue] = useState(null);
  const [inputValue, setInputValue] = useState(null);
  const [loadingDone, setLoadingDong] = useState(false);

  const initData = async () => {
    var res = await fetch("/api/vcr/info")
    var data = await res.json();
    setInputValue(data.storageDir);
    setInitValue(data.storageDir);
    setLoadingDong(true);
  };

  // 这里是页面渲染后执行，模拟 Domready
  useEffect(() => {
    initData()
  }, [])

  // 这里立即执行，执行时页面还没渲染
  // (() => {
  //   initData();
  // })();

  if(!loadingDone) {
    return (
      <div>no response</div>
    );
  }

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
                  onChange={(e) => setInputValue(e.target.value)} />
          <Button type="default" onClick={() => {
            setInputValue(initValue);
          }}>恢复</Button>
          <Button type="primary" onClick={() => {
            console.log(inputValue)
          }}>提交</Button>
        </Space.Compact>
      </Space>
    </>
  );
}
