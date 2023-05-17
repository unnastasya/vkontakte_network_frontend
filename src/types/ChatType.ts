export type AddMessageType = { text: string; sender: string; chatId: string };

export type MessageType = {
	text: string;
	sender: string;
	chatId: string;
};

export type AddChatType = {
    senderId: string;
    receiverId: string;
}

export type ChatType = {
    members: string[];
    _id: string
}