import {
	Avatar,
	Button,
	CircularProgress,
	Paper,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";

import "./UserPage.css";
import { Friends } from "../../components/friends/Friends";
import { AddPost, PostType } from "../../components/addPost/AddPost";
import { Post } from "../../components/post/Post";
import styled from "@emotion/styled";
import { useAppDispatch, useAppSelector } from "../../store";
import {
	AuthActions,
	loginUserDataSelector,
	isLoadingUserDataSelector,
	userDataSelector,
} from "../../store/auth";
import {
	PostsActions,
	isLoadingUsersPostsSelector,
	usersPostsSelector,
} from "../../store/posts";
import {
	FriendsActions,
	isLoadingUsersFriendsSelector,
} from "../../store/friend";
import { addChat } from "../../api/chat";
import { ChatsActions } from "../../store/chats";

const CssPaper = styled(Paper)({
	background: "#3d3d3d",
	borderRadius: 10,
	padding: "10px",
});

export function UserPage() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const user = useAppSelector(userDataSelector);
	const userPosts = useAppSelector(usersPostsSelector);

	const activeUserId = window.localStorage.getItem("activeUserId");
	const activeUser = useAppSelector(loginUserDataSelector);

	const isLoadingUser = useAppSelector(isLoadingUserDataSelector);
	const isLoadingFriends = useAppSelector(isLoadingUsersFriendsSelector);
	const isLoadingPosts = useAppSelector(isLoadingUsersPostsSelector);

	const [isFriends, setIsFriends] = useState<boolean>(
		activeUser.friends.includes(id || "")
	);

	useEffect(() => {
		dispatch(AuthActions.changeRequestUserData(id || ""));
		dispatch(AuthActions.requestUser());

		dispatch(PostsActions.changeUserIdData(id || ""));
		dispatch(PostsActions.requestUserPosts());

		dispatch(FriendsActions.changeRequestUserItData(id || ""));
		dispatch(FriendsActions.requestUsersFriends());

		if (activeUser.friends.includes(id || "")) setIsFriends(true);
	}, [id]);

	const onClickButtonAddFriend = () => {
		dispatch(FriendsActions.changeAddFriendData(id || ""));
		dispatch(FriendsActions.addNewFriend());
		setIsFriends((prev) => !prev);
	};

	const onClickButtonDeleteFriend = () => {
		dispatch(FriendsActions.changeDeleteFriendData(id || ""));
		dispatch(FriendsActions.deleteFriend());
		setIsFriends((prev) => !prev);
	};

	const sendMessage = async () => {
		let chatId = "";
		await addChat({
			senderId: activeUser._id,
			receiverTd: id,
		}).then((response) => (chatId = response));
		dispatch(ChatsActions.changeChatId(chatId));
		dispatch(ChatsActions.openChat());
		navigate(`/messages/${activeUserId}`);
	};

	const navigateToFriendsPage = (e: any) => {
		navigate(`/friends/${id}`);
	};

	if (isLoadingUser || isLoadingFriends || isLoadingPosts) {
		return (
			<div className="loading">
				<CircularProgress />
			</div>
		);
	}

	return (
		<div className="userPage">
			<CssPaper className="userPage__info">
				<div className="userPage__imageBlock">
					<Avatar
						sx={{ width: "150px", height: "150px" }}
						src={user?.avatarUrl}
						alt={user?.fullName}
					/>
					{activeUserId !== user?._id && (
						<>
							{isFriends ? (
								<Button
									sx={{ width: "100%" }}
									variant="contained"
									color="error"
									onClick={onClickButtonDeleteFriend}
								>
									{isFriends
										? "Удалить из друзей"
										: "Добавить в друзья"}
								</Button>
							) : (
								<Button
									sx={{ width: "100%" }}
									variant="contained"
									onClick={onClickButtonAddFriend}
								>
									Добавить в друзья
								</Button>
							)}
							<Button
								sx={{ width: "100%" }}
								variant="contained"
								onClick={sendMessage}
							>
								Написать сообщение
							</Button>
						</>
					)}
				</div>
				<div>
					<h1 style={{ color: "#ffffff", margin: "0" }}>
						{user?.fullName}
					</h1>
					<Typography sx={{ color: "#ffffff" }}>
						{user?.age} лет <br />
						<CelebrationOutlinedIcon /> {user?.birthdayDate} <br />
						<PlaceOutlinedIcon />
						{user?.city} <br />
						<BusinessCenterOutlinedIcon />
						{user?.studyPlace} <br />
					</Typography>
				</div>
			</CssPaper>

			<div>
				<div className="userPage__postsBlock">
					{activeUserId === user?._id && (
						<CssPaper>
							<AddPost />
						</CssPaper>
					)}
					{userPosts.length > 0 && (
						<div className="userPage__posts">
							{userPosts?.map((post: PostType) => {
								return <Post key={post._id} post={post} />;
							})}
						</div>
					)}
				</div>
			</div>
			<div
				className="userPage__friendsBlock"
				onClick={navigateToFriendsPage}
			>
				<Friends />
			</div>
		</div>
	);
}
