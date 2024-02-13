import { z } from "zod";

export const addFriendValidator = z.object({
    email: z.string().email('Please provide a valid email address'),
});
