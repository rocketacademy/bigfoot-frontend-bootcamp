import React from 'react';
import '../App.css';
import logo from '../foot.png';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../configs';
import { Space, Table, Breadcrumb, Layout, Menu, Input } from 'antd';
const { Search } = Input;
const { Header, Content } = Layout;
const onSearch = (value) => console.log(value);

export function Sightings() {
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/sightings`)
      .then((response) => {
        setSightings(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const { Column } = Table;

  return (
    <Layout className="layout">
      <Header>
        <img src={logo} className="App-logo" alt="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={new Array(2).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`
            };
          })}
        />
        <Search
          placeholder="input search text"
          allowClear
          onSearch={onSearch}
          style={{
            width: 200
          }}
        />
      </Header>
      <Content
        style={{
          padding: '0 50px'
        }}>
        <Breadcrumb
          style={{
            margin: '16px 0'
          }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          <Table dataSource={sightings}>
            <Column title="Year" dataIndex="YEAR" key="year" />
            <Column title="Month" dataIndex="MONTH" key="month" />
            <Column title="Season" dataIndex="SEASON" key="season" />
            <Column title="Report Number" dataIndex="REPORT_NUMBER" key="report_number" />
            <Column title="County" dataIndex="COUNTY" key="county" />
            <Column title="Location Details" dataIndex="LOCATION_DETAILS" key="location_details" />
            <Column
              title="Action"
              key="action"
              render={(_, record) => (
                <Space size="middle">
                  <Link to="/sightings/:sightingIndex" style={{ color: 'blue' }}>
                    View more
                  </Link>
                </Space>
              )}
            />
          </Table>
        </div>
      </Content>
    </Layout>
  );
}
