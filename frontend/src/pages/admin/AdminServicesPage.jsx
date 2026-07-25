import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, Clock, IndianRupee } from 'lucide-react';
import * as Icons from 'lucide-react';
import { fetchServices, createService, updateService, deleteService } from '../../services/serviceApi.js';
import Modal from '../../components/ui/Modal.jsx';
import ServiceForm from '../../components/admin/ServiceForm.jsx';

function ServiceIcon({ name }) {
  const IconComponent = Icons[name] || Icons.Activity;
  return <IconComponent className="h-5 w-5 text-clinic-teal" />;
}

export default function AdminServicesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const queryClient = useQueryClient();

  const { data: services, isLoading } = useQuery({
    queryKey: ['admin', 'services'],
    queryFn: () => fetchServices({ includeInactive: true }),
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['admin', 'services'] });
    queryClient.invalidateQueries({ queryKey: ['services'] });
  };

  const { mutateAsync: createMutate, isPending: creating } = useMutation({
    mutationFn: createService,
    onSuccess: () => { toast.success('Service created'); invalidate(); setModalOpen(false); },
    onError: (e) => toast.error(e.message || 'Could not create service'),
  });

  const { mutateAsync: updateMutate, isPending: updating } = useMutation({
    mutationFn: ({ id, payload }) => updateService(id, payload),
    onSuccess: () => { toast.success('Service updated'); invalidate(); setModalOpen(false); },
    onError: (e) => toast.error(e.message || 'Could not update service'),
  });

  const { mutate: removeMutate } = useMutation({
    mutationFn: deleteService,
    onSuccess: () => { toast.success('Service deleted'); invalidate(); },
    onError: (e) => toast.error(e.message || 'Could not delete service'),
  });

  const openCreate = () => { setEditingService(null); setModalOpen(true); };
  const openEdit = (service) => { setEditingService(service); setModalOpen(true); };

  const handleSubmit = async (values) => {
    if (editingService) {
      await updateMutate({ id: editingService._id, payload: values });
    } else {
      await createMutate(values);
    }
  };

  const handleDelete = (service) => {
    if (window.confirm(`Delete "${service.title}"? This cannot be undone.`)) {
      removeMutate(service._id);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-clinic-navy">Services</h1>
          <p className="mt-1 text-sm text-clinic-ink/60">Manage the treatments patients can book.</p>
        </div>
        <button onClick={openCreate} className="btn-primary text-sm">
          <Plus className="h-4 w-4" /> Add Service
        </button>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading && Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="card h-48 animate-pulse bg-clinic-fog" />
        ))}

        {!isLoading && services?.map((service) => (
          <div key={service._id} className="card">
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-clinic-teal/10">
                <ServiceIcon name={service.icon} />
              </div>
              <div className="flex gap-1.5">
                <button onClick={() => openEdit(service)} className="rounded-md p-1.5 text-clinic-navy hover:bg-clinic-fog">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => handleDelete(service)} className="rounded-md p-1.5 text-clinic-danger hover:bg-clinic-danger/10">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <h3 className="mt-3 font-display font-semibold text-clinic-navy">{service.title}</h3>
            <span className="mt-1 inline-block rounded-full bg-clinic-fog px-2.5 py-0.5 text-xs text-clinic-teal">
              {service.category}
            </span>
            <p className="mt-2 line-clamp-2 text-sm text-clinic-ink/60">{service.description}</p>
            <div className="mt-4 flex gap-4 text-sm text-clinic-ink/70">
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {service.durationMinutes} min</span>
              <span className="flex items-center gap-1 font-mono"><IndianRupee className="h-4 w-4" /> {service.price}</span>
            </div>
            {!service.isActive && (
              <span className="mt-3 inline-block rounded-full bg-clinic-danger/10 px-2.5 py-0.5 text-xs text-clinic-danger">
                Inactive
              </span>
            )}
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingService ? 'Edit Service' : 'Add New Service'}
      >
        <ServiceForm
          defaultValues={
            editingService || {
              title: '', description: '', durationMinutes: 45, price: 80,
              category: 'Sports Rehab', icon: 'Activity',
            }
          }
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          isSubmitting={creating || updating}
        />
      </Modal>
    </div>
  );
}
