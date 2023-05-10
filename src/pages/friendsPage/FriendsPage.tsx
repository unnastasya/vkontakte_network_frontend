import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Friends } from "../../components/friends/Friends";
import { CircularProgress, Paper } from "@mui/material";
import styled from "@emotion/styled";

import "./FriendsPage.css";
import { useAppDispatch, useAppSelector } from "../../store";
import {
	FriendsActions,
	isLoadingUsersFriendsSelector,
} from "../../store/friend";

const CssPaper = styled(Paper)({
	background: "#3d3d3d",
	padding: "10px",
	borderRadius: 10,
});

export function FriendsPage() {
	const dispatch = useAppDispatch();
	const { id } = useParams();

	const isLoading = useAppSelector(isLoadingUsersFriendsSelector);

	useEffect(() => {
		dispatch(FriendsActions.changeRequestUserItData(id || ""));
		dispatch(FriendsActions.requestUsersFriends());
	}, [id]);

	if (isLoading) {
		return (
			<div className="loading">
				<CircularProgress />
			</div>
		);
	}

	return (
		<div className="FriensPage">
			<Friends isFriendsPage={true} />
		</div>
	);
}
