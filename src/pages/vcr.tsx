import {useState, useEffect} from 'react';
import {Button, DatePicker, Space, Divider, Input, message} from 'antd';
import {List, Avatar, Card, Col, Row, Switch} from 'antd';
import { Typography } from "antd";
import {useQuery} from "umi";
import {VideoCameraOutlined} from '@ant-design/icons';

const {Text, Link} = Typography;

export default function Page() {

  const [inputValue, setInputValue] = useState('loading..');
  const [defaultInputValue, setDefaultInputValue] = useState("");

  const storageDirQuery = useQuery({
    queryKey: ["storageDirKey"],
    queryFn: () => queryFullData(),
    onSuccess: (data:any) => {
      resetStorageDir(data.storageDir);
    }
  });

  const resetStorageDir = (val:string) => {
    setInputValue(val);
    setDefaultInputValue(val);
  };

  const queryFullData = async (): Promise<any> => {
    var res = await fetch("/api/vcr/full_data");
    var data = await res.json();
    return data;
  };

  const postStorageDir = async (inputValue: string) => {
    var response = await fetch("/api/vcr/save_storagedir", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        storageDir: inputValue,
      })
    });
    return response;
  };

  const storageDirButtonHandler = async (e:any) => {
    e.preventDefault();
    var response = await postStorageDir(inputValue);
    if(response.ok) {
      message.success('修改成功');
      storageDirQuery.refetch();
    } else {
      message.error('请求失败');
    }
  };

  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];

  return (
    <>
      <Divider orientation="left">Mount 目录</Divider>
      <Space direction="vertical">
        <Space wrap>
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
      <Space direction="vertical" style={{display: 'flex'}}>
        <List
          itemLayout="horizontal"
          style={{width:'calc(100%)'}}
          dataSource={data}
          renderItem={(item, index) => (
                <List.Item>
                  <Card style={{width:'calc(100%)'}}>
                    <List.Item.Meta
                      avatar={<VideoCameraOutlined />}
                      title={`摄像头 ${index+1}：`}
                      description={
                        <>
                          <div style={{
                            width:'calc(100%)',
                            display:'flex',
                            alignItems: 'center',
                          }}>
                            <Text style={{
                              marginRight:10,
                              flexShrink:0
                            }}>
                              视频地址：
                            </Text>
                            <Input type="text" value="sdf" style={{
                              marginRight:10,
                            }} />
                            <Text style={{
                              marginLeft:'auto',
                              marginRight:10,
                              flexShrink:0
                            }}>摄像头名称：</Text>
                            <Input type="text" style={{
                                flexBasis:180,
                                marginRight:10
                              }} />
                            <Link href="#" style={{
                              marginRight:10,
                              flexShrink:0
                            }}>预览</Link>
                            <Button type="primary">保存</Button>
                          </div>
                          <div style={{
                            width:'calc(100%)',
                            display:'flex',
                            alignItems: 'center',
                            marginTop:10
                          }}>
                            <Text style={{
                              marginRight:10,
                            }}>录像状态：</Text>
                            <Switch checkedChildren="开启" unCheckedChildren="停止" defaultChecked style={{
                              marginRight:20
                            }}/>
                            <Text>
                              摄像头其他信息：分辨率，码率，帧率，格式，是否可用
                            </Text>
                          </div>
                        </>
                      }
                    />
                  </Card>
                </List.Item>
              )}
          />
      </Space>
    </>
  );
}
