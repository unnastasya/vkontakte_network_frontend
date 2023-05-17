import { Avatar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getUser } from "../../api/auth";

import "./Message.css";
import { UserType } from "../../types/UserType";
import { MessageType } from "../../types/ChatType";

interface MessageProps {
	message: MessageType;
}

export function Message({ message }: MessageProps) {
	const [sender, setSender] = useState<UserType>();

	useEffect(() => {
		getUser(message.sender).then((response) => setSender(response));
	}, [message]);

	return (
		<div className="message__block">
			<div className="message">
				<Avatar
					sx={{ marginRight: "10px" }}
					src={sender?.avatarUrl || ""}
				/>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<Typography sx={{ color: "#71AAEB" }}>
						<b>{sender?.fullName || ""}</b>
					</Typography>
					<Typography>{message.text}</Typography>
				</div>
			</div>
		</div>
	);
}
