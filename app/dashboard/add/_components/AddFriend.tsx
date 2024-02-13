"use client";
import { Button, Callout, Flex, Heading, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { addFriendValidator } from "@/app/lib/validations/addFriendValidator";
import Spinner from "@/app/ui/Spinner";

type SearchFriendForm = z.infer<typeof addFriendValidator>;

const AddFriendButton = () => {
    const [success, setSuccess] = useState<boolean>(false);
    const [isSubmitting, setSubmitting] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<SearchFriendForm>({
        resolver: zodResolver(addFriendValidator),
    });

    const addFriend = async (email: string) => {
        try {
            const validatedEmail = addFriendValidator.parse({ email });
            setSubmitting(true);
            await axios.post("/api/friends/add", {
                email: validatedEmail,
            });
            setSuccess(true);
        } catch (error) {
            setSubmitting(false);
            if (error instanceof z.ZodError) {
                setError("email", { message: error.message });
                return;
            }

            if (error instanceof AxiosError) {
                setError("email", { message: error.response?.data });
                return;
            }

            setError("email", { message: "An Unexpected Error Occured." });
        }
    };

    const onSubmit = (data: SearchFriendForm) => {
        addFriend(data.email);
        // setSubmitting(true);
        // console.log(data)
    };

    return (
        <div className="max-w-sm">
            <Heading size={"3"} className="pt-5 pb-2 pl-1">
                Add Friend By Email
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex gap={"2"} justify={"between"}>
                    <TextField.Root className="!w-full" variant="soft">
                        <TextField.Input
                            {...register("email")}
                            placeholder=" your-email@example.com"
                        />
                    </TextField.Root>
                    <Button disabled={isSubmitting}>
                        Add {isSubmitting && <Spinner />}
                    </Button>
                </Flex>
            </form>
            {errors.email?.message && (
                <Callout.Root size={"1"} color="red" className="mt-3">
                    <Callout.Text>{errors.email?.message}</Callout.Text>
                </Callout.Root>
            )}
            {success && (
                <Callout.Root size={"1"} color="green" className="mt-3">
                    <Callout.Text>Friend Request Sent</Callout.Text>
                </Callout.Root>
            )}
        </div>
    );
};

export default AddFriendButton;
