"use client";
import {
    InfoCircledIcon,
    MagnifyingGlassIcon,
    PaperPlaneIcon,
} from "@radix-ui/react-icons";
import { Callout, IconButton, TextField } from "@radix-ui/themes";
import axios from "axios";
import { ChevronRightIcon, Link } from "lucide-react";
import React, { useRef, useState } from "react";

interface ChatInputProps {
    chatPartner: User;
    chatId: string;
}

const ChatInput = ({ chatPartner, chatId }: ChatInputProps) => {
    const textareaRef = useRef(null);
    const [input, setInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const sendMessage = async () => {
        if (!input) return;
        setIsLoading(true);

        try {
            await axios.post("/api/message/send", { text: input, chatId });
            setInput("");
            // textareaRef.current?.focus()
        } catch (error) {
            <Callout.Root color='red'>
                <Callout.Icon>
                    <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                    Something went Wrong, Please try Again Later.
                </Callout.Text>
            </Callout.Root>;
            // toast.error();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <TextField.Root className='h-12 items-center overflow-hidden'>
            <TextField.Slot>
                <ChevronRightIcon height='16' width='16' />
            </TextField.Slot>
            <TextField.Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                ref={textareaRef}
                placeholder={`Message ${chatPartner.name}`}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                    }
                }}
            />
            <TextField.Slot>
                <IconButton
                    disabled={isLoading}
                    onClick={sendMessage}
                    type='submit'
                >
                    <PaperPlaneIcon height='16' width='16' />
                </IconButton>
            </TextField.Slot>
        </TextField.Root>
    );
};

export default ChatInput;
