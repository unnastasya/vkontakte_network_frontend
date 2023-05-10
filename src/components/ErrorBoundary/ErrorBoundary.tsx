import { Component, ErrorInfo, ReactNode } from "react";

import "./ErrorBoundary.css";
import { Button } from "@mui/material";

interface Props {
	children?: ReactNode;
}

interface State {
	hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
	};

	public static getDerivedStateFromError(_: Error): State {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("Error:", error, errorInfo);
	}

	resetError = () => this.setState({ hasError: false });

	render() {
		if (this.state.hasError) {
			return (
				<div className="error__block">
					<h1>{`Упс, что-то пошло не так ;(`}</h1>
					<Button onClick={this.resetError} className="error__button">
						Попробовать снова
					</Button>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
