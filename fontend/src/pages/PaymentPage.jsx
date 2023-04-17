import { Button, Col, Form, Input, PageHeader, Row } from "antd";
import axios from "axios";
import React from "react";

export default function PaymentPage() {
  // const handlePayment = async () => {
  //   const { data } = await axios.post(
  //     "http://localhost:5000/paymentcollection",
  //     {
  //       total_amount: 400,
  //     }
  //   );
  //   // console.log(data); // this is the url that we are getting from the backend
  //   if (data) {
  //     console.log("Session was successful");

  //     return window.location.replace(data);
  //   } else {
  //     // return alert('Session was not successful')
  //     console.log("Session was not successful");
  //   }
  // };
  const onFinish = async (values) => {
    const { data } = await axios.post(
      "http://localhost:5000/paymentcollection",
      {
        amount: values.amount,
        name: values.name,
        mobile: values.mobile,
      }
    );
    // console.log(data); // this is the url that we are getting from the backend
    if (data) {
      console.log("Session was successful");

      return window.location.replace(data);
    } else {
      // return alert('Session was not successful')
      console.log("Session was not successful");
    }
  };
  return (
    <div>
      <div className="container">
        <Row justify="center">
          <Col span={16}>
            <PageHeader
              className="site-page-header header-container"
              title="হাত হাতে জনসেবা"

              subTitle="- জনসেবার আলোয় হাতে হাত মিলিয়ে "
            /></Col>
          <Col span={16} style={{ marginTop: "50px" }} >
            <Form

              labelCol={{
                span: 4,
              }}


              onFinish={onFinish}


            >
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "customer's name is missing",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Amount"
                name="amount"
                rules={[
                  {
                    required: true,
                    message: "provide amout to pay",
                  },
                ]}
              >
                <Input />
              </Form.Item>


              <Form.Item
                label="Mobile"
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: "number must to recognize you",
                  },
                ]}
              >
                <Input />
              </Form.Item>





              <Form.Item
                wrapperCol={{
                  offset: 4,
                  span: 20,
                }}
              >
                <Button type="primary" htmlType="submit" block style={{ background: "#e2136e", borderColor: "#e2136e" }}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
}
