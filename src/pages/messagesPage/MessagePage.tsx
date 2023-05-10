import styled from "@emotion/styled";
import { CircularProgress, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";

import "./MessagePage.css";
import { useAppDispatch, useAppSelector } from "../../store";
import { loginUserDataSelector } from "../../store/auth";
import { Chat } from "../../components/chat/Chat";
import { useNavigate, useParams } from "react-router-dom";
import { OneChat } from "../../components/oneChat/OneChat";
import {
	ChatsActions,
	chatIdSelector,
	isLoadingUsersChatsSelector,
	isOpenChatSelector,
	usersChatsSelector,
} from "../../store/chats";

const CssPaper = styled(Paper)({
	background: "#3d3d3d",
	borderRadius: 10,
});

export function MessagesPage() {
	const { id } = useParams();
	const dispatch = useAppDispatch();

	const activeUser = useAppSelector(loginUserDataSelector);
	const chats = useAppSelector(usersChatsSelector);
	const [friendId, setFriendId] = useState("");
	const openChat = useAppSelector(isOpenChatSelector);
	const chatId = useAppSelector(chatIdSelector);
	const isLoading = useAppSelector(isLoadingUsersChatsSelector);

	useEffect(() => {
		dispatch(ChatsActions.changeUserId(id || ""));
		dispatch(ChatsActions.requestUsersChats());
	}, [activeUser]);

	const onClick = (chat: any) => {
		setFriendId(
			activeUser?._id == chat.members[0]
				? chat.members[1]
				: chat.members[0]
		);
		dispatch(ChatsActions.changeChatId(chat._id));
		dispatch(ChatsActions.openChat());
	};

	if (isLoading) {
		return (
			<div className="loading">
				<CircularProgress />
			</div>
		);
	}
	return (
		<div className="messagesPage">
			{openChat ? (
				<OneChat friendId={friendId} chatId={chatId || ""} />
			) : (
				<>
					{chats?.length === 0 ? (
						<h1>Сообщений пока нет</h1>
					) : (
						<CssPaper sx={{ width: "100%", padding: "10px" }}>
							{chats.map((chat: any) => {
								return (
									<div
										key={chat._id}
										onClick={() => onClick(chat)}
									>
										<Chat
											friendId={
												activeUser?._id ==
												chat.members[0]
													? chat.members[1]
													: chat.members[0]
											}
										/>
									</div>
								);
							})}
						</CssPaper>
					)}
				</>
			)}
		</div>
	);
}
