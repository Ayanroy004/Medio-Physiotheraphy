import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import {
  fetchServices,
  createService,
  updateService,
  deleteService,
} from "../../services/serviceApi.js";
import Modal from "../../components/ui/Modal.jsx";
import ServiceForm from "../../components/admin/ServiceForm.jsx";

export default function AdminServicesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const queryClient = useQueryClient();

  const {
    data: services = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin", "services"],
    queryFn: () => fetchServices(),
  });

  const invalidate = () => {
    queryClient.invalidateQueries({
      queryKey: ["admin", "services"],
    });

    queryClient.invalidateQueries({
      queryKey: ["services"],
    });
  };

  // Create service
  const { mutateAsync: createMutate, isPending: creating } = useMutation({
    mutationFn: createService,

    onSuccess: () => {
      toast.success("Service created successfully");
      invalidate();
      setModalOpen(false);
      setEditingService(null);
    },

    onError: (e) => {
      toast.error(e.message || "Could not create service");
    },
  });

  // Update service
  const { mutateAsync: updateMutate, isPending: updating } = useMutation({
    mutationFn: ({ id, payload }) => updateService(id, payload),

    onSuccess: () => {
      toast.success("Service updated successfully");
      invalidate();
      setModalOpen(false);
      setEditingService(null);
    },

    onError: (e) => {
      toast.error(e.message || "Could not update service");
    },
  });

  // Delete service
  const { mutate: removeMutate, isPending: deleting } = useMutation({
    mutationFn: deleteService,

    onSuccess: () => {
      toast.success("Service deleted successfully");
      invalidate();
    },

    onError: (e) => {
      toast.error(e.message || "Could not delete service");
    },
  });

  const openCreate = () => {
    setEditingService(null);
    setModalOpen(true);
  };

  const openEdit = (service) => {
    setEditingService(service);
    setModalOpen(true);
  };

  const handleSubmit = async (values) => {
    if (editingService) {
      await updateMutate({
        id: editingService._id,
        payload: values,
      });
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-clinic-navy">
            Services
          </h1>

          <p className="mt-1 text-sm text-clinic-ink/60">
            Manage the services offered by the clinic.
          </p>
        </div>

        <button onClick={openCreate} className="btn-primary text-sm">
          <Plus className="h-4 w-4" />
          Add Service
        </button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card h-80 animate-pulse bg-clinic-fog" />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="card mt-6 py-10 text-center text-clinic-danger">
          Failed to load services.
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && services.length === 0 && (
        <div className="card mt-6 py-12 text-center">
          <ImageIcon className="mx-auto h-10 w-10 text-clinic-ink/30" />

          <h3 className="mt-3 font-display font-semibold text-clinic-navy">
            No services yet
          </h3>

          <p className="mt-1 text-sm text-clinic-ink/50">
            Add your first service to get started.
          </p>

          <button onClick={openCreate} className="btn-primary mt-4 text-sm">
            <Plus className="h-4 w-4" />
            Add Service
          </button>
        </div>
      )}

      {/* Services */}
      {!isLoading && !isError && services.length > 0 && (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service._id} className="card overflow-hidden">
              {/* Image */}
              {service.images?.length > 0 ? (
                <div className="relative h-52 w-full overflow-hidden rounded-lg">
                  <img
                    src={service.images[0].imageUrl}
                    alt={service.title}
                    className="h-full w-full object-cover"
                  />

                  {/* Image count */}
                  {service.images.length > 1 && (
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white">
                      <ImageIcon className="h-3.5 w-3.5" />
                      {service.images.length}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex h-52 w-full items-center justify-center rounded-lg bg-clinic-fog">
                  <div className="text-center">
                    <ImageIcon className="mx-auto h-8 w-8 text-clinic-ink/30" />

                    <p className="mt-2 text-xs text-clinic-ink/40">No image</p>
                  </div>
                </div>
              )}

              {/* Service content */}
              <div className="pt-4">
                {/* Title + actions */}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold text-clinic-navy">
                    {service.title}
                  </h3>

                  <div className="flex shrink-0 gap-1.5">
                    <button
                      onClick={() => openEdit(service)}
                      className="rounded-md p-1.5 text-clinic-navy hover:bg-clinic-fog"
                      title="Edit service"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(service)}
                      disabled={deleting}
                      className="rounded-md p-1.5 text-clinic-danger hover:bg-clinic-danger/10 disabled:opacity-50"
                      title="Delete service"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-clinic-ink/60">
                  {service.description}
                </p>

                {/* Image count */}
                <div className="mt-4 flex items-center gap-1.5 text-xs text-clinic-ink/50">
                  <ImageIcon className="h-4 w-4" />
                  {service.images?.length || 0}{" "}
                  {service.images?.length === 1 ? "image" : "images"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingService(null);
        }}
        title={editingService ? "Edit Service" : "Add New Service"}
      >
        <ServiceForm
          defaultValues={
            editingService || {
              title: "",
              description: "",
              images: [],
            }
          }
          onSubmit={handleSubmit}
          onCancel={() => {
            setModalOpen(false);
            setEditingService(null);
          }}
          isSubmitting={creating || updating}
        />
      </Modal>
    </div>
  );
}
