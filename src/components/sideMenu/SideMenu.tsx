import { Button } from "@mui/material";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import ArticleIcon from "@mui/icons-material/Article";
import GroupIcon from "@mui/icons-material/Group";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { AuthActions } from "../../store/auth";
import { ChatsActions } from "../../store/chats";

import "./SideMenu.css";

export function SideMenu() {
	const activeUserId = window.localStorage.getItem("activeUserId");
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const logout = () => {
		dispatch(AuthActions.logout());
		navigate("/login");
	};

	return (
		<div className="sideMenu__component">
			<Button
				variant="contained"
				onClick={logout}
				className="sideMenu__button"
			>
				Выйти
			</Button>
			<Link to={`/user/${activeUserId}`}>
				<Button color="secondary" className="sideMenu__button">
					<PersonIcon />
					Моя страница
				</Button>
			</Link>
			<Link to={`/news`}>
				<Button color="secondary" className="sideMenu__button">
					<ArticleIcon />
					Новости
				</Button>
			</Link>
			<Link to={`/friends/${activeUserId}`}>
				<Button color="secondary" className="sideMenu__button">
					<GroupIcon />
					Друзья
				</Button>
			</Link>
			<Link to={`/messages/${activeUserId}`}>
				<Button
					onClick={() => dispatch(ChatsActions.closeChat())}
					color="secondary"
					className="sideMenu__button"
				>
					<EmailOutlinedIcon />
					Сообщения
				</Button>
			</Link>
		</div>
	);
}
