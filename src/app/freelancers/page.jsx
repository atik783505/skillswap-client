import { getAllFreelancer } from '@/lib/api/proposals';
import { Card, Avatar, Button, Chip, Link } from "@heroui/react";

const FreelancerProfile = async () => {
    const freelancers = await getAllFreelancer();

    return (
        <div className="px-4 py-10 bg-slate-950">
            <div className='w-11/12 mx-auto'>

                <h2 className="text-3xl font-bold text-white mb-8">Our Top Freelancers</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {freelancers.map((freelancer) => (
                        <Card key={freelancer._id} className="bg-slate-900/40 border border-slate-800 p-6 flex flex-col gap-4">
                            <div className="flex gap-4 items-center">
                                <Avatar>
                                    <Avatar.Image alt={freelancer.name} src={freelancer.image} />
                                    <Avatar.Fallback>{freelancer.name?.slice(0, 2).toUpperCase()}</Avatar.Fallback>
                                </Avatar>
                                <div className="flex flex-col gap-0.5">
                                    <h4 className="text-white text-lg font-bold">{freelancer.name}</h4>
                                    <p className="text-emerald-400 font-semibold text-small">
                                        ${freelancer.hourlyRate}/hr
                                    </p>
                                </div>
                            </div>

                            {/* বডি */}
                            <div className="flex flex-col gap-3">
                                <p className="text-slate-400 text-sm">{freelancer.bio}</p>
                                <div className="flex flex-wrap gap-2">
                                    {freelancer.skills?.slice(0, 3).map((skill, index) => (
                                        <Chip key={index} size="sm" color="success" variant="flat">
                                            {skill}
                                        </Chip>
                                    ))}
                                </div>
                            </div>

                            {/* ফুটার */}
                            <div className="mt-auto">
                                <Link href={`/freelancers/${freelancer._id}`}>
                                    <Button
                                        className="w-full bg-emerald-500 text-slate-950 font-bold"
                                    >
                                        View Details
                                    </Button>
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FreelancerProfile;