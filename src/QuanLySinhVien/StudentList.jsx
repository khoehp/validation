import React, { useState } from 'react'
import { Table, Card, Button, Input } from "antd"

const { Search } = Input;

function StudentList(props) {
  const studentList = props.studentList;
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState([]);
  const colums = [
    {
      title: "Mã SV",
      dataIndex: "mssv",
      key: "mssv",
      render: (_, user) => {
        return <h3>{user.mssv}</h3>
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
            <Button onClick={() => props.getUpdateUser(user)} type="primary">Chỉnh sửa</Button>
            <Button onClick={() => props.deleteUser(user.id)} type='danger'>Xóa</Button>
          </>
        )
      }
    },
  ]

  const handleFilterChange = (e) => {
    const list = [...studentList];
    const value = e.target.value;
    if (value === "") {
      setIsSearch(false)
      return
    } else {
      setIsSearch(true)
    }
    const search = list.filter((item) => {
      item.name.toLowrCase().includes(value)
      setSearch(search)
    })
  }

  return (
    <Card title="Danh sách sinh viên" headStyle={{ backgroundColor: "#000000", color: "#fff" }}>

      <Search
        onChange={handleFilterChange}
        laceholder='tìm kiếm'
        allowClear
        enterButton="Search"
        size="large" />
      <Table dataSource={isSearch ? search : studentList.map((user) => {
        return { ...user, key: user.id }
      })} columns={colums}>

      </Table>
    </Card >

  )
}

export default StudentList