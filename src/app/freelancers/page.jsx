import { getAllFreelancer } from '@/lib/api/proposals';
import { Card, Avatar, Button, Chip, Link } from "@heroui/react";

const FreelancerProfile = async () => {
    const freelancers = await getAllFreelancer();

    return (
        <div className="px-4 py-10 theme-bg-primary">
            <div className='w-11/12 mx-auto'>

                <h2 className="text-3xl font-bold theme-text-primary mb-8">Our Top Freelancers</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {freelancers.map((freelancer) => (
                        <Card key={freelancer._id} className="theme-bg-card theme-border border p-6 flex flex-col gap-4 shadow-sm">
                            <div className="flex gap-4 items-center">
                                <Avatar>
                                    <Avatar.Image alt={freelancer.name} src={freelancer.image} />
                                    <Avatar.Fallback>{freelancer.name?.slice(0, 2).toUpperCase()}</Avatar.Fallback>
                                </Avatar>
                                <div className="flex flex-col gap-0.5">
                                    <h4 className="theme-text-primary text-lg font-bold">{freelancer.name}</h4>
                                    <p className="text-emerald-500 dark:text-emerald-400 font-semibold text-small">
                                        ${freelancer.hourlyRate}/hr
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <p className="theme-text-secondary text-sm">{freelancer.bio}</p>
                                <div className="flex flex-wrap gap-2">
                                    {freelancer.skills?.slice(0, 3).map((skill, index) => (
                                        <Chip key={index} size="sm" color="success" variant="flat">
                                            {skill}
                                        </Chip>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-auto">
                                <Link href={`/freelancers/${freelancer._id}`}>
                                    <Button
                                        className="w-full bg-emerald-500 text-white font-bold hover:bg-emerald-600"
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