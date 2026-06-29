"use client";
import { useState, useEffect } from "react";
import { Card, Button, Avatar, Chip } from "@heroui/react";
import { Person, Check, Xmark, Briefcase } from "@gravity-ui/icons";

const ManageProposals = ({ proposals }) => {
    const [data, setData] = useState(proposals);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="p-4 md:p-8 bg-slate-950 min-h-screen text-white">
            <div className="flex items-center gap-3 mb-6 text-lg md:text-xl font-semibold">
                <div className="p-2 bg-slate-800 rounded-lg">
                    <Person className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
                </div>
                <h2>Recent Proposals</h2>
            </div>

            <div className="space-y-4">
                {data.map((p) => (
                    <Card key={p._id} className="bg-slate-900/40 p-4 md:p-6 border border-slate-900 shadow-none rounded-lg">
                        <div className="mb-4 pb-3 border-b border-slate-800 flex items-center gap-2 overflow-hidden">
                            <Briefcase className="w-4 h-4 text-slate-500 shrink-0" />
                            <h3 className="text-sm font-medium text-slate-300 truncate">{p.taskDetails?.title}</h3>
                        </div>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                            <div className="flex items-center gap-4">
                                <Avatar 
                                    className="w-12 h-12 bg-slate-800 text-white rounded-lg shrink-0"
                                >
                                    <Avatar.Image referrerPolicy="no-referrer" src={p?.freelancerInfo?.image || "https://img.heroui.chat/image/avatar?w=400&h=400&u=3"} />
                                    <Avatar.Fallback className="rounded-lg">
                                        {p?.freelancerInfo?.name ? p.freelancerInfo.name.charAt(0).toUpperCase() : "U"}
                                    </Avatar.Fallback>
                                </Avatar>

                                <div className="min-w-0">
                                    <p className="font-bold text-base md:text-lg truncate">{p.freelancerInfo?.name}</p>
                                    <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-slate-400 mt-1">
                                        <p>Bid: <span className="text-white">${p.proposedBudget}</span></p>
                                        <p>Time: <span className="text-white">{p.estimatedDays} Days</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row gap-2 w-full md:w-auto">
                                {p.status === 'pending' ? (
                                    <>
                                        <form action={'/api/payment'} method="POST" className="flex gap-2 w-full">
                                            <input type="hidden" name="task_id" value={p.taskId} />
                                            <input type="hidden" name="freelancer_email" value={p.freelancerInfo?.email} />
                                            <input type="hidden" name="client_email" value={p.taskDetails?.clientEmail} />
                                            <input type="hidden" name="amount" value={p.proposedBudget} />
                                            <input type="hidden" name="proposal_id" value={p._id.toString()} />
                                            <Button
                                                type="submit"
                                                className="flex-1 font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-sm"
                                            >
                                                Accept
                                            </Button>
                                        </form>
                                        <Button
                                            className="flex-1 md:flex-none bg-transparent border border-pink-300 text-pink-300 hover:bg-pink-300/10 rounded-sm px-4 md:px-6"
                                            variant="bordered"
                                        >
                                            Reject
                                        </Button>
                                    </>
                                ) : (
                                    <Chip
                                        radius="sm"
                                        className={`w-full justify-center ${p.status === 'accepted'
                                                ? "bg-green-500/20 text-green-400"
                                                : "bg-red-500/20 text-red-400"
                                            }`}
                                        startContent={p.status === 'accepted' ? <Check size={14} /> : <Xmark size={14} />}
                                    >
                                        {p.status === 'accepted' ? "ACCEPTED" : "REJECTED"}
                                    </Chip>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ManageProposals;