interface User {
    id: string;
    name: string;
    email: string;
    image: string;
}

type Message = {
    id: string;
    senderId: string;
    receiverId: string;
    text: string;
    timestamp: number;
};

type Chat = {
    id: string;
    messages: Message[];
};

type FriemdRequest = {
    id: string;
    senderId: string;
    receiver: string;
};
