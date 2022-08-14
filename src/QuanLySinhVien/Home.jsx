import React from 'react'
// import { useEffect } from 'react';
import { useState } from 'react'
import Form from "./Form"
import StudentList from "./StudentList"

function Home() {
  const [studentList, setStudentList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  function createStudent(user) {
    const foundStudent = studentList.find((item) => {
      return item.username === user.username;
    });
    if (foundStudent) {
      alert("Ma so sinh vien da ton tai")
    }
    setStudentList([...studentList, user]);
  }

  function deleteUser(id) {
    const cloneStudenList = [...studentList];
    const index = cloneStudenList.findIndex((user) => user.id === id);
    if (index === -1) return;
    cloneStudenList.splice(index, 1);
    setStudentList(cloneStudenList);
  }

  function getUpdateUser(user) {
    setSelectedUser(user)
  }
  function updateUser(user) {
    const cloneStudenList = [...studentList];
    const index = cloneStudenList.findIndex((item) => item.id === user.id);
    if (index === -1) return;
    cloneStudenList[index] = user;
    setStudentList(cloneStudenList);
  }
  return (
    <div>
      <h1>Thông tin sinh viên</h1>
      <Form createStudent={createStudent}
        selectedUser={selectedUser}
        updateUser={updateUser}
      />
      <StudentList studentList={studentList}
        deleteUser={deleteUser}
        getUpdateUser={getUpdateUser}
      />
    </div>
  )
}

export default Home