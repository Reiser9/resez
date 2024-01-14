"use client";

import io, { Socket } from "socket.io-client";
import { v4 } from 'uuid';

const uniqueId = v4();
if(typeof window !== "undefined"){
    localStorage.setItem("uniqueId", uniqueId);
}

export const socket: Socket = io(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080", {
    withCredentials: true,
    forceNew: true,
    reconnectionAttempts: Infinity,
    timeout: 10000,
    transports: ["websocket"],
    auth: {
        uniqueId
    }
});