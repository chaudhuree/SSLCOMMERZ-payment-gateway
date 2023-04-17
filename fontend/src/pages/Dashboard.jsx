import { Col, Modal, PageHeader, Row, Space, Table, Tag } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [dbdata, setDbdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [singleTransaction, setSingleTransaction] = useState({});
  const [count, setCount] = useState({});
  // console.log(singleTransaction);

  // modal related function
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // data fetcing
  useEffect(() => {
    getData();
    getCount();
  }, []);

  //data source for all events
  const getData = async () => {
    setLoading(true);
    const { data } = await axios.get("http://localhost:5000/transactions");
    setDbdata(data.transactions);
    setLoading(false);
  };

  //cunt data
  const getCount = async () => {
    setLoading(true);
    const { data } = await axios.get(
      "http://localhost:5000/transactions/count"
    );
    setCount(data.count);
    setLoading(false);
  };

  //handle single transaction
  const handleSingleTransaction = async (id) => {
    showModal();
    const { data } = await axios.get(
      `http://localhost:5000/transactions/${id}`
    );

    setSingleTransaction(data?.transaction);
  };

  // table structure design skeleton
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "View",
      dataIndex: "view",
      key: "view",
    },
  ];

  // table data
  const Data = dbdata?.map((item, index) => {
    let color =
      item.status === "pending" || item.status === "failed" ? "red" : "green";

    return {
      key: index,
      name: item.name,
      amount: item.amount,
      status: (
        <Space>
          <Tag color={color}>{item.status}</Tag>
        </Space>
      ),
      view: (
        <Space
          onClick={() => handleSingleTransaction(item.transactionId)}
          size="middle"
          style={{ cursor: "pointer" }}
        >
          <Tag color="blue">View</Tag>
        </Space>
      ),
    };
  });

  return (
    <Row>
      {/*
      page header
    */}
      <Col span={16} offset={4}>
        <PageHeader
          className="site-page-header header-container"
          title="Dashboard"
          subTitle="- Transaction Details "
        />
      </Col>

      {/*
        total statistics
      */}

      <Col
        span={16}
        offset={4}
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <h3 className="text-center text-warning mb-4">Total Statistics</h3>
        <Row>
          <Col span={8} className="text-center">
            <h4 className="text-danger">Pending: {count.pendingCount}</h4>
          </Col>
          <Col span={8} className="text-center ">
            <h4 className="text-success">Success: {count.successCount}</h4>
          </Col>
          <Col span={8} className="text-center">
            <h4 className="text-danger">Failed: {count.faildeCount}</h4>
          </Col>
        </Row>
      </Col>

      {/*
      table show
    */}
      <Col span={16} offset={4}>
        {loading ? (
          <p>loading...</p>
        ) : (
          <Table columns={columns} dataSource={Data} />
        )}
      </Col>

      {/*
  modal show
*/}
      <Modal
        title="Transaction Details"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Transaction_Id</th>
              <th scope="col">Mobile No.</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{singleTransaction?.transactionId}</td>
              <td>{singleTransaction?.mobile}</td>
              <td>{moment(singleTransaction?.createdAt).fromNow()}</td>
            </tr>
          </tbody>
        </table>
      </Modal>
    </Row>
  );
}
