import { useEffect, useState } from "react"

export const useInput = () => {
    const [input, setInput] = useState({
        forward: false,
        backward: false,
        right: false,
        left: false
    });

    const keys = {
        KeyW: 'forward',
        KeyS: 'backward',
        KeyA: 'left',
        KeyD: 'right'
    };

    const findKey = (key: string) => keys[key];

    useEffect(() => {
        const handleKeyUp = (e) => {
            setInput((m) => ({...m, [findKey(e.code)]: false}))
        };

        const handleKeyDown = (e) => {
            setInput((m) => ({...m, [findKey(e.code)]: true}))
        }

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        return () => {
            document.addEventListener("keydown", handleKeyDown);
            document.addEventListener("keyup", handleKeyUp);
        }

    }, [])

    return input;
}