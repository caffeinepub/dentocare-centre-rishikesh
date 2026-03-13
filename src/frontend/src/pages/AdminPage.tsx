import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  Clock,
  LogIn,
  LogOut,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { AppointmentStatus } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useGetAllAppointments,
  useGetAllContactMessages,
  useIsCallerAdmin,
  useUpdateAppointmentStatus,
} from "../hooks/useQueries";

function StatusBadge({ status }: { status: AppointmentStatus }) {
  const styles = {
    [AppointmentStatus.Pending]: "bg-amber-100 text-amber-800 border-amber-200",
    [AppointmentStatus.Confirmed]:
      "bg-green-100 text-green-800 border-green-200",
    [AppointmentStatus.Cancelled]: "bg-red-100 text-red-800 border-red-200",
  };
  return (
    <Badge variant="outline" className={`font-medium ${styles[status]}`}>
      {status === AppointmentStatus.Pending && (
        <Clock className="mr-1 h-3 w-3" />
      )}
      {status === AppointmentStatus.Confirmed && (
        <CheckCircle className="mr-1 h-3 w-3" />
      )}
      {status === AppointmentStatus.Cancelled && (
        <XCircle className="mr-1 h-3 w-3" />
      )}
      {status}
    </Badge>
  );
}

export default function AdminPage() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success" && !!identity;
  const { data: isAdmin, isLoading: isAdminLoading } = useIsCallerAdmin();
  const { data: appointments, isLoading: apptLoading } =
    useGetAllAppointments();
  const { data: messages, isLoading: msgsLoading } = useGetAllContactMessages();
  const updateStatus = useUpdateAppointmentStatus();
  const [tab, setTab] = useState("appointments");

  const handleStatusUpdate = async (id: bigint, status: AppointmentStatus) => {
    try {
      await updateStatus.mutateAsync({ id, status });
      toast.success(`Appointment marked as ${status}`);
    } catch {
      toast.error("Failed to update status. Please try again.");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-foreground flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-12 shadow-hero max-w-md w-full mx-4 text-center"
        >
          <div className="h-20 w-20 rounded-full gradient-cta flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="h-10 w-10 text-white" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-3">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mb-8">
            Please login to access the Dentocare Centre admin panel.
          </p>
          <Button
            className="w-full gradient-cta text-white border-0 py-6 text-base font-semibold rounded-xl"
            onClick={() => login()}
            disabled={loginStatus === "logging-in"}
          >
            <LogIn className="mr-2 h-5 w-5" />
            {loginStatus === "logging-in"
              ? "Logging in..."
              : "Login with Internet Identity"}
          </Button>
          <a
            href="/"
            className="block mt-4 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to Website
          </a>
        </motion.div>
      </div>
    );
  }

  if (isAdminLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div data-ocid="admin.loading_state" className="text-center">
          <Skeleton className="h-12 w-48 mx-auto mb-4" />
          <Skeleton className="h-4 w-32 mx-auto" />
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div data-ocid="admin.error_state" className="text-center">
          <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
            <XCircle className="h-10 w-10 text-destructive" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">
            Access Denied
          </h2>
          <p className="text-muted-foreground mb-6">
            You don't have admin privileges.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => clear()}>
              Logout
            </Button>
            <a href="/">
              <Button className="gradient-cta text-white border-0">
                Go to Website
              </Button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-foreground border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/assets/generated/dentocare-logo-transparent.dim_200x200.png"
              alt="Dentocare Centre"
              className="h-8 w-8 object-contain"
            />
            <div>
              <span className="font-display font-bold text-white">
                Dentocare Centre
              </span>
              <Badge className="ml-2 bg-secondary/20 text-secondary border-0 text-xs">
                Admin
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/50 text-sm hidden sm:block">
              {identity?.getPrincipal().toString().slice(0, 8)}...
            </span>
            <Button
              variant="outline"
              size="sm"
              className="border-white/20 text-white hover:bg-white/10 hover:text-white"
              onClick={() => clear()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage appointments and patient messages.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="text-3xl font-display font-bold text-primary">
              {appointments?.length ?? 0}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Total Appointments
            </div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="text-3xl font-display font-bold text-amber-600">
              {appointments?.filter(
                (a) => a.status === AppointmentStatus.Pending,
              ).length ?? 0}
            </div>
            <div className="text-sm text-muted-foreground mt-1">Pending</div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="text-3xl font-display font-bold text-green-600">
              {appointments?.filter(
                (a) => a.status === AppointmentStatus.Confirmed,
              ).length ?? 0}
            </div>
            <div className="text-sm text-muted-foreground mt-1">Confirmed</div>
          </div>
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="mb-6">
            <TabsTrigger
              data-ocid="admin.appointments.tab"
              value="appointments"
            >
              Appointments ({appointments?.length ?? 0})
            </TabsTrigger>
            <TabsTrigger data-ocid="admin.messages.tab" value="messages">
              Messages ({messages?.length ?? 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            {apptLoading ? (
              <div data-ocid="admin.loading_state" className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-14 w-full rounded-lg" />
                ))}
              </div>
            ) : !appointments?.length ? (
              <div
                data-ocid="appointments.empty_state"
                className="text-center py-16 text-muted-foreground"
              >
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p>No appointments yet.</p>
              </div>
            ) : (
              <div className="rounded-2xl border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appt, i) => (
                      <TableRow
                        key={String(appt.id)}
                        data-ocid={`admin.appointment.row.${i + 1}`}
                      >
                        <TableCell className="text-muted-foreground text-xs font-mono">
                          #{String(appt.id)}
                        </TableCell>
                        <TableCell className="font-medium">
                          {appt.name}
                        </TableCell>
                        <TableCell>{appt.phone}</TableCell>
                        <TableCell className="max-w-32 truncate">
                          {appt.serviceType}
                        </TableCell>
                        <TableCell>{appt.preferredDate}</TableCell>
                        <TableCell>
                          <StatusBadge
                            status={appt.status as AppointmentStatus}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {appt.status !== AppointmentStatus.Confirmed && (
                              <Button
                                size="sm"
                                data-ocid={`admin.appointment.confirm_button.${i + 1}`}
                                className="bg-green-600 hover:bg-green-700 text-white text-xs h-7"
                                onClick={() =>
                                  handleStatusUpdate(
                                    appt.id,
                                    AppointmentStatus.Confirmed,
                                  )
                                }
                                disabled={updateStatus.isPending}
                              >
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Confirm
                              </Button>
                            )}
                            {appt.status !== AppointmentStatus.Cancelled && (
                              <Button
                                size="sm"
                                variant="outline"
                                data-ocid={`admin.appointment.cancel_button.${i + 1}`}
                                className="border-red-300 text-red-600 hover:bg-red-50 text-xs h-7"
                                onClick={() =>
                                  handleStatusUpdate(
                                    appt.id,
                                    AppointmentStatus.Cancelled,
                                  )
                                }
                                disabled={updateStatus.isPending}
                              >
                                <XCircle className="mr-1 h-3 w-3" />
                                Cancel
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="messages">
            {msgsLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-14 w-full rounded-lg" />
                ))}
              </div>
            ) : !messages?.length ? (
              <div
                data-ocid="messages.empty_state"
                className="text-center py-16 text-muted-foreground"
              >
                <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p>No messages yet.</p>
              </div>
            ) : (
              <div className="rounded-2xl border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messages.map((msg) => (
                      <TableRow key={msg.timestamp + msg.name}>
                        <TableCell className="font-medium">
                          {msg.name}
                        </TableCell>
                        <TableCell>{msg.phone}</TableCell>
                        <TableCell>{msg.email}</TableCell>
                        <TableCell className="max-w-64">
                          <p className="truncate text-sm text-muted-foreground">
                            {msg.message}
                          </p>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {msg.timestamp}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
