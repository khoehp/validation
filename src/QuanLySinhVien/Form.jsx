import React, { useEffect } from 'react'
import { Card, Input, Button } from "antd";
import styles from "./form.module.css"
import { useState } from 'react';
import * as yup from "yup";
import isEmpty from "lodash.isempty";
import { v4 as uuidv4 } from "uuid";

const userSchema = yup.object().shape({
  mssv: yup.string().required("*Vui lòng nhập mã sinh viên"),
  username: yup.string().required("*Vui lòng nhập name").matches(/^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/g,
    "Họ tên phải nhập chữ"),
  phone: yup.string().matches(/^[0-9]+$/g, "Số điện thoại phải nhập số"),
  email: yup.string().required("*Vui lòng nhập email").email("*Email không đúng định dạng"),
})

function Form(props) {

  const [errors, setErrors] = useState({});
  const [student, setStudent] = useState({
    mssv: "",
    username: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (!props.selectedUser) return;
    if (props.selectedUser.mssv === student.mssv) return;

    setStudent(props.selectedUser);
  }, [props.selectedUser]); //eslint-disable-line


  async function handleSubmit(e) {
    e.preventDefault();

    const isValid = await validateForm();
    if (isValid) return;

    if (props.selectedUser) {
      props.updateUser(student);
    } else {
      props.createStudent({ ...student, id: uuidv4() });
    }

    resetForm();
    errors.mssv = "";
    errors.name = "";
    errors.phone = "";
    errors.email = "";
  }

  async function validateForm() {
    const validationErrors = {};
    try {
      await userSchema.validate(student, { abortEarly: false });
    } catch (err) {
      const errObj = { ...err };

      errObj.inner.forEach((validationError) => {
        if (validationErrors[validationError.path]) return;
        validationErrors[validationError.path] = validationError.massage;
      });
      setErrors(validationErrors);
    }
    return isEmpty(validationErrors);
  }

  function handleChange(e) {
    setStudent({ ...student, [e.target.name]: e.target.value })
  }


  function resetForm() {
    setStudent({
      mssv: "",
      username: "",
      phone: "",
      email: "",
    })
  }


  return (
    <Card title="Thông tin sinh viên"
      headStyle={{
        backgroundColor: "#000000",
        color: "#fff"
      }}>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Mã SV</label>
          <Input
            name="mssv"
            onChange={handleChange}
            value={student.mssv}
            placeholder='Mã sinh viên'
          />
          <span style={{ color: "red" }}>{errors.mssv}</span>
        </div>
        <div className={styles.formGroup}>
          <label>Họ tên</label>
          <Input
            onChange={handleChange}
            name="username"
            value={student.username}
            placeholder='Nhập họ tên'
          />
          <span style={{ color: "red" }}>{errors.username}</span>
        </div>
        <div className={styles.formGroup}>
          <label>Số điện thoại</label>
          <Input
            onChange={handleChange}
            name="phone"
            value={student.phone}
            placeholder='Nhập số điện thoại'
          />
          <span style={{ color: "red" }}>{errors.phone}</span>
        </div>
        <div className={styles.formGroup}>
          <label>Email</label>
          <Input
            onChange={handleChange}
            name="email"
            value={student.email}
            placeholder='Nhập Email'
          />
          <span style={{ color: "red" }}>{errors.email}</span>
        </div>
        <div>
          <Button
            htmlType='submiit'
            type='primary'
            className={styles.btn}
          >
            Thêm sinh viên
          </Button>


        </div>
      </form>
    </Card>
  )
}

export default Form