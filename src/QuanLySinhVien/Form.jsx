import React from 'react'
import { Card, Input, Button } from "antd";
import styles from "./form.module.css"
import { useState } from 'react';
import * as yup from "yup";
import isEmpty from "lodash.isempty";

const userSchema = yup.object().shape({
  id: yup
    .required("*Vui lòng nhập trường này")
    .matches(/^[0-9]+$/g),
  username: yup.string().required("*Vui lòng nhập tài khoản"),
  email: yup
    .string()
    .required("*Vui lòng nhập trường này")
    .email("*Email không đúng định dạng"),  
  phone: yup
    .string()
    .required("*Vui lòng nhập trường này")
    .matches(/^[0-9]+$/g),
})
function Form(props) {
  const [errors, setErrors] = useState([]);

  const [student, setStudent] = useState({
    id: "",
    username: "",
    phone: "",
    email: "",
  });


  async function validateForm() {
    const validationErrors = {};
    try {
      await userSchema.validate(student, { abortEarly: false });
    } catch (err) {
      const errObj = { ...err };

      errObj.inner.forEach((validationErrors) => {
        if (validationErrors[validationErrors.path]) return;
        validationErrors[validationErrors.path] = validationErrors.massage;
      });
      setErrors(validationErrors);
    }
    return isEmpty(validationErrors);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const isValid = await validateForm();
    if (isValid) return;

    if (props.selectedUser) {
      props.updateUser(student);
    } else {
      props.createStudent({ ...student,id1: Math.floor(Math.random() *1000  )  })
    }
  }

  function handleChange(e) {
    console.log(e.target.value, e.target.name)
    setStudent({ ...student, [e.target.name]: e.target.value })
  }

  function resetForm() {
    setStudent({
      id: "",
      username: "",
      phone: "",
      email: "",
    })
  }


  return (
    <Card title="Thông tin sinh viên" headStyle={{ backgroundColor: "#000000", color: "#fff" }}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Mã SV</label>
          <Input onChange={handleChange}
            name="id"
            placeholder='Mã sinh viên' />
        </div>
        <div className={styles.formGroup}>
          <label>Họ tên</label>
          <Input
            onChange={handleChange}
            name="username"
            placeholder='Nhập họ tên' />
        </div>
        <div className={styles.formGroup}>
          <label>Số điện thoại</label>
          <Input
            onChange={handleChange}
            name="phone"
            placeholder='Nhập số điện thoại' />
        </div>
        <div className={styles.formGroup}>
          <label>Email</label>
          <Input
            onChange={handleChange}
            name="email"
            placeholder='Nhập Email' />
        </div>
        <div>
          <Button htmlType='submiit' type='primary' className={styles.btn}>Thêm sinh viên</Button>
          <Button onClick={resetForm} type="default">
            Reset
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default Form