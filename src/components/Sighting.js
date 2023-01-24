import React from 'react';
import '../App.css';
import logo from '../foot.png';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../configs';
import { Table, Breadcrumb, Layout, Menu, Button } from 'antd';
const { Header, Content } = Layout;

export function Sighting() {
  const [sighting, setSighting] = useState([]);
  // const [sightingArray, setSightingArray] = useState([]);
  const params = useParams();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/sightings/${params.sightingIndex}`)
      .then((response) => {
        console.log(response.data);
        setSighting(response.data);
        // setSightingArray(Object.keys(sighting));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [params.sightingIndex]);

  const { Column } = Table;
  
  const sightingArray = Object.keys(sighting)
  // const sightingArray = Object.entries(sighting).map(([key, value]) => (
  //   {key}:{value}
  // ));
  
console.log(sightingArray);

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
        <Button><Link to="/sightings" style={{ color: 'blue' }}>
          Return
        </Link></Button>
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
          <Table dataSource={sightingArray}>
            <Column title="Year" dataIndex="YEAR" key="year" />
            <Column title="Month" dataIndex="MONTH" key="month" />
            <Column title="Season" dataIndex="SEASON" key="season" />
            <Column title="Report Number" dataIndex="REPORT_NUMBER" key="report_number" />
            <Column title="County" dataIndex="COUNTY" key="county" />
            <Column title="Location Details" dataIndex="LOCATION_DETAILS" key="location_details" />
          </Table>
        </div>
      </Content>
    </Layout>
  );
}
