"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

export const Search = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(() => {
        // Initialize from URL on first render
        return searchParams.get("query") || "";
    });

    // Update URL when query changes (debounced)
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const currentQuery = searchParams.get("query") || "";

            // Only update if the query has actually changed
            if (query !== currentQuery) {
                if (query) {
                    const newUrl = formUrlQuery({
                        searchParams: searchParams.toString(),
                        key: "query",
                        value: query,
                    });
                    router.push(newUrl, { scroll: false });
                } else {
                    const newUrl = removeKeysFromQuery({
                        searchParams: searchParams.toString(),
                        keysToRemove: ["query"],
                    });
                    router.push(newUrl, { scroll: false });
                }
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query, router, searchParams]);

    return (
        <div className="search">
            <Image
                src="/assets/icons/search.svg"
                alt="search"
                width={24}
                height={24}
            />

            <Input
                className="search-field"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    );
};