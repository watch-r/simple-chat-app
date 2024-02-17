interface User {
    id: string;
    name: string;
    email: string;
    image: string;
}



type Chat = {
    id: string;
    messages: Message[];
};

type FriemdRequest = {
    id: string;
    senderId: string;
    receiver: string;
};
