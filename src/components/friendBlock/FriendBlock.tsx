import { Avatar, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import { FriendsActions } from "../../store/friend";
import { useAppDispatch } from "../../store";
import { getUser } from "../../api/auth";

import "./FriendBlock.css";
import { UserType } from "../../types/UserType";

interface FriendBlockProps {
	userId: string;
	isFriendsPage: boolean;
}

export function FriendBlock({
	userId,
	isFriendsPage = false,
}: FriendBlockProps) {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [user, setUser] = useState<UserType>();

	useEffect(() => {
		getUser(userId || "").then((response) => setUser(response));
	}, [userId]);

	const onClick = (e: any) => {
		e.stopPropagation();
		navigate(`/user/${user?._id}`);
	};

	const onClickButtonDelete = async (e: any) => {
		e.stopPropagation();
		dispatch(FriendsActions.changeDeleteFriendData(user?._id || ""));
		dispatch(FriendsActions.deleteFriend());
	};

	if (isFriendsPage) {
		return (
			<div className="friendBlock__friendsPage" onClick={onClick}>
				<Avatar
					sx={{ width: "80px", height: "80px", marginRight: "10px" }}
					src={user?.avatarUrl}
					alt={user?.fullName}
				/>
				<div>
					<Typography sx={{ color: "#ffffff" }}>
						{user?.fullName}
					</Typography>
					{isFriendsPage && (
						<Button
							onClick={onClickButtonDelete}
							variant="contained"
							color="secondary"
						>
							<ClearIcon />
							Удалить
						</Button>
					)}
				</div>
			</div>
		);
	} else {
		return (
			<div className="friendBlock__usersPage" onClick={onClick}>
				<Avatar
					sx={{ width: "60px", height: "60px" }}
					src={user?.avatarUrl}
					alt={user?.fullName}
				/>
				<Typography sx={{ color: "#ffffff" }}>
					{user?.fullName}
				</Typography>
				{isFriendsPage && (
					<Button
						onClick={onClickButtonDelete}
						variant="contained"
						color="secondary"
					>
						<ClearIcon />
						Удалить
					</Button>
				)}
			</div>
		);
	}
}
