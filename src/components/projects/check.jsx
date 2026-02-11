"use client";

import { Suspense } from "react";
import ProjectsChipsShell from "./projects-chips-shell";

export default function Check({ searchParams, language }) {
    return (
        <Suspense key={searchParams} fallback={<div>Loading users...</div>}>
            <ProjectsChipsShell language={language} searchParams={searchParams} />
        </Suspense>
    );
}