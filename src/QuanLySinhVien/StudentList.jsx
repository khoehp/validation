import React from 'react'
import { Table, Card, Button } from "antd"
function StudentList(props) {


  const colums = [
    {
      title: "Mã SV",
      dataIndex: "id",
      key: "id",
      render: (_, user) => {
        return <h3>{user.id}</h3>
      },
    },
    {
      title: "Họ tên",
      dataIndex: "username",
      key: "username",
      render: (_, user) => {
        return <h3>{user.username}</h3>
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: (_, user) => {
        return <h3>{user.phone}</h3>
      }
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, user) => {
        return <h3>{user.email}</h3>
      }
    },
    {
      title: "",
      key: "action",
      render: (_, user) => {
        return (
          <>
            <Button onClick={()=>props.getUpdateUser(user)} type="primary">Chỉnh sửa</Button>
            <Button onClick={()=> props.deleteUser(user.id)} type='danger'>Xóa</Button>
          </>
        )
      }
    },
  ]
  return (
    <Card title="Danh sách sinh viên" headStyle={{ backgroundColor: "#000000", color: "#fff" }}>
      <Table dataSource={props.studentList.map((user) => {
        return { ...user, key: user.id }
      })} columns={colums}>

      </Table>
    </Card >

  )
}

export default StudentList