import { useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Project } from '@/types';

interface ProjectModalProps {
    project?: Project;
    trigger?: React.ReactNode;
}

export function CreateProjectModal({ project, trigger }: ProjectModalProps) {
    const [open, setOpen] = useState(false);
    const isEditing = !!project;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: project?.name || '',
        description: project?.description || '',
        url: project?.url || '',
        department: project?.department || '',
        // category: project?.category || '', // Removed
        icon: project?.icon || '',
        // color: project?.color || '#000000', // Removed
    });

    useEffect(() => {
        if (open) {
            if (project) {
                setData({
                    name: project.name,
                    description: project.description || '',
                    url: project.url,
                    department: project.department,
                    // category: project.category || '',
                    icon: project.icon || '',
                    // color: project.color || '#000000',
                });
            } else {
                reset();
            }
        }
    }, [open, project]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (project) {
            put(`/projects/${project.id}`, {
                onSuccess: () => {
                    setOpen(false);
                },
            });
        } else {
            post('/projects', {
                onSuccess: () => {
                    reset();
                    setOpen(false);
                },
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Nuevo Proyecto
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Editar Proyecto' : 'Crear Nuevo Proyecto'}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? 'Actualiza los detalles del proyecto.' : 'Agrega un nuevo proyecto al panel.'} Haz clic en guardar cuando termines.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Nombre
                        </Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="col-span-3"
                            required
                        />
                        {errors.name && <span className="col-span-4 text-right text-destructive text-sm">{errors.name}</span>}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Descripción
                        </Label>
                        <Input
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="col-span-3"
                            required
                        />
                        {errors.description && <span className="col-span-4 text-right text-destructive text-sm">{errors.description}</span>}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="url" className="text-right">
                            URL
                        </Label>
                        <Input
                            id="url"
                            value={data.url}
                            onChange={(e) => setData('url', e.target.value)}
                            className="col-span-3"
                            required
                        />
                        {errors.url && <span className="col-span-4 text-right text-destructive text-sm">{errors.url}</span>}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="department" className="text-right">
                            Departamento
                        </Label>
                        <Input
                            id="department"
                            value={data.department}
                            onChange={(e) => setData('department', e.target.value)}
                            className="col-span-3"
                            required
                        />
                        {errors.department && <span className="col-span-4 text-right text-destructive text-sm">{errors.department}</span>}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="icon" className="text-right">
                            Icono (Corto)
                        </Label>
                        <Input
                            id="icon"
                            value={data.icon}
                            onChange={(e) => setData('icon', e.target.value)}
                            className="col-span-3"
                            maxLength={5}
                        />
                        {errors.icon && <span className="col-span-4 text-right text-destructive text-sm">{errors.icon}</span>}
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Guardando...' : (isEditing ? 'Actualizar Proyecto' : 'Guardar Proyecto')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
