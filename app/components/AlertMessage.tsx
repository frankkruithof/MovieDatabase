import { Alert, AlertIcon } from "@chakra-ui/react"

interface AlertMessageProps {
    message: string;
    type?: 'error' | 'success' | 'warning' | 'info';
}
export const AlertMessage = ({ message, type = 'info' }: AlertMessageProps) => {
    return (
        <Alert status={type}>
            <AlertIcon />
            {message}
        </Alert>
    )
}