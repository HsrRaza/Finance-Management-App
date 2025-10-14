import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";


export function cn(...classes:unknown[]){
    return twMerge(clsx(classes));
}