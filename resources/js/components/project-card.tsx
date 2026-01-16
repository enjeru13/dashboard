import { Link, router } from '@inertiajs/react';
import { ArrowRight, ExternalLink, MoreVertical, Pencil, Trash2 } from 'lucide-react';

import { CreateProjectModal } from '@/components/create-project-modal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DEFAULT_COLOR, DEPARTMENT_COLORS } from '@/constants/colors';
import { cn } from '@/lib/utils';
import { Project } from '@/types';

interface ProjectCardProps {
    project: Project;
    className?: string;
    isAdmin?: boolean;
}

export function ProjectCard({ project, className, isAdmin = false }: ProjectCardProps) {
    const projectColor = DEPARTMENT_COLORS[project.department] || DEFAULT_COLOR;

    const handleDelete = () => {
        if (confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
            router.delete(`/projects/${project.id}`);
        }
    };

    return (
        <Card
            className={cn(
                "group relative overflow-hidden transition-all duration-300 hover:shadow-md border-transparent",
                "bg-card text-card-foreground flex flex-row items-center p-4 gap-4 h-28",
                className
            )}
            style={{
                borderLeft: `4px solid ${projectColor}`
            }}
        >
            {/* Left: Icon */}
            <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-colors"
                style={{
                    backgroundColor: `${projectColor}15`,
                    color: projectColor
                }}
            >
                <span className="text-xl font-bold uppercase select-none">{project.icon || project.name.substring(0, 2)}</span>
            </div>

            {/* Middle: Content */}
            <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                <div className="flex items-center gap-2">
                    <h3
                        className="text-lg font-semibold tracking-tight truncate text-foreground/90 transition-colors"
                        style={{ '--hover-color': projectColor } as React.CSSProperties}
                    >
                        <span className="group-hover:text-(--hover-color) transition-colors duration-300">
                            {project.name}
                        </span>
                    </h3>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {project.description || "Sin descripción disponible."}
                </p>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1 shrink-0">
                {project.url.startsWith('http') ? (
                    <a href={project.url} target="_blank" rel="noreferrer">
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full">
                            <ExternalLink className="h-4 w-4" />
                        </Button>
                    </a>
                ) : (
                    <Link href={project.url}>
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full">
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                )}

                {isAdmin && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-primary/5 rounded-full">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <CreateProjectModal
                                project={project}
                                trigger={
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
                                        <Pencil className="mr-2 h-3.5 w-3.5" /> Editar
                                    </DropdownMenuItem>
                                }
                            />
                            <DropdownMenuItem onClick={handleDelete} className="text-destructive focus:text-destructive cursor-pointer">
                                <Trash2 className="mr-2 h-3.5 w-3.5" /> Eliminar
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </Card>
    );
}
