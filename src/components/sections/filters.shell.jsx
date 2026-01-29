"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Input from "../ui/input";
import Select from "../ui/select";

function useDebounce(value, delay = 400) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const id = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(id);
    }, [value, delay]);
    return debounced;
}

export default function FiltersShell({ language, searchParams, children }) {

       const sortOptions = [
        {
            title: language.app.labels.sortByNewest,
            code: "created_at",
            ascending: 'desc'
        },
        {
            title: language.app.labels.sortByOldest,
            code: "created_at",
            ascending: 'asc'
        }
    ]
    const router = useRouter();
    const pathname = usePathname();
    const sp = useSearchParams();
    const [pending, startTransition] = useTransition();

    // normalized current values
    const initSearch = searchParams?.search ?? "";
    const initCategory = searchParams?.category ?? "";
    const initLimit = searchParams?.limit ?? "";
    const initSortObj = searchParams?.sort
        ? { code: searchParams.sort.split(".")[0], ascending: searchParams.sort.split(".")[1] === "asc" }
        : { code: "created_at", ascending: false };

    // local inputs
    const [term, setTerm] = useState(initSearch);
    useEffect(() => setTerm(initSearch), [initSearch]);
    const debouncedTerm = useDebounce(term);

    const navTo = useMemo(() => {
        return (next) => {
            const params = new URLSearchParams(sp?.toString() || "");
            const setOrDelete = (k, v) => {
                if (v === undefined || v === null || v === "" || v === false) params.delete(k);
                else params.set(k, String(v));
            };

            if (next.search !== undefined) setOrDelete("search", next.search?.trim());
            if (next.category !== undefined) setOrDelete("category", next.category);
            if (next.limit !== undefined) setOrDelete("limit", next.limit);
            if (next.sortCode !== undefined && next.sortAsc !== undefined) {
                const code = next.sortCode || "created_at";
                const asc = next.sortAsc ? "asc" : "desc";
                setOrDelete("sort", `${code}.${asc}`);
            }

            const qs = params.toString();
            return qs ? `${pathname}?${qs}` : pathname;
        };
    }, [pathname, sp]);

    const go = (next) =>
        startTransition(() => {
            router.replace(navTo(next));
        });

    // search debounced
    useEffect(() => {
        if (debouncedTerm !== initSearch) go({ search: debouncedTerm });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedTerm]);

    return (
        <>
            <div className="projects__list-filters"  aria-busy={pending ? "true" : "false"}>
                <div className="projects__list-filter_up">
                    <div className="projects__list-filter_search">
                        <Input value={term} onChange={(e) => {
                        setTerm(e.target.value)
                        go({ search: e.target.value })
                    }} type={'search'} placeholder={language.app.labels.searchProjects} />
                    </div>
                    <div className="projects__list-filter_select">
                           <select
                    name="sortAsc"
                    value={String(!!initSortObj.ascending)}
                    onChange={(e) => go({ sortCode: initSortObj.code, sortAsc: e.target.value === "true" })}
                    className="select"
                >
                    <option value="true">Asc</option>
                    <option value="false">Desc</option>
                </select>
                    </div>
                </div>
                {children}
            </div>
            {/* <div className="projects__filters" aria-busy={pending ? "true" : "false"}>
                <input
                    type="text"
                    name="search"
                    value={term}
                    onChange={(e) => {
                        setTerm(e.target.value)
                        go({ search: e.target.value })
                    }}
                    placeholder={language?.app?.pages?.projects?.filters?.searchPlaceholder ?? "Search…"}
                    className="input"
                />

                categories slot (streams via server)
                {children}

                <input
                    type="number"
                    min={1}
                    name="limit"
                    defaultValue={initLimit || ""}
                    onChange={(e) => go({ limit: e.target.value })}
                    placeholder="Limit"
                    className="input"
                />

                <select
                    name="sortCode"
                    value={initSortObj.code}
                    onChange={(e) => go({ sortCode: e.target.value, sortAsc: !!initSortObj.ascending })}
                    className="select"
                >
                    <option value="created_at">Created at</option>
                    <option value="title">Title</option>
                </select>

                <select
                    name="sortAsc"
                    value={String(!!initSortObj.ascending)}
                    onChange={(e) => go({ sortCode: initSortObj.code, sortAsc: e.target.value === "true" })}
                    className="select"
                >
                    <option value="true">Asc</option>
                    <option value="false">Desc</option>
                </select>
            </div> */}
        </>
    );
}
