import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

import { CreateProjectModal } from '@/components/create-project-modal';
import { ProjectCard } from '@/components/project-card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type Project, type SharedData } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    projects: Record<string, Project[]>;
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
}

export default function Dashboard({ projects }: DashboardProps) {
    const { auth } = usePage<SharedData>().props;
    const [searchQuery, setSearchQuery] = useState('');
    const departments = Object.keys(projects);

    // Filter projects based on search query
    const filteredProjects = Object.entries(projects).reduce((acc, [department, deptProjects]) => {
        const filtered = deptProjects.filter(project =>
            project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase()))
        );

        if (filtered.length > 0) {
            acc[department] = filtered;
        }
        return acc;
    }, {} as Record<string, Project[]>);

    const hasResults = Object.keys(filteredProjects).length > 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs} departments={departments}>
            <Head title="Dashboard" />
            <div className="flex flex-col h-full gap-6 p-6 overflow-hidden">
                <div className="flex w-full max-w-2xl mx-auto gap-4 items-center">
                    <Input
                        placeholder="Buscar proyectos..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-12 text-lg shadow-sm border-sidebar-border/50 focus-visible:ring-primary/20 bg-background/50 backdrop-blur-sm flex-1"
                    />
                    {auth.user.is_admin && <CreateProjectModal />}
                </div>

                <div className="flex-1 overflow-y-auto rounded-xl">
                    {!hasResults ? (
                        <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-xl border-sidebar-border/50 h-64">
                            <div className="p-4 rounded-full bg-sidebar-accent/50 mb-4">
                                {/* Icon placeholder */}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{searchQuery ? 'No se encontraron proyectos' : 'No hay proyectos'}</h3>
                            <p className="text-muted-foreground max-w-sm">
                                {searchQuery ? `No encontramos proyectos coincidentes con "${searchQuery}".` : "Aún no hay proyectos asignados a tu departamento."}
                            </p>
                        </div>
                    ) : (
                        Object.entries(filteredProjects).map(([groupName, groupProjects]) => (
                            <div key={groupName} className="mb-8 last:mb-0">
                                {groupName && groupName !== "" && (
                                    <h2
                                        id={slugify(groupName)}
                                        className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2 scroll-mt-20"
                                    >
                                        <span className="w-1 h-6 bg-primary rounded-full inline-block"></span>
                                        {groupName}
                                    </h2>
                                )}
                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 pb-4">
                                    {groupProjects.map((project) => (
                                        <ProjectCard key={project.id} project={project} isAdmin={auth.user.is_admin} />
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
