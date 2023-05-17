import React from "react";
import { FriendBlock } from "../friendBlock/FriendBlock";
import { Divider, Paper, Typography } from "@mui/material";

import "./Friends.css";
import { useAppSelector } from "../../store";
import { usersFriendsSelector } from "../../store/friend";
import styled from "@emotion/styled";
import { UserType } from "../../types/UserType";

interface FriendsProps {
	// friends: { _id: string; fullName: string; avatarUrl: string }[];
	isFriendsPage?: boolean;
}

const CssPaper = styled(Paper)({
	background: "#3d3d3d",
	padding: "10px",
	borderRadius: 10,
	minHeight: "40px",
});

export function Friends({ isFriendsPage = false }: FriendsProps) {
	const friends = useAppSelector(usersFriendsSelector);

	if (friends.length === 0) {
		return (
			<>
				{isFriendsPage ? (
					<h1 style={{ color: "#ffffff" }}>Друзей пока нет</h1>
				) : (
					<CssPaper>
						<Typography style={{ color: "#ffffff" }}>
							Друзей пока нет
						</Typography>
					</CssPaper>
				)}
			</>
		);
	}
	return (
		<CssPaper>
			<h2 style={{ color: "#ffffff" }}> Друзья</h2>
			<div className={`friends__block__${isFriendsPage}`}>
				{friends.map((friend: string) => {
					return (
						<div key={friend}>
							<FriendBlock
								isFriendsPage={isFriendsPage}
								userId={friend}
							/>
							{friends.indexOf(friend) !== friends.length - 1 &&
								isFriendsPage && (
									<Divider variant="fullWidth" />
								)}
						</div>
					);
				})}
			</div>
		</CssPaper>
	);
}
