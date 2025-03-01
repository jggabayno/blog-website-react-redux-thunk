import React, { createElement, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { loadPosts, storePost } from '../../actions'

import makeHelpers from '../../utilities/helpers'

import { Row, Col, Comment, Avatar, Form, Button, Input, Tooltip, Skeleton } from 'antd';
import { LikeOutlined, LikeFilled, CommentOutlined } from '@ant-design/icons';

import moment from 'moment';

import './index.scss'

import CommentSection from './components/CommentSection';

export default function Home(props) {

    const auth = useSelector(state => state.auth)
    const { isLoggedIn, loggedData } = auth;

    const dispatchPosts = useDispatch();
    const dispatchStorePost = useDispatch()

    useEffect(() => { dispatchPosts(loadPosts()) }, [dispatchPosts])
    const posts = useSelector(state => state.posts)

    const [form] = Form.useForm();

    const onComment = (postId) => {

        if (isLoggedIn) {
            if (commentRelated[1] !== postId) {
                setCommentRelated([true, postId])
                setIsCommentsShowAndMatchId([true, postId])
            } else {
                setCommentRelated(prev => [!prev[0], postId])
                setIsCommentsShowAndMatchId(prev => [!prev[0], postId])
            }

        } else {
            props.history.push('/login')
        }
    }

    const onCommentsShow = (postId) => (isLoggedIn ?
        (isCommentsShowAndMatchId[1] !== postId ? setIsCommentsShowAndMatchId([true, postId]) : setIsCommentsShowAndMatchId(prev => [!prev[0], postId]))
        : props.history.push('/login'))

    const [isPostBtnShow, setIsBtnShow] = useState(false)

    const [isCommentsShowAndMatchId, setIsCommentsShowAndMatchId] = useState([false, null])

    console.log('isCommentsShowAndMatchId', isCommentsShowAndMatchId)

    const [commentRelated, setCommentRelated] = useState([false, null])


    function postFormProps() {

        const onStorePost = (params) => {
            dispatchStorePost(storePost(params))
            form.resetFields();
        }

        const onShowSubmitBtn = () => setIsBtnShow(true)
        const onHideSubmitBtn = () => setTimeout(() => { setIsBtnShow(false) }, 1000)

        return {
            form,
            id: 'post',
            name: 'post',
            onFinish: onStorePost,
            onFocus: onShowSubmitBtn,
            onBlur: onHideSubmitBtn,
        }
    }

    return (
        <Row type='flex'>
            <Col flex='auto'>
                {isLoggedIn && <Comment
                    style={{ width: 400 }}
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
                    content={
                        <Form {...postFormProps()}>

                            <Form.Item name='body'>
                                <Input.TextArea
                                    rows={isPostBtnShow ? 4 : 2}
                                    placeholder={`What's on your mind? ${loggedData?.user?.name || ''}`}
                                />
                            </Form.Item>

                            {isPostBtnShow &&
                                <Form.Item>
                                    <Button htmlType="submit" type="primary" >
                                        Post
                                    </Button>
                                </Form.Item>
                            }
                        </Form>
                    }
                />}

                {/* {posts.isLoading && <Skeleton active avatar paragraph={{ rows: 2 }} />} */}

                {posts.data.sort((acc, cur) => moment.utc(cur.created_at).diff(moment.utc(acc.created_at))).map((post) => (
                    <Comment
                        key={post.id}
                        actions={[
                            <Tooltip

                                key="comment-basic-like"
                                title={!post.likes.length ? null :

                                    makeHelpers().uniqueEntriesByObject(post.likes, 'user_id').map(like =>
                                        <div key={like.id}>
                                            <span>
                                                {(like.liker?.name === auth?.loggedData?.user?.name) ? 'Youdddd' : like.liker?.name}
                                            </span>
                                            <br />
                                        </div>
                                    )
                                }>
                                <span>
                                    {createElement(post.likes.length ? LikeFilled : LikeOutlined)} Like
                                    <span className="comment-action">{post.likes.length ? post.likes.length : null}</span>
                                </span>
                            </Tooltip>,
                            <Tooltip key="comment-basic-dislike" title={
                                makeHelpers().uniqueEntriesByObject(post.comments, 'user_id')
                                    .map(comment =>
                                        <div key={comment.id}>
                                            <span>{comment.commenter?.name === auth?.loggedData?.user?.name ? 'You' : comment.commenter?.name}</span>
                                            <br />
                                        </div>
                                    )}>
                                {post.comments.length ?

                                    <span onClick={() => onCommentsShow(post.id)}>
                                        {React.createElement(CommentOutlined)}
                                        <span className="comment-action" >{post.comments.length || null}</span>
                                    </span> : null
                                }
                            </Tooltip>,
                            <span key="comment-basic-reply-to" onClick={() => onComment(post.id)}>Comment</span>]}
                        author={<a>{post?.user?.name === auth?.loggedData?.user?.name ? 'You' : post?.user?.name}</a>}
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
                        content={<p>{post.body}</p>}
                        datetime={<Tooltip title={moment(post.created_at).format('YYYY-MM-DD HH:mm:ss')}><span>{moment(post.created_at).fromNow()}</span></Tooltip>
                        }

                        style={{ background: '#fff', margin: '1rem 0', padding: '2rem 1.5rem', border: '1px solid #f0f0f0' }}
                    >
                        {(commentRelated[0] && (commentRelated[1] === post.id)) && (
                            <CommentSection
                                post={post}
                                setCommentRelated={setCommentRelated}
                                setIsCommentsShowAndMatchId={setIsCommentsShowAndMatchId}
                                isCommentsShowAndMatchId={isCommentsShowAndMatchId}

                            />
                        )}
                        {   (isCommentsShowAndMatchId[0] && (isCommentsShowAndMatchId[1] === post.id)) &&
                            post.comments.map(comment => (
                                <Comment
                                    key={comment.id}
                                    actions={[
                                        <Tooltip
                                            key="comment-basic-like"
                                            title={null
                                                // post.likes.map(like =>
                                                //     <div key={like.id}>
                                                //         <span>
                                                //             {(like.liker?.name === auth?.loggedData?.user?.name) ? 'You' : like.liker?.name}
                                                //         </span>
                                                //         <br />
                                                //     </div>
                                                // )
                                            }>
                                            <span>
                                                {createElement(post.likes.length ? LikeFilled : LikeOutlined)}
                                                {/* <span className="comment-action">{post.likes.length}</span> */}
                                            </span>
                                        </Tooltip>,
                                        <span key="comment-basic-reply-to" onClick={() => onComment(post.id)}>Reply</span>,
                                        <span>{moment(comment.created_at).fromNow()}</span>
                                    ]}
                                    author={<a>{comment?.commenter?.name}</a>}
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
                                    content={<p>{comment.body}</p>}
                                />
                            ))}

                    </Comment>
                ))}
            </Col>
        </Row>
    )
}