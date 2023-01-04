import { Form, Select, Button } from "antd";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function SelectYearForm({ years }) {
  let [searchParams, setSearchParams] = useSearchParams();
  const [year, setYear] = useState();
  const navigate = useNavigate();

  const handleChange = (value) => {
    setYear(value);
  };

  const filterYear = () => {
    //navigate(`/sightings/${year}`);
    let params = { year: year };
    setSearchParams(params);
  };

  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: "Large",
      }}
      size="Large"
    >
      <Form.Item label="Select" name="year" defaultValue="Please select a year">
        <Select onChange={handleChange}>
          {years.map((elem, index) => {
            return (
              <Select.Option key={index} value={elem}>
                {elem}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item label="Button">
        <Button onClick={filterYear} primary>
          Filter
        </Button>
      </Form.Item>
    </Form>
  );
}
