import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions'

import "./index.scss";
import { Form, Input, Button, message } from "antd";

export default function Login(props) {

  const auth = useSelector(state => state.auth);
  const { isLoginRejected } = auth;
  const loginDispatch = useDispatch();

  const [form] = Form.useForm();

  function onSubmit(credentials) {
    loginDispatch(login(credentials, props.history))

  }

  useEffect(() => { isLoginRejected && message.error("Incorrect Email/Password") }, [isLoginRejected]);

  return (
    <Form
      form={form}
      name="login"
      onFinish={onSubmit}
      layout="vertical"
      hideRequiredMark
      scrollToFirstError
      className='login'
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email" }]}
      >
        <Input autoFocus />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit">Login</Button>
      </Form.Item>
    </Form>

  );
}
