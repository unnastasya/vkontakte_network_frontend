import React from "react";
import { Outlet } from "react-router";
import { SideMenu } from "../sideMenu/SideMenu";

import "./Page.css";

export function Page() {
	return (
		<div className="page">
			<div className="page_content">
				<SideMenu />
				<Outlet />
			</div>
		</div>
	);
}
