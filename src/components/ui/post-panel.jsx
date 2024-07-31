"use client"

import { Icons } from "@/config/icons"

export default function PostPanel({post, liked}) {


    return (
        <div className="post__panel">
            <div className="post__panel-detail">
                <div className={liked?.length !== 0 ? "post__panel-detail_icon active" : "post__panel-detail_icon"}>
                    <Icons.heart />
                </div>
            </div>
            <div className="post__panel-detail">
                <div className="post__panel-detail_icon">
                    <Icons.comments />
                </div>
            </div>
        </div>
    )
}