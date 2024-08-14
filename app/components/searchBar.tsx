"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Button, Input, Stack } from "@chakra-ui/react";

interface SearchBarProps {
    onSearch: (query: string) => void;
    loading: boolean;
}

//TODO: debounce search
export const SearchBar = ({ onSearch, loading }: SearchBarProps) => {
    const [query, setQuery] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const queryParam = searchParams.get('q');
        if (queryParam) {
            setQuery(queryParam as string);
        }
    }, [searchParams]);

    const handleSearch = () => {
        if (query.trim()) {
            onSearch(query);
            router.push(`/?q=${encodeURIComponent(query)}`)
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <Box mb={4}>
            <Stack direction="row">
                <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search for movies..."
                    size="lg"
                />
                <Button onClick={handleSearch} size="lg" colorScheme="teal" isLoading={loading}>
                    Search
                </Button>
            </Stack>
        </Box>
    )
}