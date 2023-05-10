import { Avatar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getUser } from "../../api/auth";
import { MessageType } from "../oneChat/OneChat";

import "./Message.css";

interface MessagePost {
	message: MessageType;
}

export function Message({ message }: MessagePost) {
	const [sender, setSender] = useState<any>();

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
