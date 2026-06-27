"use client";

import { Pagination } from "@heroui/react";
import Link from "next/link";


export default function PaginationBasic({ pages, totalPages , baseRoute }) {
    const page = Number(pages)

    return (
        <Pagination className="justify-center pt-6">
            <Pagination.Content>
                <Pagination.Item>
                    <Pagination.Previous isDisabled={page === 1}>
                        <Link className="flex items-center" href={`${baseRoute}?page=${page - 1}`}>
                            <Pagination.PreviousIcon />
                            <span>Previous</span>
                        </Link>
                    </Pagination.Previous>
                </Pagination.Item>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Pagination.Item key={p}>
                        <Link href={`${baseRoute}?page=${p}`}>
                            <Pagination.Link className={p === page ? "bg-emerald-500 text-white" : "hover:bg-slate-800"} isActive={p === page}>
                                {p}
                            </Pagination.Link>
                        </Link>
                    </Pagination.Item>
                ))}
                <Pagination.Item>
                    <Pagination.Next isDisabled={page === totalPages}>
                        <Link className="flex items-center" href={`${baseRoute}?page=${page+1}`}>
                            <span>Next</span>
                            <Pagination.NextIcon />
                        </Link>
                    </Pagination.Next>
                </Pagination.Item>
            </Pagination.Content>
        </Pagination>
    );
}