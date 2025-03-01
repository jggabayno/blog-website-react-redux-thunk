import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { storePostComment, loadNotifications } from '../../../actions'

import { Comment, Form, Button, Avatar, Input } from 'antd'



export default function CommentSection({ post, setCommentRelated, isCommentsShowAndMatchId }) {

    const [form] = Form.useForm();

    const [isCommentBtnShow, setIsCommentBtnShow] = useState(false)

    const dispatchStorePostComment = useDispatch();


    const dispatchNotifications = useDispatch()

    function onComment(params) {
        dispatchStorePostComment(storePostComment(post.id, params))

        form.resetFields();
        setCommentRelated([false, null])
        dispatchNotifications(loadNotifications())

    }

    return (
        <Comment
            style={{ width: 400 }}
            avatar={
                <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"
                />
            }
            content={
                <Form
                    form={form}
                    id='comment'
                    name='comment'
                    onFinish={onComment}
                    onFocus={() => {
                        // setIsCommentsShowAndMatchId([true, post.id]);
                        setIsCommentBtnShow(true);
                    }}
                    onBlur={() => setTimeout(() => { setIsCommentBtnShow(false) }, 1000)}

                >

                    <Form.Item name='body'>
                        <Input.TextArea rows={isCommentBtnShow ? 4 : 2}
                            placeholder='Write a comment...' autoFocus={isCommentsShowAndMatchId[0]} />
                    </Form.Item>

                    {isCommentBtnShow &&
                        <Form.Item style={{ all: 'inherit' }}>
                            <Button htmlType="submit" type="primary" >
                                Comment
                            </Button>
                        </Form.Item>}
                </Form >
            }
        />

    )
}
