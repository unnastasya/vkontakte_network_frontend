import React, { useEffect } from "react";
import { PostType } from "../../components/addPost/AddPost";
import { Post } from "../../components/post/Post";

import "./NewsPage.css";
import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store";
import {
	PostsActions,
	isLoadingUsersPostsSelector,
	usersFriendsPostsSelector,
} from "../../store/posts";

export function NewsPage() {
	const dispatch = useAppDispatch();
	const posts = useAppSelector(usersFriendsPostsSelector);
	const isLoading = useAppSelector(isLoadingUsersPostsSelector);

	useEffect(() => {
		dispatch(PostsActions.requestUsersFriendsPosts());
	}, []);

	if (isLoading) {
		return (
			<div className="loading">
				<CircularProgress />
			</div>
		);
	}

	return (
		<div className="newsPage">
			{posts?.length === 0 && <h1>Постов нет</h1>}
			{posts?.map((post: PostType) => {
				return <Post key={post._id} post={post} />;
			})}
		</div>
	);
}
