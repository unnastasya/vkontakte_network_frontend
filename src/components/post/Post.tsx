import React, { useEffect, useState } from "react";
import { PostType } from "../addPost/AddPost";
import { Avatar, IconButton, Paper, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ClearIcon from "@mui/icons-material/Clear";

import "./Post.css";
import styled from "@emotion/styled";
import { PostsActions } from "../../store/posts";
import { useAppDispatch } from "../../store";
import { getUser } from "../../api/auth";
import { UserType } from "../../types/UserType";

interface PostProps {
	post: PostType;
}

const CssPaper = styled(Paper)({
	background: "#3d3d3d",
	padding: "10px",
	borderRadius: 10,
});
const DeleteButton = styled(IconButton)({
	position: "absolute",
	color: "white",
});

export function Post({ post }: PostProps) {
	const dispatch = useAppDispatch();
	const [isLikedPost, setIsLikedPost] = useState<boolean>(false);
	const activeUserId = window.localStorage.getItem("activeUserId");
	const [user, setUser] = useState<UserType | null>(null);
	const time = new Date();
	time.setTime(Date.parse(post.createdAt));

	useEffect(() => {
		if (
			post.likedUsersId.includes(
				window.localStorage.getItem("activeUserId") || ""
			)
		)
			setIsLikedPost(true);
		else setIsLikedPost(false);
		getUser(post.user || "").then((response) => setUser(response));
	}, [post]);

	const addLike = async () => {
		dispatch(PostsActions.changeAddLikePostId(post._id));
		dispatch(PostsActions.likePost());
	};

	const onClickDeletePost = async () => {
		dispatch(PostsActions.changeDeletePostFormdata(post._id));
		dispatch(PostsActions.deletePost());
	};

	return (
		<CssPaper>
			<div className="post">
				{activeUserId === user?._id && (
					<DeleteButton
						onClick={onClickDeletePost}
						className="post__deleteButton"
					>
						<ClearIcon />
					</DeleteButton>
				)}
				<div className="post__userInfo">
					<Avatar
						sx={{
							width: "50px",
							height: "50px",
							marginRight: "10px",
						}}
						src={user?.avatarUrl}
						alt={user?.fullName}
					/>
					<div>
						<Typography>{user?.fullName}</Typography>
						<Typography>{time.toLocaleString()}</Typography>
					</div>
				</div>
				<Typography>{post.text}</Typography>
				<img className="post__photo" src={post.imageUrl} />
				<div className="post__likeBlock">
					<IconButton
						disableRipple={true}
						onClick={addLike}
						sx={{ marginRight: "10px" }}
					>
						{isLikedPost ? (
							<FavoriteIcon sx={{ color: "red" }} />
						) : (
							<FavoriteBorderIcon color="secondary" />
						)}
					</IconButton>
					<p>{post.likesCount}</p>
				</div>
			</div>
		</CssPaper>
	);
}
