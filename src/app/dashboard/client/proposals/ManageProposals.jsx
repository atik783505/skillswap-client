"use client";
import { useState } from "react";
import { Card, Button, Avatar, Chip } from "@heroui/react";
// Gravity UI Icons ইমপোর্ট
import { Person, Check, Xmark, Briefcase } from "@gravity-ui/icons";

const ManageProposals = ({ proposals }) => {
    const [data, setData] = useState(proposals);

    return (
        <div className="p-8 bg-slate-950 min-h-screen text-white">
            {/* হেডার - Gravity UI আইকনসহ */}
            <div className="flex items-center gap-3 mb-6 text-xl font-semibold">
                <div className="p-2 bg-slate-800 rounded-lg">
                    <Person className="w-6 h-6 text-green-400" />
                </div>
                <h2>Recent Proposals</h2>
            </div>
            
            <div className="space-y-4">
                {data.map((p) => (
                    <Card key={p._id} className="bg-slate-900/40 p-6 border border-slate-900 shadow-none rounded-lg">
                        <div className="mb-4 pb-3 border-b border-slate-800 flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-slate-500" />
                            <h3 className="text-sm font-medium text-slate-300">{p.taskDetails?.title}</h3>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <Avatar className="w-12 h-12 bg-slate-800 text-white rounded-lg">
                                    <Avatar.Image src={p.freelancerInfo.image} />
                                    <Avatar.Fallback className="rounded-lg">
                                        {p.freelancerInfo.name.charAt(0).toUpperCase()}
                                    </Avatar.Fallback>
                                </Avatar>

                                <div>
                                    <p className="font-bold text-lg">{p.freelancerInfo.name}</p>
                                    <div className="flex items-center gap-4 text-sm text-slate-400 mt-1">
                                        <p>Bid: <span className="text-white">${p.proposedBudget}</span></p>
                                        <p>Time: <span className="text-white">{p.estimatedDays} Days</span></p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex gap-3">
                                {p.status === 'pending' ? (
                                    <>
                                        <Button 
                                            className="bg-green-500 text-black font-semibold hover:bg-green-600 rounded-sm px-6"
                                        >
                                            Accept
                                        </Button>
                                        <Button 
                                            className="bg-transparent border border-pink-300 text-pink-300 hover:bg-pink-300/10 rounded-sm px-6"
                                            variant="bordered"
                                        >
                                            Reject
                                        </Button>
                                    </>
                                ) : (
                                    <Chip 
                                        className={p.status === 'accepted' ? "bg-green-500/20 text-green-400 rounded-md" : "bg-red-500/20 text-red-400 rounded-md"}
                                        radius="sm"
                                        startContent={p.status === 'accepted' ? <Check size={14} /> : <Xmark size={14} />}
                                    >
                                        {p.status.toUpperCase()}
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