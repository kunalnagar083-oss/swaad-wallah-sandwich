import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  MenuItem,
  OrderEntity,
  OrderItem,
  OrderStatus,
  RestaurantInfo,
} from "../backend.d";
import { useActor } from "./useActor";

export function useGetAvailableMenuItems() {
  const { actor, isFetching } = useActor();
  return useQuery<MenuItem[]>({
    queryKey: ["availableMenuItems"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAvailableMenuItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllMenuItems() {
  const { actor, isFetching } = useActor();
  return useQuery<MenuItem[]>({
    queryKey: ["allMenuItems"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMenuItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetRestaurantInfo() {
  const { actor, isFetching } = useActor();
  return useQuery<RestaurantInfo | null>({
    queryKey: ["restaurantInfo"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getRestaurantInfo();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSeedDatabase() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async () => {
      if (!actor) return;
      return actor.seedDatabaseIfEmpty();
    },
  });
}

export function useAddMenuItem() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      description: string;
      price: bigint;
      category: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.addMenuItem(
        data.name,
        data.description,
        data.price,
        data.category,
        null,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["allMenuItems"] });
      qc.invalidateQueries({ queryKey: ["availableMenuItems"] });
    },
  });
}

export function useUpdateMenuItem() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      name: string;
      description: string;
      price: bigint;
      category: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateMenuItem(
        data.id,
        data.name,
        data.description,
        data.price,
        data.category,
        null,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["allMenuItems"] });
      qc.invalidateQueries({ queryKey: ["availableMenuItems"] });
    },
  });
}

export function useDeleteMenuItem() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteMenuItem(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["allMenuItems"] });
      qc.invalidateQueries({ queryKey: ["availableMenuItems"] });
    },
  });
}

export function useToggleMenuItemAvailability() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.toggleMenuItemAvailability(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["allMenuItems"] });
      qc.invalidateQueries({ queryKey: ["availableMenuItems"] });
    },
  });
}

export function useUpdateRestaurantInfo() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      address: string;
      phoneNumber: string;
      email: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateRestaurantInfo(
        data.name,
        data.address,
        data.phoneNumber,
        data.email,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["restaurantInfo"] });
    },
  });
}

export function useGetCustomerProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<{ name: string; phone: string } | null>({
    queryKey: ["customerProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCustomerProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveCustomerProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: { name: string; phone: string }) => {
      if (!actor) throw new Error("No actor");
      return actor.saveCustomerProfile(data.name, data.phone);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["customerProfile"] });
    },
  });
}

export function usePlaceOrder() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      items: Array<OrderItem>;
      message: string | null;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.placeOrder(data.items, data.message);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myOrders"] });
    },
  });
}

export function useGetMyOrders() {
  const { actor, isFetching } = useActor();
  return useQuery<OrderEntity[]>({
    queryKey: ["myOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllOrders() {
  const { actor, isFetching } = useActor();
  return useQuery<OrderEntity[]>({
    queryKey: ["allOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: { orderId: bigint; status: OrderStatus }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateOrderStatus(data.orderId, data.status);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["allOrders"] });
    },
  });
}
