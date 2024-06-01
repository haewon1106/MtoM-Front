import { useEffect, useState } from 'react';
import '../../../styles/common/Style.css';
import styles from '../../../styles/my/post/PostList.module.css';
import PostItem from './PostItem';
import axios from 'axios';

function PostList() {
    const [data, setData] = useState([]);

    const userId = localStorage.getItem("userId");
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_HOST}/api/users/posts`, {
                    params: {
                        userId: userId
                    }
                });
                if (response.status === 200) {
                    console.log("유저의 게시물 조회 성공");
                    setData(response.data);
                } else {
                    console.log("유저의 게시물 조회 실패", response.status);
                }
            } catch(error) {
                console.log("서버 연결 실패", error);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <div className={styles['container']}>
                {
                    data && data.map((item, index) => {
                        return <PostItem key={index} data={item} />
                    })
                }
            </div>
        </>
    )
}

export default PostList;