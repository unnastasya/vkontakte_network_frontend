import React, { useEffect, useState } from "react";

import "./Chat.css";
import { Avatar, Divider, Typography } from "@mui/material";
import { getUser } from "../../api/auth";
import { UserType } from "../../types/UserType";

interface ChatProps {
	friendId: string;
}

export function Chat({ friendId }: ChatProps) {
	const [friend, setFriend] = useState<UserType>();

	useEffect(() => {
		getUser(friendId).then((response) => setFriend(response));
	}, []);

	return (
		<>
			<div className="chat_container">
				<Avatar
					sx={{ width: "80px", height: "80px", marginRight: "10px" }}
					className="friendBlock__avatar"
					src={friend?.avatarUrl}
					alt={friend?.fullName}
				/>
				<div
					className="chat__info"
				>
					<Typography sx={{ color: "#71AAEB" }}>
						{friend?.fullName}
					</Typography>
					<Divider sx={{ color: "white" }} variant="fullWidth" />
				</div>
			</div>
		</>
	);
}
