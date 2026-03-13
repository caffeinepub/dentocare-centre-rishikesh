import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AppointmentStatus } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllAppointments() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAppointments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllContactMessages() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["contactMessages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContactMessages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitAppointment() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      phone: string;
      serviceType: string;
      preferredDate: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitAppointment(
        data.name,
        data.phone,
        data.serviceType,
        data.preferredDate,
        data.message,
      );
    },
  });
}

export function useUpdateAppointmentStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { id: bigint; status: AppointmentStatus }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateAppointmentStatus(data.id, data.status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}
